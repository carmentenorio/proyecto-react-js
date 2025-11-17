import { useEffect, useState } from 'react';
import TaskService from '../services/TaskService';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function Task() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const TasksAll = async (page = 1) => {
    try {
      const response = await TaskService.getAll(true, page);

      if (!response) throw new Error("Error fetching tasks.");

      setTasks(response.data || response);
      
      setPagination({
        current_page: response.current_page,
        last_page: response.last_page,
        total: response.total,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    TasksAll(currentPage);
  }, [currentPage]);

  const handleView = (task) => navigate(`/tasks/${task.id}/view`);
  const handleEdit = (task) => navigate(`/tasks/${task.id}/edit`);
  const handleCreate = () => navigate(`/tasks/create`);

  const handleDelete = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await TaskService.remove(selectedTask.id);
      await TasksAll(currentPage);
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTask(null);
  };
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
      {pagination && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button
            variant="secondary"
            disabled={pagination.current_page === 1}
            onClick={() => setCurrentPage(pagination.current_page - 1)}
          >
            ← Previous
          </Button>

          <span>
            Page {pagination.current_page} of {pagination.last_page}
          </span>

          <Button
            variant="secondary"
            disabled={pagination.current_page === pagination.last_page}
            onClick={() => setCurrentPage(pagination.current_page + 1)}
          >
            Next →
          </Button>
        </div>
      )}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask ? (
            <p>
              Are you sure you want to delete the task{" "}
              <strong>{selectedTask.title}</strong>?
            </p>
          ) : (
            <p>No task selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default Task;
