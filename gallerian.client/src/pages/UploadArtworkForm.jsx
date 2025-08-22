import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const UploadArtworkForm = () => {
    const { register, handleSubmit, watch, reset } = useForm();
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadMode, setUploadMode] = useState("file");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const imageUrl = watch("imageUrl");

    const onSubmit = async (data) => {
        const formData = new FormData();

        if (uploadMode === "file" && data.artworkImage?.[0]) {
            formData.append("ArtworkImage", data.artworkImage[0]);
        } else if (uploadMode === "url" && data.imageUrl) {
            formData.append("ImageURL", data.imageUrl);
        }

        formData.append("Title", data.title);
        formData.append("Description", data.description || "");
        formData.append("Private", false);
        formData.append("ForSale", false);

        if (data.mediumTags) {
            data.mediumTags.forEach(tag => formData.append("MediumTags", tag));
        }
        if (data.themeTags) {
            data.themeTags.forEach(tag => formData.append("ThemeTags", tag));
        }

        formData.append("IsNsfw", data.isNsfw || false);

        try {
            const token = localStorage.getItem("token");
            await api.post("/ArtWorks/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
            });

            setShowModal(true); 
        } catch (error) {
            console.error("Error uploading artwork:", error.response?.data || error.message);
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

            <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded shadow-sm bg-white">
                {/* Upload mode */}
                <div className="mb-4 text-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="uploadMode"
                            id="uploadFile"
                            value="file"
                            checked={uploadMode === "file"}
                            onChange={() => setUploadMode("file")}
                        />
                        <label className="form-check-label" htmlFor="uploadFile">
                            Upload from Computer
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="uploadMode"
                            id="uploadUrl"
                            value="url"
                            checked={uploadMode === "url"}
                            onChange={() => setUploadMode("url")}
                        />
                        <label className="form-check-label" htmlFor="uploadUrl">
                            Use Image URL
                        </label>
                    </div>
                </div>

                {/* File input */}
                {uploadMode === "file" && (
                    <div className="mb-3">
                        <label htmlFor="artworkImage" className="form-label">Upload Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="artworkImage"
                            {...register("artworkImage")}
                            onChange={handleImageChange}
                        />
                    </div>
                )}

                {/* URL input */}
                {uploadMode === "url" && (
                    <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">Image URL</label>
                        <input
                            type="url"
                            className="form-control"
                            id="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            {...register("imageUrl")}
                        />
                    </div>
                )}

                {/* Image preview */}
                {(imagePreview || imageUrl) && (
                    <div className="mt-3 text-center">
                        <img
                            src={imagePreview || imageUrl}
                            alt="Artwork Preview"
                            style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" }}
                            className="img-thumbnail shadow-sm"
                        />
                    </div>
                )}

                {/* Title */}
                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="titleInput"
                        {...register("title", { required: true })}
                    />
                </div>

                {/* Description */}
                <div className="mb-3">
                    <label htmlFor="descriptionInput" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="descriptionInput"
                        rows="4"
                        {...register("description")}
                    ></textarea>
                </div>

                {/* Medium checkboxes */}
                <fieldset className="mb-4">
                    <legend className="h5">Medium</legend>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="oilPaint" value="oil-paint" {...register("mediumTags")} />
                        <label className="form-check-label" htmlFor="oilPaint">Oil Paint</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="acrylicPaint" value="acrylic-paint" {...register("mediumTags")} />
                        <label className="form-check-label" htmlFor="acrylicPaint">Acrylic Paint</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="digitalArt" value="digital-art" {...register("mediumTags")} />
                        <label className="form-check-label" htmlFor="digitalArt">Digital Art</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="sculpture" value="sculpture" {...register("mediumTags")} />
                        <label className="form-check-label" htmlFor="sculpture">Sculpture</label>
                    </div>
                </fieldset>

                {/* NSFW checkbox */}
                <div className="form-check mb-4">
                    <input type="checkbox" className="form-check-input" id="nsfwCheck" {...register("isNsfw")} />
                    <label className="form-check-label" htmlFor="nsfwCheck">NSFW (Not Safe for Work)</label>
                </div>

                {/* Themes checkboxes */}
                <fieldset className="mb-4">
                    <legend className="h5">Themes</legend>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="people" value="people" {...register("themeTags")} />
                        <label className="form-check-label" htmlFor="people">People</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="love" value="love" {...register("themeTags")} />
                        <label className="form-check-label" htmlFor="love">Love</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input type="checkbox" className="form-check-input" id="animals" value="animals" {...register("themeTags")} />
                        <label className="form-check-label" htmlFor="animals">Animals</label>
                    </div>
                </fieldset>

                {/* Submit button */}
                <button type="submit" className="btn btn-primary w-100 mt-3">
                    Submit Artwork
                </button>

            </form>

            {/* Bootstrap Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Success </h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body text-center">
                                <p>Your artwork has been uploaded successfully!</p>
                                <p>What would you like to do next?</p>
                            </div>
                            <div className="modal-footer d-flex justify-content-between">
                                <button
                                    className="btn btn-dark"
                                    onClick={() => {
                                        reset();
                                        setImagePreview(null);
                                        setShowModal(false);
                                    }}
                                >
                                    Add Another
                                </button>


                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/profile")}
                                >
                                    Go to Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadArtworkForm;
