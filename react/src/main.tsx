import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import AddPost from './addposts.tsx'
import EditPost from './editpost.tsx'
import Posts from './posts.tsx'
import DeletePost from './deletepost.tsx'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Addposts" element={<AddPost />} />
        <Route path='editpost/:id' element={<EditPost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/deletepost/:id" element={<DeletePost />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)