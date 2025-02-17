import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment';
import { FaHome } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { BiSolidUserAccount } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";
import { Link } from 'react-router-dom';
import { BsSendPlusFill } from "react-icons/bs";

function App() {

  const username = localStorage.getItem('user')

  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState({
    author: username,
    body: '',
    postId: ''
  })
  const [category, setCategory] = useState('')

  console.log(category)

  const txtWelcome = () => {
    if (username === '') {
      return (
        <div className="txt-wm">
          <h2 style={{fontFamily: 'cursive'}}>Hello,<br /> Guest</h2>
        </div>
      )
    }else
    return (
      <div className="txt-wm">
        <h2 style={{fontFamily: 'cursive'}}>Hello,<br /> {username}</h2>
      </div>
    )
  }

  
  const handleSubmitComments = (e: any) => {
    e.preventDefault()
    if (comment.body === '') {
      alert('All fields are required')
    }
    else if (comment.author === '') {
      alert('You must be logged in')
    }
    else {
    axios.post('http://localhost:3076/comments', comment)
      .then(res => setComments(res.data))
      .catch(err => console.log(err))
    }
  }
  const [postComments, setPostComments] = useState<Record<string, any[]>>({});
  
  useEffect(() => {
      const postId = comment.postId;
      if (postId) {
          axios.get(`http://localhost:3076/comments/${postId}`)
              .then(res => {
                  setPostComments(prevComments => ({ ...prevComments, [postId]: res.data }));
              })
              .catch(err => console.log(err))
      }
  },[comment.postId])

  const handleChangeComment = (e: any) => {
    setComment({
      ...comment, [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3076/posts')
    .then(res => setPosts(res.data))
    .catch(err => console.log(err))
  },[])

  return (
    <>
    <div className="main">
    <div className="sideBar">
        <div className="logo">
          <h1 style={{fontFamily: 'cursive'}}>BloGap</h1>
        </div>
        <div className="txt-wm">
          {txtWelcome()}
        </div>
        <div className="sideBarOptions">
          <div className="iconOptions">
            <Link to="/" className='textDecor'>
          <FaHome className='icon'  />
          <h3>Home</h3>
          </Link>
          </div>
          <div className="iconOptions">
            <BiSolidUserAccount className='icon' />
            <h3>Perfil</h3>
          </div>
          <div className="iconOptions">
          <Link to="/register" className='textDecor'>
            <FaUserPlus className='icon' />
          <h3>Register</h3>
          </Link>
          </div>
          <div className="iconOptions">
          <Link to="/login" className='textDecor'>
            <IoMdLogIn className='icon' />
          <h3>Login</h3>
          </Link>
          </div>
        </div>
        </div>
      <div className="sidePosts">
        <div>
          <div className="navHome">
            <h1>Home</h1>
            <input type="text" placeholder="Search..." className="inputSearch" onChange={(e) => setCategory(e.target.value)} />
            <Link style={{ textDecoration: 'none' }} to="/addposts"><div className="toAdd">
            <p>Send a Post</p>
            <BsSendPlusFill className='iconAdd' />
            </div></Link>
          </div>
          {posts.filter((post: any) => post.category === category || category === '').map((post: any) => (
            <div className="cardForm" key={post._id}>
              <div className="user">
                <div className="userPhoto">
                  <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                </div>
                <div className="userData">
                  <div className="userName">
                    <h4>{post.author}</h4>
                  </div>
                  <div className="userSubname">
                    <h5>@{post.authorEmail}</h5>
                  </div>
                </div>
              </div>
              <div className="content">
              <p>{post.body}</p>
              <div className="date">
                <h5>{moment(post.createdAt).format('DD/MM/YYYY HH:MM:SS')}</h5>
                <h5>/ {moment(post.createdAt).fromNow()}</h5>
              </div>
              <div className="interactions">
                <div className="comments-icon">
                  <i className="far fa-comment" ></i>
                  <input type="text" placeholder="Comment here..." className="comment-input" name="body"onClick={() => setComment({ ...comment, postId: post._id })} onChange={handleChangeComment} />
                  <i style={{ marginLeft: '10px' }} className="far fa-paper-plane" onClick={handleSubmitComments}></i>
                </div>
                <div className="reactions">
                  <div className="like">
                    <i className="far fa-thumbs-up"></i>
                  </div>
                  <div className="dislike">
                    <i className="far fa-thumbs-down"></i>
                  </div>
                </div>
              </div>
              <div className="comments">
                {Array.isArray(postComments[post._id]) && postComments[post._id].map((comment: any) => (
                    <div className="comment" key={comment._id} >
                        <div className="comment-user">
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" />
                            <div className="comment-data">
                                <h5>{comment.author}</h5>
                                <h5>{moment(comment.createdAt).fromNow()}</h5>
                            </div>
                        </div>
                        <div className="comment-body">
                            <p>{comment.body}</p>
                        </div>
                    </div>
                ))}
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sideCategory">
          <div className="category">
            <div className="categoryOptions" onClick={() => setCategory('')}>
            <code>Casa</code>
            <p>Home</p>
            </div>
            <div className="categoryOptions" onClick={() => setCategory('News')}>
            <code>Noticias</code>
            <p>News</p>
            </div>
            <div className="categoryOptions" onClick={() => setCategory('Work')}>
              <code>Trabalho</code>
              <p>Work</p>
            </div>
            <div className="categoryOptions" onClick={() => setCategory('Nature')}>
            <code>Natureza</code>
            <p>Nature</p>
            </div>
            <div className="categoryOptions" onClick={() => setCategory('Food')}>
            <code>Alimento</code>
            <p>Food</p>
            </div>
            <div className="categoryOptions">
              <code>Trabalho</code>
              <p>Work</p>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default App
