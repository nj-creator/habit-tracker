import React from 'react';
import background from '../Images/startup_image.jpg'
import logo from '../Images/logo-heart-plus-red.png'
import {Link} from 'react-router-dom';
export default function Startup_page(){
  return(

    <div className='position-relative'>
    {/* background */}

    <img src={background} alt='not found'  style={{width:'100vw',height:'100vh',position:'fixed'}}/>

    {/* logo of start page */}

    <div style={{display:'inline'}} className='position-absolute row g-0 ms-5 mt-5'>
    <img src={logo} alt='not found' className='col-md-5' style={{width:'48px',height:'48px',marginTop:'-12px'}}/>
    <span style={{fontFamily:'Amatic SC, cursive',color:'white',fontSize:'32px'}} className='col-md-6'>Habit Tracker</span>
    </div>

    {/* login sign up button */}

    <div className=" position-absolute top-0 end-0 me-5 mt-5">
      <Link className="btn btn-outline-light" to="/login_signup" role="button">LOGIN</Link>
    </div>

    {/* feedback about us footer */}

    <div className='position-absloute fixed-bottom d-flex justify-content-end mb-5 me-5'>
    <Link className='text-light' to='/feedback'>Feedback</Link>
    </div>
    </div>
  )
}