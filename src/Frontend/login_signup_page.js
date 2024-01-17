import React,{ useState } from 'react';
import axios from 'axios'
// import bg from '../Images/login_back.png'
import bg from '../Images/login_back2.png'
import { Link, useNavigate } from 'react-router-dom';
import './login_signup.css'
export default function Signup_page(){
  const Swal = require('sweetalert2')
  const [data,chngData]=useState({})
  const [logPass,handleLogin]=useState({})
  const navigate=useNavigate()
  const dataChanged=(e1)=>{
    chngData({...data,[e1.target.name]:e1.target.value})
  }
  const dataChng=(e3)=>{
    handleLogin({...logPass,[e3.target.name]:e3.target.value})
  }
  const LoginSubmit=(e2)=>{
    e2.preventDefault()
    axios.post('http://localhost:8000/login',logPass)
    .then((res)=>{
      if(res.data.set){
        navigate('/login_signup/home',{state:res.data})
      }else{
        Swal.fire({
          title: 'err!',
          text: "User doesn't exist.",
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    })
    
  }
  const submitSignUpHandle=(e)=>{
    e.preventDefault();
    chngData({...data,gender:e.target.gender.value})
    console.log(data);
    if(data.password === data.cpassword){
      console.log(data);
      axios.post('http://localhost:8000/signup',data)
      .then((res)=>{
        console.log(res.data)
        if(res.data.set){
          Swal.fire({
            title: 'Success!',
            text: 'User registered successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        }else{
          Swal.fire({
            title: 'Oops!',
            text: 'User already registered.',
            icon: 'warning',
            confirmButtonText: 'OK'
          }
          )
        }
      })
      .catch(e=>{console.log(e);})
    }else{
      Swal.fire({
        title: 'err!',
        text: 'Please check and re-enter password.',
        icon: 'error',
        confirmButtonText: 'OK'
      }
      )
    }
  }
  return(
    <>
    <div className="container-fluid position-fixed m" style={{backgroundImage:`url(${bg})`,backgroundSize:'cover',height:'100vh',width:'100vw'}}>
		<div className="container">
			<div className="row full-height justify-content-center">
				<div className="col-12 text-center align-self-center py-5 pb-0">

					<div className="section text-center justify-content-center">
						<h6 className="pb-3 text-dark">&nbsp;&nbsp;&nbsp;<label htmlFor='reg-log'><b>Log In</b> </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label htmlFor='reg-log'><b>Sign Up</b></label></h6>
			          	<input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
			          	<label htmlFor="reg-log"></label>
						<div className="card-3d-wrap mx-auto">
							<div className="card-3d-wrapper">

{/* login */}

								<div className="card-front d-flex flex-column justify-content-center">
									<div className="center-wrap">
											
                      <div className="login-box">
                      <h2>Login</h2>
                      <form onSubmit={LoginSubmit}>
                        <div className="user-box">
                          <input type="text" name="email" onChange={dataChng} autoComplete='off' required/>
                          <label>Username</label>
                        </div>
                        <div className="user-box">
                          <input type="password" name="password" onChange={dataChng} autoComplete='off' required/>
                          <label>Password</label>
                        </div>
                        <input type='submit' className='btn btn-md btn-outline-light'></input>
                      </form><br/>
                        <Link to='/forget_pass' style={{color:'#9F7A4B'}} className='text-decoration-none'>Forgot password?</Link>
                    </div>
                    
			      				</div>
			      			</div>

{/* Signup */}

								<div className="card-back">
									<div className="center-wrap">
                    <div className="login-box">
                      <h2 className='mb-1'>Signup</h2>
                      <form onSubmit={submitSignUpHandle}>
                        <div className="user-box">
                          <input type="text" name="uname" onChange={dataChanged} autoComplete='off' required/>
                          <label>Username</label>
                        </div>
                        <div className="user-box">
                          <input type="password" name="password" onChange={dataChanged} autoComplete='off' required/>
                          <label>Password</label>
                        </div>
                        <div className="user-box">
                          <input type="password" name="cpassword" onChange={dataChanged} autoComplete='off' required/>
                          <label>Confirm Password</label>
                        </div>
                        <div className="user-box">
                          <input type="text" name="email" onChange={dataChanged} autoComplete='off' required/>
                          <label>Email</label>
                        </div>
                        <div className="user-box">
                          <input type="text" name="profession" onChange={dataChanged} autoComplete='off' required/>
                          <label>Profession</label>
                        </div>
                        <div className="user-box">
                          <select className="form-select form-select-sm mt-0 bg-dark text-light" onChange={dataChanged} name='gender' required>
                            <option value=''>Select...</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='others'>Others</option>
                          </select>
                        </div>
                        <input type='submit' className='btn btn-md btn-outline-light mt-3'></input>
                      </form>
                    </div>
                    </div>
			      				</div>

			      			</div>
			      		</div>
			      	</div>
		      	</div>
	      	</div>
	    </div>
	</div>
    </>
  )
}