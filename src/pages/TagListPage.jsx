import { useEffect, useState } from 'react';
import { Modal, Button, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TagService from '../services/TagService';

function Tag() {
    const [tags, setTags] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);

    const tagAll = async () => {
        const response = await TagService.getAllPaginated(page);
        setTags(response.data || []);
        setPagination({
            current_page: response.current_page,
            last_page: response.last_page,
            next_page_url: response.next_page_url,
            prev_page_url: response.prev_page_url,
        });
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await TagService.getAllPaginated(page);
                setTags(response.data || []);
                setPagination({
                    current_page: response.current_page,
                    last_page: response.last_page,
                    next_page_url: response.next_page_url,
                    prev_page_url: response.prev_page_url,
                });
            } catch (error) {
                console.error("Error loading tags:", error);
            }
        };

        fetchTags();
    }, [page]);

    const handleView = (tag) => navigate(`/tags/${tag.id}/view`);
    const handleEdit = (tag) => navigate(`/tags/${tag.id}/edit`);
    const handleCreate = () => navigate(`/tags/create`);

    const handleDelete = (tag) => {
        setSelectedTag(tag);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await TagService.remove(selectedTag.id);
            await tagAll();
            handleClose();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedTag(null);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">List of Tags</h2>

            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                    Create Tag
                </button>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="table-responsive shadow-sm rounded">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tags.length > 0 ? (
                            tags.map((tag, index) => (
                                <tr key={tag.id}>
                                    <td>{index + 1}</td>
                                    <td>{tag.name}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-sm btn-info me-2"
                                            onClick={() => handleView(tag)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-sm btn-primary me-2"
                                            onClick={() => handleEdit(tag)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(tag)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-3">
                                    There are no tags available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTag ? (
                        <p>
                            Are you sure you want to delete the tag{" "}
                            <strong>{selectedTag.name}</strong>?
                        </p>
                    ) : (
                        <p>No tag selected.</p>
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
            <button
                disabled={!pagination.prev_page_url}
                onClick={() => setPage(page - 1)}
            >
                ← Former
            </button>
            <span>Page {pagination.current_page} of {pagination.last_page}</span>
            <button
                disabled={!pagination.next_page_url}
                onClick={() => setPage(page + 1)}
            >
                Following →
            </button>
        </div>
    );
}

export default Tag;
