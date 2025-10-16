import { useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CategoryService from '../services/CategoryService';

function Category() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const CategoryAll = async () => {
    try {
      const response = await CategoryService.getAll();
      console.log(response);
      

      if (!response) throw new Error("There was an error fetching categories.");

      setCategories(response.data?.data || response.data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    CategoryAll();
  }, []);

  const handleView = (category) => navigate(`/categories/${category.id}/view`);
  const handleEdit = (category) => navigate(`/categories/${category.id}/edit`);
  const handleCreate = () => navigate(`/categories/create`);
  const handleDelete = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await CategoryService.remove(selectedCategory.id);

      if (!response) throw new Error("There was an error deleting the category.");

      await CategoryAll();
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">List of Categories</h2>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleCreate}>
          Create Category
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
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleView(category)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(category)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-3">
                  There are no categories available.
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
          {selectedCategory ? (
            <p>
              Are you sure you want to delete the category{" "}
              <strong>{selectedCategory.name}</strong>?
            </p>
          ) : (
            <p>No category selected.</p>
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

export default Category;
