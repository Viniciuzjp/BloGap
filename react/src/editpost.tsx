import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"



export default function EditPost() {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [update, setUpdate] = useState({
        title: "",
        body: ""
    })

    const handleClick = () => {
        axios.put("http://localhost:3076/update/" + id, update)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }


    useEffect(() => {
        axios.get('http://localhost:3076/posts/' + id)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    },[])
    console.log(update)
    return (
        <>
                <div className="cardUpdate">
                <h1>Editar Post</h1>
                <input type="text" onChange={(e) => setUpdate({...update, title: e.target.value})} defaultValue={data.title} />
                <input type="text" onChange={(e) => setUpdate({...update, body: e.target.value})} defaultValue={data.body} />
                <button onClick={handleClick}>Save</button>
                </div>
        </>
    )
}