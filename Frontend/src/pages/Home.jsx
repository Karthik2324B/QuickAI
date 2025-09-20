import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AITools from '../components/AITools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'
import { useUser } from '@clerk/clerk-react'

const Home = () => {
  const { user } = useUser()
  // console.log(user?.imageUrl)
  return (
    <>
      <Navbar />
      <Hero />
      <AITools />
      <Testimonial />
      <Plan />
      <Footer />
    </>
  )
}

export default Home
