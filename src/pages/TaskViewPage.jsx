import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskService from "../services/TaskService";
import { Button, Card, Badge } from "react-bootstrap";

function TaskShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await TaskService.getOne(id);
        setTask(data);
      } catch (err) {
        setError("The task could not be loaded.");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <h5>{error}</h5>
        <Button variant="secondary" onClick={() => navigate("/tasks")}>
          Return to list
        </Button>
      </div>
    );
  }

  if (!task) {
    return <p className="text-center mt-5">The task was not found.</p>;
  }

  return (
    <div className="container mt-5">
      <Card className="shadow-sm p-4">
        <h2 className="mb-3">{task.title}</h2>
        <p>
          <strong>Description:</strong> {task.description || "No description"}
        </p>
        <p>
          <strong>Category:</strong>{" "}
          {task.category?.name || "No category assigned"}
        </p>
        <p>
          <strong>Tags:</strong>{" "}
          {task.tags && task.tags.length > 0 ? (
            task.tags.map((tag) => (
              <Badge bg="info" key={tag.id} className="me-1">
                {tag.name}
              </Badge>
            ))
          ) : (
            <span className="text-muted">Sin tags</span>
          )}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          {task.completed ? (
            <Badge bg="success">Completed</Badge>
          ) : (
            <Badge bg="warning" text="dark">
              Earring
            </Badge>
          )}
        </p>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="secondary" onClick={() => navigate("/tasks")}>
            Return to list
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default TaskShowPage;
