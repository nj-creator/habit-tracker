import {React,useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
export default function Habit(props) {
  const [data,handleData]=useState({
    title:'',
    description:'',
    sunday:false,
    monday:false,
    tuesday:false,
    wednesday:false,
    thursday:false,
    friday:false,
    saturday:false
  })
  const handleChange=(e)=>{
    handleData({...data,[e.target.name]:e.target.value})
  }
  const handleDayChange=(e)=>{
    data[e.target.name]?
    handleData({...data,[e.target.name]:false})
    :handleData({...data,[e.target.name]:true})
  }
  const handleSubmit=(e)=>{
    const user=props.data.user.email
    axios.post('http://localhost:8000/addhabit',{data,user:user})
    .then((res)=>{
      if(res.data.set){
        Swal.fire(
          {
            title: 'Success!',
            text: 'Task added',
            icon: 'success',
            confirmButtonText: 'OK'
          }
        ).then(
          handleData({...data,
          title:'',
          description:''
          })
        )
      }else{
        Swal.fire({
          title: 'Err!',
          text: 'Please enter all fields properly.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    })
    .catch(err=>{console.log(err);})
  }
  return (
    <div className="card text-center" style={{ width: '30rem' }}>
      <div className="card-header text-start">
        <b>Add Habit</b>
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text text-light bg-dark">Title</span>
          <input type="text" className="form-control" value={data.title} name='title' onChange={handleChange} placeholder="enter habit title here.." required/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text text-light bg-dark" >Desc</span>
          <textarea className="form-control" rows={3} cols={5} value={data.description} name='description' style={{ resize: 'none' }} onChange={handleChange} placeholder="enter description.." required></textarea>
        </div>
        <p><b>Frequency</b></p>
        <p className="d-flex justify-content-evenly">
          <input type='checkbox' id='sun' className="btn-check" onChange={handleDayChange} name="sunday"/>
          <label className="btn btn-outline-dark rounded-circle" htmlFor="sun">S</label>
          <input type='checkbox' id='mon'  className="btn-check" onChange={handleDayChange} name="monday"/>
          <label className="btn btn-outline-dark rounded-circle" htmlFor="mon">M</label>
          <input type='checkbox' id='tue' className="btn-check" onChange={handleDayChange} name="tuesday"/>
          <label className="btn btn-outline-dark rounded-circle" htmlFor="tue">T</label>
          <input type='checkbox' id='wed' className="btn-check" onChange={handleDayChange} name="wednesday"/>
          <label className="btn btn-outline-dark rounded-circle" htmlFor="wed">W</label>
          <input type='checkbox' id='thur' className="btn-check" onChange={handleDayChange} name="thursday"/>
          <label className="btn btn-outline-dark rounded-circle" htmlFor="thur">T</label>
          <input type='checkbox' id='fri' className="btn-check" onChange={handleDayChange} name="friday"/>
          <label className="btn btn-outline-dark rounded-circle" htmlFor="fri">F</label>
          <input type='checkbox' id='sat' className="btn-check" onChange={handleDayChange} name="saturday"/>
          <label className="btn btn-outline-dark rounded-circle" htmlFor="sat">S</label>
        </p>
        
        <button className="btn btn-dark" onClick={handleSubmit} type="submit">Add</button>
      </div>
    </div>
  )
}