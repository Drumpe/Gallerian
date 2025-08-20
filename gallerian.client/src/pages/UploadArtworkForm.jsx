import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

const UploadArtworkForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const [imagePreview, setImagePreview] = useState(null);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('artworkImage', data.artworkImage[0]);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('isNsfw', data.isNsfw);
        formData.append('mediumTags', JSON.stringify(data.mediumTags));
        formData.append('themeTags', JSON.stringify(data.themeTags));

        try {
            const response = await axios.post('/api/upload-artwork', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Artwork uploaded successfully:', response.data);
            alert('Artwork uploaded successfully!');
            reset();
            setImagePreview(null);
        } catch (error) {
            console.error('Error uploading artwork:', error);
            alert('Error uploading artwork. Please try again.');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className="container my-5" aria-label="Upload new artwork form">
            <h2 className="text-center mb-4">Upload New Artwork</h2>
            <form onSubmit={handleSubmit(onSubmit)} aria-labelledby="upload-artwork-heading">
                <h2 id="upload-artwork-heading" className="visually-hidden">Upload Artwork Form</h2>

                <div className="mb-3">
                    <label htmlFor="artworkImage" className="form-label">Upload Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="artworkImage"
                        aria-label="Upload artwork image"
                        {...register('artworkImage', { required: true })}
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="mt-3 text-center">
                            <img src={imagePreview} alt="Artwork Preview" style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} className="img-thumbnail" />
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titleInput"
                        aria-label="Artwork title"
                        {...register('title', { required: true })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="descriptionInput" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="descriptionInput"
                        rows="4"
                        aria-label="Artwork description"
                        {...register('description')}
                    ></textarea>
                </div>
                
                <fieldset className="mb-4">
                    <legend className="h5">Medium</legend>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="oilPaint" value="oil-paint" {...register('mediumTags')} />
                        <label className="form-check-label" htmlFor="oilPaint">Oil Paint</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="acrylicPaint" value="acrylic-paint" {...register('mediumTags')} />
                        <label className="form-check-label" htmlFor="acrylicPaint">Acrylic Paint</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="digitalArt" value="digital-art" {...register('mediumTags')} />
                        <label className="form-check-label" htmlFor="digitalArt">Digital Art</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="sculpture" value="sculpture" {...register('mediumTags')} />
                        <label className="form-check-label" htmlFor="sculpture">Sculpture</label>
                    </div>
                </fieldset>

                <div className="form-check mb-4">
                    <input type="checkbox" className="form-check-input" id="nsfwCheck" {...register('isNsfw')} />
                    <label className="form-check-label" htmlFor="nsfwCheck">NSFW (Not Safe for Work)</label>
                </div>
                
                <fieldset className="mb-4">
                    <legend className="h5">Themes</legend>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="people" value="people" {...register('themeTags')} />
                        <label className="form-check-label" htmlFor="people">People</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="love" value="love" {...register('themeTags')} />
                        <label className="form-check-label" htmlFor="love">Love</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="animals" value="animals" {...register('themeTags')} />
                        <label className="form-check-label" htmlFor="animals">Animals</label>
                    </div>
                </fieldset>

                <button type="submit" className="btn btn-primary w-100 mt-4">Submit Artwork</button>
            </form>
        </div>
    );
};

export default UploadArtworkForm;