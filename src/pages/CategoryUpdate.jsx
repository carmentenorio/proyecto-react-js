import { useEffect, useState } from 'react';
import CategoryService from '../services/CategoryService';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function CategoryUpdate() {
    const navigate = useNavigate();
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
                console.log(error);
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

        try {
            const response = await CategoryService.update(id, formData);
            console.log("Categoría editada:", response);
            alert("Categoría actualizada correctamente");
            navigate("/categories");
        } catch (error) {
            console.error(error);
            setError("Hubo un error al editar la categoría");
        }
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
        </div>
    );

}

export default CategoryUpdate;