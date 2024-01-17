import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./contact.css"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    profession:''
  });
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/contact', formData) 
      .then((response) => {
        console.log(response.data);
        navigate(-1)
      })
      .catch((error) => {
        console.error(error);
        
      });
  };

  return (
    <div className='container-fluid'>
    <div className="contact_us_green">
		<div className="responsive-container-block big-container">
		  <div className="responsive-container-block container">
			<div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-7 wk-ipadp-10 line" >
			  <form className="form-box" onSubmit={handleSubmit}>
				<div className="container-block form-wrapper">
				  <div className="head-text-box">
					<p className="text-blk contactus-head">
					  Contact us
					</p>
					<p className="text-blk contactus-subhead">
					  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al iqua. Ut enim
					</p>
				  </div>
				  <div className="responsive-container-block">
					<div className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6" >
					  <p className="text-blk input-title">
						USERNAME
					  </p>
					  <input className="input"  name="name"  value={formData.name}
					  onChange={handleChange}
					  required/>
					</div>
					<div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
					  <p className="text-blk input-title">
						SUBJECT
					  </p>
					  <input className="input"  name="subject"value={formData.subject}
					  onChange={handleChange}
					  required/>
					</div>
					<div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
					  <p className="text-blk input-title">
						EMAIL
					  </p>
					  <input className="input"  name="email" value={formData.email}
					  onChange={handleChange}
					  required/>
					</div>
					<div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
					  <p className="text-blk input-title">
						PROFESSION
					  </p>
					  <input className="input"  name="profession"value={formData.profession}
					  onChange={handleChange}
					  required/>
					</div>
					<div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" >
					  <p className="text-blk input-title">
						WHAT DO YOU HAVE IN MIND
					  </p>
					  <textarea style={{resize:'none'}} className="textinput" name='message' placeholder="Please enter query..."value={formData.message}
					  onChange={handleChange}
					  required></textarea>
					</div>
				  </div>
				  <div className="btn-wrapper">
					<button className="btn btn-lg mt-4 btn-outline-dark">
					  Send Message
					</button>
				  </div>
				</div>
			  </form>
			</div>
			<div className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-5 wk-ipadp-10" >
			  <div className="container-box">
				<div className="text-content">
				  <p className="text-blk contactus-head">
					Contact us
				  </p>
				  <p className="text-blk contactus-subhead">
					Getting In Touch Is So Easy.... <br/> Our Team Is Always There For Resolving Your Issues
				  </p>
				</div>
				<div className="workik-contact-bigbox">
				  <div className="workik-contact-box">
					<div className="phone text-box">
					  <img className="contact-svg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET21.jpg" alt='error'/>
					  <p className="contact-text">
						+91 8000997623
					  </p>
					</div>
					<div className="address text-box">
					  <img className="contact-svg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET22.jpg" alt='error'/>
					  <p className="contact-text">
						habit_tracker@getintouch.com
					  </p>
					</div>
					<div className="mail text-box">
					  <img className="contact-svg" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/ET23.jpg" alt='error'/>
					  <p className="contact-text">
						Ahmedabad, Gujarat
					  </p>
					</div>
				  </div>
				  <div className="social-media-links">
					<a href="https://www.google.com/">
					  <img className="social-svg" id="is9ym" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-mail.svg" alt='error'/>
					</a>
					<a href="https://twitter.com/?lang=en">
					  <img className="social-svg" id="i706n" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-twitter.svg" alt='error'/>
					</a>
					<a href="https://www.instagram.com/">
					  <img className="social-svg" id="ib9ve" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-insta.svg" alt='error'/>
					</a>
					<a href="https://www.facebook.com/">
					  <img className="social-svg" id="ie9fx" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/gray-fb.svg" alt='error'/>
					</a>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
    </div>
  );
};

export default ContactForm;