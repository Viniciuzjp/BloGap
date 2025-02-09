import { useState } from "react"
import axios from "axios"


export default function AddPost() {

    const author = localStorage.getItem("user")
    const authotEmail = localStorage.getItem("email")
    const [data, setData] = useState([])
    const [post, setPost] = useState({
        title: "",
        body: "",
        author: author,
        authorEmail: authotEmail
    })

    const handleChange = (e: any) => {
        setPost({
            ...post, [e.target.name]: e.target.value
        })
    }
    console.log(post)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        axios.post("http://localhost:3076/posts", post)
        .then(res => {
            setData(res.data)
        })
        .catch(err => console.log(err))
    }
    



    console.log(data)
    return (
        <>
            <div>
                <div className="container">
                <div className="form">
                    <h1>Send your Post</h1>
                    <hr />
                    <input onChange={handleChange} name="title" type="text" placeholder="Title" />
                    <input onChange={handleChange} type="text" name="body" placeholder="Content" />
                    <hr />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                </div>
            </div>
        </>
    )
}
