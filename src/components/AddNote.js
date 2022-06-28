import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/Notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added Successfully", "success")
    }

    const onClick = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="row">
            <div className="col">
                <div className="card-shadow">
                    <div className="card-body">
                        <h2 className="card-title">Add a note</h2>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input onChange={onClick} type="text" className="form-control" id="title" name='title' minLength={3} required value={note.title} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea onChange={onClick} className='form-control' name="description" id="description" rows={3} minLength={3} required value={note.description}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input onChange={onClick} type="text" className="form-control" id="tag" name='tag' minLength={3} required value={note.tag} />
                            </div>
                            <button disabled={note.title.length < 3 || note.description.length < 3} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNote