import { useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TagService from '../services/TagService';

function Tag() {
    const [tags, setTags] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const tagAll = async (page = 1) => {
        try {
            const response = await TagService.getAll(true, page);
            if (!response) throw new Error("There was an error fetching tags.");
            setTags(response.data || response);
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
        tagAll(currentPage);
    }, [currentPage]);

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
        </div>
    );
}

export default Tag;
