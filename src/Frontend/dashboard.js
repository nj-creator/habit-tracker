import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Dashboard(props) {
  const [tasks, setTasks] = useState([]);
  const user = props.data.user.email;
  const dayList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const day = dayList[(new Date()).getDay()];
  useEffect(() => {
    // Fetch tasks from the server and update the state
    axios.post('http://localhost:8000/tasks', { user })
      .then((response) => {
        // console.log(response.data);
        setTasks(response.data.habits[day]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user,day]);
  if(tasks.length>0){
    return (
          <div>
            <p className="display-1 mb-5">Todays tasks</p>
            <table border='1' className="table rounded">
              <thead align='center'>
                <tr>
                  <th scope="col">Sr no.</th>
                  <th scope="col">Habit</th>
                  <th scope="col">Description</th>
                  <th scope="col">Check</th>
                </tr>
              </thead>
              <tbody align='center'>
                {
                  tasks.map((e, k) => {
                    return (
                      <tr>
                        <th scope="row">{k + 1}</th>
                        <td>{e.title}</td>
                        <td>{e.description}</td>
                        <td><input type='checkbox' id={k} className="btn-check"></input><label className='btn btn-sm btn-outline-dark' htmlFor={k}>done</label></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
         )}else{
          return(
            <div className="display-1">No Tasks For Today</div>
          )
         }
}
