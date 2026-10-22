import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Gallery from './Gallery'
import Menu from './Menu'
import Blog from './Blog'
import Contact from './Contact'
import Services from './Services'
import BDetails from './BDetails'
import Error from './Error'
import Login from './Login'


const Main = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/gallery' element={<Gallery/>} />
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/service' element={<Services/>}/>
        <Route path='/blog/detail' element={<BDetails/>}/>
        <Route path='*' element={<Error/>}/>
        <Route path='*' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default Main