import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import CategoryService from '../services/CategoryService';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function CategoryUpdate() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: ""
    }
    );

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await CategoryService.getOne(id);
                setCategory(response.data);

            } catch (error) {
                setError(error.message);
            }
        };

        fetchCategory();
    }, [id]);

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
            const response = await CategoryService.update(id, formData);
            navigate("/categories");

            if (!response) {
                throw new Error("There was an error editing the category");
                setShowModal(true);
            }
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
            <h2 className="mb-4 text-center">Edit new Category</h2>

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

export default CategoryUpdate;