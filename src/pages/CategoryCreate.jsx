import { useState } from 'react';
import CategoryService from '../services/CategoryService';
import { useNavigate } from 'react-router-dom';

function CategoryCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: ""
    }
    );
    //
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await CategoryService.create(formData);
            console.log("Categoría creada:", response);
            alert("Categoría creada correctamente");
            navigate("/categories");
        } catch (error) {
            console.error(error);
            setError("Hubo un error al crear la categoría");
        }
    };

    const handleCreate = () => {
        navigate(`/categories/create`);
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