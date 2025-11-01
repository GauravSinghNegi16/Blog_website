import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import BlogList from '../Components/BlogList'
import NewsSletter from '../Components/NewsSletter'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div className=''>
        <Navbar />
        <Header />
        <BlogList />
        <NewsSletter />
        <Footer />
    </div>
  )
}

export default Home