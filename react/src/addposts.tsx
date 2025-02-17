import { useState } from "react"
import axios from "axios"


export default function AddPost() {

    const author = localStorage.getItem("user")
    const authotEmail = localStorage.getItem("email")
    const [data, setData] = useState([])
    const [post, setPost] = useState({
        title: "",
        body: "",
        category: "Home",
        author: author,
        authorEmail: authotEmail
    })

    const handleChange = (e: any) => {
        setPost({
            ...post, [e.target.name]: e.target.value
        })
    }
    console.log(data)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        axios.post("http://localhost:3076/posts", post)
        .then(res => {
            setData(res.data)
        })
        .catch(err => console.log(err))
    }

    console.log(post)
    return (
        <>
            <div>
                <div className="container">
                <div className="form">
                    <h1>Send your Post</h1>
                    <hr />
                    <input onChange={handleChange} name="title" type="text" placeholder="Title" />
                    <input onChange={handleChange} type="text" name="body" placeholder="Content" />
                    <div className="category-itens">
                        <input onChange={handleChange} type="radio" name="category" value="Food" />
                        <label>Food</label>
                        <input onChange={handleChange} type="radio" name="category" value="News" />
                        <label>News</label>
                        <input onChange={handleChange} type="radio" name="category" value="Work" />
                        <label>Work</label>
                        <input onChange={handleChange} type="radio" name="category" value="Nature" />
                        <label>Nature</label>
                    </div>
                    <hr />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                </div>
            </div>
        </>
    )
}
