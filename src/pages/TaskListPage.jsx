import { useEffect, useState } from 'react';
import TaskService from '../services/TaskService';

function Task() {
  const [tasks, setTasks] = useState([]);

  const taskAll = async () => {
    try {
      const data = await TaskService.getAll();
      setTasks(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    taskAll();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">List of Tasks</h2>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th></th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">State</th>
              <th scope="col">Accions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description ?? "No description"}</td>
                  <td>
                    {task.completed ? (
                      <span className="badge bg-success">Completed</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Earring</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-3">
                  There are no tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Task;
