
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3076/posts')
    .then(res => setPosts(res.data))
    .catch(err => console.log(err))
  },[])
  console.log(posts)

  return (
    <>
      <div>
        <h1>Posts</h1>
        {posts.map((post: any) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
