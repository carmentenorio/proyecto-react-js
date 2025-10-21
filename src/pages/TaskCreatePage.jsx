import { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import TaskService from '../services/TaskService';
import CategoryService from '../services/CategoryService';
import TagService from '../services/TagService';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function TaskCreate() {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category_id: null,
        tags: [],
        completed: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await CategoryService.getAll();
                const tagsResponse = await TagService.getAll();
                setCategories(categoriesResponse.data?.data || categoriesResponse.data || categoriesResponse || []);
                setTags(tagsResponse.data?.data || tagsResponse.data || tagsResponse || []);

            } catch (error) {
                setError("Error loading categories/tags:", error.message);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await TaskService.create(formData);
            setShowModal(true);
            setFormData({
                title: "",
                description: "",
                category_id: null,
                tags: [],
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClose = () => {
        setShowModal(false);
        navigate("/tasks");
    };
    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Create new Task</h2>

            <div className="card shadow-sm p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="completed"
                                checked={formData.completed}
                                onChange={(e) =>
                                    setFormData({ ...formData, completed: e.target.checked })
                                }
                            />
                            <label className="form-check-label" htmlFor="completed">
                                Completed?
                            </label>
                        </div>

                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />

                    </div>
                    <button
                        type="submit"
                        className="btn btn-sm btn-info me-2"
                    >
                        Save
                    </button>
                    {error && <p className="text-danger mt-2">{error}</p>}

                    <Select
                        options={(categories || []).map((c) => ({
                            value: c.id,
                            label: c.name,
                        }))}
                        onChange={(opt) =>
                            setFormData({
                                ...formData,
                                category_id: opt ? opt.value : null,
                            })
                        }
                        placeholder="Select a category"
                    />
                    <Select
                        isMulti
                        options={(tags || []).map((t) => ({
                            value: t.id,
                            label: t.name,
                        }))}
                        onChange={(selected) =>
                            setFormData({
                                ...formData,
                                tags: selected.map((t) => t.value),
                            })
                        }
                        placeholder="Select a tags"
                    />
                </form >
            </div >
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Task created</Modal.Title>
                </Modal.Header>
                <Modal.Body>The task was created successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
}
export default TaskCreate;