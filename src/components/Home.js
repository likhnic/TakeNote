import React from 'react'
import Notes from './Notes'
// import { useContext } from 'react';
// import noteContext from '../context/Notes/noteContext';

export default function Home(props) {

	return (
		<div>
			<Notes showAlert={props.showAlert}/>
		</div>
	)
}
