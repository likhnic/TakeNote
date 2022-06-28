import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        if (!json.error) {
            localStorage.setItem('token', json)
            navigate('/')
            props.showAlert("Successfully created account!", "success")
        }
        else {
            props.showAlert(json.error, "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container my-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" required minLength={3} name='name' className="form-control" onChange={onChange} id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" required minLength={3} name='email' className="form-control" onChange={onChange} id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" required minLength={3} className="form-control" onChange={onChange} id="password" name='password' />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" required minLength={3} className="form-control" onChange={onChange} id="cpassword" name='cpassword' />
                </div>
                <button type="submit" required minLength={3} className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup