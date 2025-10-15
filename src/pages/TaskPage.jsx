import { useEffect, useState } from 'react';
import TaskService from '../services/TaskService';
import { useNavigate } from 'react-router-dom';

function Task() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const taskAll = async () => {
    try {
      const data = await TaskService.getAll();
      setTasks(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreate = (tasks) => {
    navigate('/tasks/create')
  };

  useEffect(() => {
    taskAll();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">List of Tasks</h2>
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => handleCreate(tasks)}
        >
          Create Task
        </button>
      </div>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th></th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">           </th>
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
                    Categories: {task.category?.name || "Uncategorized"}<br />
                    Tags:{" "}
                    {task.tags && task.tags.length > 0
                      ? task.tags.map((tag) => tag.name).join(", ")
                      : "Sin tags"}

                  </td>
                  <td>
                    {task.completed ? (
                      <span className="badge bg-success">Completed</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Earring</span>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleView(task)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(task)}
                    >
                      Delete
                    </button>
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
    </div >
  );
}

export default Task;
