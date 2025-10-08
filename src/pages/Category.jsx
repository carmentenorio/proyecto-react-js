import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import CategoryService from '../services/CategoryService';

function Category() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const CategoryAll = async () => {
    try {
      const data = await CategoryService.getAll();
      console.log("categories:", data);
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CategoryAll();
  }, []);

  const handleView = (category) => {
    navigate(`/categories/view/${category.id}`);
  };

  const handleEdit = (category) => {
    navigate(`/categories/edit/${category.id}`);
  };

  const handleCreate = () => {
    navigate(`/categories/create`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">List of Categories</h2>

      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={handleCreate}
        >
          Create Category
        </button>
      </div>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th></th>
              <th scope="col">Title</th>
              <th scope="col">Accions</th>
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
                <td colSpan="4" className="text-center py-3">
                  There are no categories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
