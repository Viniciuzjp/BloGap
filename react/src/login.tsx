import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Login() {

    

    const [data, setData] = useState({
        username: '',
        email: ''
    })

    const [user, setUser] = useState({
        username: '',
        password: '',
        password2: ''
    })

    const handleChange = (e: any) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (user.password !== user.password2) {
            alert("Passwords don't match")
        } else if (user.username === '' || user.password === '' || user.password2 === '') {
            alert("All fields are required")     
        } else if (user.password.length < 8) {
            alert("Password must be at least 8 characters long")
        } else if (user.username.length < 8) {
            alert("Username must be at least 8 characters long")
        }
        else {
            axios.post("http://localhost:3076/login", user)
            .then(res => {
                setData(res.data)
                navigate('/')
        })

            .catch(err => console.log(err))
        }
    }
    console.log(data)
    console.log(user)
   
    if (data) {
        localStorage.setItem('user', data.username)
        localStorage.setItem('email', data.email)
    }

    return (
        <div className="container">
            <form className='form-center' onSubmit={handleSubmit}>
                <h1>Login in your account</h1>
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
                        id="password2"
                        name="password2"
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}