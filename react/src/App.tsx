
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment';

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
    <div className="main">
    <div className="sideBar">
          <h3>Post</h3>
          <hr />
        </div>
      <div className="sidePosts">
        <div>
          {posts.map((post: any) => (
            <div className="cardForm" key={post._id}>
              <div className="user">
                <div className="userPhoto">
                  <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                </div>
                <div className="userData">
                  <div className="userName">
                    <h4>John Madson</h4>
                  </div>
                  <div className="userSubname">
                    <h5>@Madson123</h5>
                  </div>
                </div>
              </div>
              <div className="content">
              <p>{post.body}</p>
              <div className="date">
                <h5>{moment(post.createdAt).format('DD/MM/YYYY HH:MM:SS')}</h5>
                <h5>/ {moment(post.createdAt).fromNow()}</h5>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default App
