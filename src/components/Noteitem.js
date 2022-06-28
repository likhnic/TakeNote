import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/Notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className='col-md-4'>
            <div className="card my-3">
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                    <span className="badge rounded-pill bg-danger"> {note.tag} </span>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <p className="text-muted">
                        Created on {new Date(note.date).toGMTString()}
                    </p>
                    <p className="text-muted">
                        Last Updated on {new Date(note.lastUpdated).toGMTString()}
                    </p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully!", "success") }}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem