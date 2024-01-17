import Start from './startup_page'
import SignUp from './login_signup_page'
import Forget from './forget_pass'
import Home from './home_page'
import ContactForm from './contact_page'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
export default function Main(){
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Start/>}/>
      <Route exact path='/feedback' element={<ContactForm/>}/>
      <Route exact path='/login_signup' element={<SignUp/>}/>
      <Route exact path='/forget_pass' element={<Forget/>}/>
      <Route exact path='/login_signup/home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}