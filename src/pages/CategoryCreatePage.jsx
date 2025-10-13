import { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import CategoryService from '../services/CategoryService';
import { useNavigate } from 'react-router-dom';

function CategoryCreate() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: ""
    }
    );
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await CategoryService.create(formData);

            if (!response.ok) {
                throw new Error("There was an error creating the category.");
            }
            setShowModal(true);

        } catch (error) {
            setError(error.message);
        }
    };
    const handleClose = () => {
        setShowModal(false);
        navigate("/categories");
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Create new Category</h2>

            <div className="card shadow-sm p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
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
                </form>
            </div>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Category created</Modal.Title>
                </Modal.Header>
                <Modal.Body>The category was created successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default CategoryCreate;