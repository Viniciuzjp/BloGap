import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export default function DeletePost() {
    const [remove, setRemove] = useState({})
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        axios.delete('http://localhost:3076/delete/' + id)
        .then(res => setRemove(res.data))
        .then(() => navigate('/posts'))
        .catch(err => console.log(err))
    },[])

    console.log(remove)

    return (
        <>
        
        </>
    )
}