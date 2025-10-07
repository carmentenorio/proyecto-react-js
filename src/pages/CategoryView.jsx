import { useEffect, useState } from 'react';
import CategoryService from '../services/CategoryService';
import { useParams } from 'react-router-dom';

function CategoryView() {
    const { id } = useParams();
    const [category, setCategory] = useState(null);

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

    if (!category)
        return <p className="text-center mt-5">Categoría no encontrada</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Detalles de la categoría</h2>
            <div className="card shadow-sm p-4">
                <p><strong>ID:</strong> {category.id}</p>
                <p><strong>Nombre:</strong> {category.name}</p>
            </div>
        </div>
    );
}

export default CategoryView;