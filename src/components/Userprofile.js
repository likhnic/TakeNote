import React, { useEffect, useState } from 'react'

const Userprofile = () => {

    const [details,setDetails]=useState({_id:"",name:"",email:"",date:""})
    useEffect( () => {
        if (localStorage.getItem('token')) {
            addDetails();
        }
        // eslint-disable-next-line
    }, [])

    const addDetails=async()=>{

        const token=localStorage.getItem('token')
        const response=await fetch('http://localhost:5000/api/auth/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `${token}`
            },
        })
        const json=await response.json()
        setDetails({_id:json._id,name:json.name,email:json.email,date:json.date})
    }

    return (
        <div className='container'>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">
                                {details.name}
                            </h4>
                            <div className="card-text">Email: {details.email}</div>
                            <div className="card-text">Account created on {new Date(details.date).toUTCString}</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userprofile