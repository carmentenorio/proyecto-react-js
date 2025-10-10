import { useState } from 'react';
import CategoryService from '../services/CategoryService';
import { useNavigate } from 'react-router-dom';

function CategoryCreate() {
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

            alert("Categoría creada correctamente");

            navigate("/categories");

            if (!response.ok) {
                throw new Error("There was an error creating the category");
            }
            
        } catch (error) {
            setError(error.message);
        }
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

                </form>
            </div>
        </div>
    );

}

export default CategoryCreate;