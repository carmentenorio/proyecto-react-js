import { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
import TaskService from '../services/TaskService';
import CategoryService from '../services/CategoryService';
import TagService from '../services/TagService';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

function TaskUpdate() {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category_id: null,
        tags: [],
        completed: false,
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [taskResponse, categoriesResponse, tagsResponse] = await Promise.all([
                    TaskService.getOne(id),
                    CategoryService.getAll(),
                    TagService.getAll(),
                ]);
                const taskData = taskResponse.data || taskResponse;

                setFormData({
                    title: taskData.title || "",
                    description: taskData.description || "",
                    category_id: taskData.category_id || null,
                    tag_ids: taskData.tags ? taskData.tags.map(t => t.id) : [],
                    completed: taskData.completed || false,
                });
                setCategories(categoriesResponse.data?.data || categoriesResponse.data || []);
                setTags(tagsResponse.data?.data || []);

            } catch (error) {
                setError("Error loading tasks:", error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await TaskService.update(id, formData);
            setShowModal(true);

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
            <h2 className="mb-4 text-center">Edit Task</h2>

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
                        />
                    </div>

                    <Select
                        options={(categories || []).map((c) => ({
                            value: c.id,
                            label: c.name,
                        }))}
                        value={
                            categories
                                .map((c) => ({ value: c.id, label: c.name }))
                                .find((opt) => opt.value === formData.category_id) || null
                        }
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
                        options={tags.map(t => ({ value: t.id, label: t.name }))}
                        value={(formData.tags || []).map(id => {
                            const tag = tags.find(t => t.id === id);
                            return tag ? { value: tag.id, label: tag.name } : null;
                        }).filter(Boolean)}

                        onChange={(selected) =>
                            setFormData({
                                ...formData,
                                tags: selected.map(t => t.value),
                            })
                        }
                        placeholder="Selecciona tags"
                    />

                    <button
                        type="submit"
                        className="btn btn-sm btn-info me-2"
                    >
                        Save
                    </button>

                    {error && <p className="text-danger mt-2">{error}</p>}

                </form>
            </div>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Task edited</Modal.Title>
                </Modal.Header>
                <Modal.Body>The task was edited successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );

}

export default TaskUpdate;