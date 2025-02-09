import { useState } from 'react';
import axios from 'axios'

export default function Register() {

    const [data, setData] = useState({})
  
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const handleChange = (e: any) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }
    console.log(user)

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (user.password !== user.confirmPassword) {
            alert("Passwords don't match")
        } else if (user.username === '' || user.email === '' || user.password === '' || user.confirmPassword === '') {
            alert("All fields are required")     
        } else if (user.username.length < 8) {
            alert("Username must be at least 8 characters long")
        }else if (user.password.length < 8) {
            alert("Password must be at least 8 characters long")
        }else {
            axios.post("http://localhost:3076/register", user)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
        }
    }
    console.log(data)
  return (
    <form className='form-center' >
        <h1>Create an account</h1>
      <div className="form-group">
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />
      </div>
      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}