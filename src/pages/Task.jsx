import { useEffect, useState } from 'react';
import TaskService from '../services/TaskService';
function Task() {
  const [tasks, setTasks] = useState([]);
  const taskAll = async () => {
    try {
      const data = await TaskService.getAll();
      console.log("tasks", data.data)
      // setTasks(data.data);
    
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    taskAll();
  },[]);
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <h1>Hello World</h1>
    </div>
  );
}
export default Task;
