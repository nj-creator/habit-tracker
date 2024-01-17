import React, { useState, useEffect } from "react";
import axios from 'axios';
import Swal from "sweetalert2";
export default function Modify(props) {
  const user = props.data.user.email;
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    // Fetch tasks from the server and update the state
    axios.post('http://localhost:8000/tasks', { user })
      .then((response) => {
        setTasks(response.data.habits || {});
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  const handleDelete = (title, desc, day) => {
    console.log(title, day);
    axios.post('http://localhost:8000/delete', { title, day, desc, user })
      .then((res) => {
        if(res.data.set){
          Swal.fire({
            title: 'Attention!',
            text: 'Task Deleted',
            icon: 'success',
            confirmButtonText: 'OK'
          })
        }
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            updatedTasks[day] = updatedTasks[day].filter(task => task.title !== title);
            return updatedTasks;
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <center>
      <p className="display-1">Delete Tasks</p>
      {Object.keys(tasks).length > 0 ? (
        <table className="table table-hover">
          <tbody align='center'>
            {Object.keys(tasks).map((day) => {
              return (
                <tr key={day}>
                  <td >{day}</td>
                  {tasks[day].map((task) => (
                    <td >{task.title}
                      <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => handleDelete(task.title, task.description, day)}
                      >
                        <i className="lar la-trash-alt"></i>
                      </button></td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </center>
  )
}
