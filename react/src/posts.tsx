import { useState, useEffect } from "react"
import axios from "axios"
import moment from "moment"
import { Link } from "react-router-dom"

export default function Posts() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3076/posts')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }, [])

  console.log(data)

  return (
    <div>
      {data.map((post: any) => (
        <div className="center">
        <div className="card">
        <div key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <hr />
          <div className="date">
            <h5>{moment(post.createdAt).fromNow()}</h5>
          </div>
          <div className="btn-func">
          <Link to={`/editpost/${post._id}`}><button className="btn-update" type="button">Update</button></Link>
          <Link to={`/deletepost/${post._id}`}><button className="btn-delete" type="button">Delete</button></Link>
          </div>
        </div>
        </div>
        </div>
      ))}
    </div>
  )
}