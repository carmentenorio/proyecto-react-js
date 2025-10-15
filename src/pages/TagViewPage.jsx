import { useEffect, useState } from 'react';
import TagService from '../services/TagService';
import { useParams } from 'react-router-dom';

function TagView() {
    const { id } = useParams();
    const [tag, setTag] = useState(null);

    useEffect(() => {
        const fetchTag = async () => {
            try {
                const response = await TagService.getOne(id);
                setTag(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTag();
    }, [id]);

    if (!tag)
        return <p className="text-center mt-5">Tag not found</p>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Tag details</h2>
            <div className="card shadow-sm p-4">
                <p><strong>ID:</strong> {tag.id}</p>
                <p><strong>Name:</strong> {tag.name}</p>
            </div>
        </div>
    );
}

export default TagView;