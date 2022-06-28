const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')

const noteValidator = [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 3 })
]

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        console.log(notes)
        res.json(notes)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({"error":"Internal Server Error"})
    }

})

router.post('/addnote', fetchuser, noteValidator, async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { title, description, tag } = req.body
        const note = await new Note({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savednote = await note.save()
        res.json(savednote)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({"error":"Internal Server Error"})
    }

})

router.put('/updatenote/:id', fetchuser, noteValidator, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        newNote.lastUpdated = Date.now()
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Page not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({"error":"Internal Server Error"})    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Page not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({"error":"Internal Server Error"})    }

})

module.exports = router