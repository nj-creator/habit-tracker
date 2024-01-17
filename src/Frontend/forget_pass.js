import React from "react";
import back from '../Images/login-back.gif'
import axios from 'axios';
import './forget.css'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
export default function Forget_pass() {
  const navigate = useNavigate()
  const Swal = require('sweetalert2')
  const [email, setEmail] = useState('')
  const [fetch, fetchedEmail] = useState(false)
  const [secondStep, step2Vis] = useState(false)
  const [data, keyPass] = useState({})
  const handleChange = (e) => {
    setEmail(e.target.value)
  }
  const passHandle = (e) => {
    keyPass({ ...data, [e.target.name]: e.target.value })
  }
  const SendEmail = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/forget_pass', { email })
      .then((res) => {
        console.log(res.data);
        if (res.data.set) {
          fetchedEmail(res.data.set)
          Swal.fire({
            title: 'Success!',
            text: 'Key Generated Succesfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        } else {
          Swal.fire({
            title: 'Oops!',
            text: 'Email does not exist.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      }).catch((err) => { console.log(err); })
  }
  const ChangePass = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8000/password_change', { email, data })
      .then((res) => {
        if (res.data.change) {
          Swal.fire({
            title: 'Success!',
            text: 'Password Updated Succesfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate('/login_signup')
          })
        } else {
          Swal.fire({
            title: 'Err!',
            text: 'Please Check The Key And Enter Again',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      })
  }
  return (
    <div style={{ backgroundImage: `url(${back})`, backgroundRepeat: 'no-repeat', height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundOrigin: 'content-box' }} className="container-fluid">
      <div className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div id="Step1">
          <center>
            <p className="display-3">Forget Password</p>
            <form className='container' action="forget_pass" onSubmit={SendEmail}>
              <b>Email:</b><input type='email' name='email' className='form-control' onChange={handleChange} required autoComplete="off" /><br />
              <button className='btn btn-outline-dark form-control mb-3'><b>Send for Key Generation</b></button>
            </form>
            {fetch ?
              <button className='btn btn-outline-dark' onClick={() => {
                document.getElementById('Step1').style.display = 'none'
                step2Vis(true)
              }}>next</button> : null}
          </center>
        </div>
        {secondStep ?
          <div id="Step2">
            <center>
              <p className="display-4">Change Password</p>
              <form className='container' action="forget_pass" onSubmit={ChangePass}>
                <b>Email Key:</b><input type='text' name='key' className='form-control' onChange={passHandle} required /><br />
                <b>Password:</b><input type='text' name='pass' className='form-control' onChange={passHandle} required /><br />
                <b>Confirm Password:</b><input type='text' name='cpass' className='form-control' onChange={passHandle} required /><br />
                <button className='btn btn-outline-dark mb-3'><b>Change</b></button>
              </form>
            </center>
          </div>
          : null}
      </div>
    </div>
  );
}
