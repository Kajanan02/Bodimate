import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import cameraIcon from '../../../assets/admin-listings/camera.svg'; // Ensure this path is correct
import addIcon from '../../../assets/admin-listings/plus-circle.svg'; // Ensure this path is correct
import './step7.css'; // Ensure this path is correct

const Step7 = ({ nextStep, prevStep }) => {
    const [photos, setPhotos] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const handlePhotoChange = (file) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhotos(prevPhotos => [...prevPhotos, reader.result]);
                setErrorMessage(""); // Clear error message on successful upload
            };
            reader.readAsDataURL(file);
        } else {
            setErrorMessage("Please upload a valid image file."); // Show error for invalid file type
        }
    };

    return (
        <div className="photo-upload-container">
            <div className="photo-upload-section mb-3 text-center">
                <h5 className="form-head fw-semibold">Add Some Photos of Your House</h5>
                <div className="form-sub-head fw-light fs-normal mb-4">
                    You'll need 5 photos to get started. You can add more or make changes later.
                </div>

                {/* Display error message if exists */}
                {errorMessage && <div className="text-danger">{errorMessage}</div>}

                <div className="row g-3 justify-content-center">
                    {photos.slice(0, 5).map((photo, index) => (
                        <div key={index} className="col-md-4 col-lg-3">
                            <div className="photo-preview">
                                <img src={photo} alt={`Uploaded ${index + 1}`} className="uploaded-photo" />
                            </div>
                        </div>
                    ))}
                    {photos.length < 5 && (
                        <div className="col-md-4 col-lg-3">
                            <FileUploader handleChange={handlePhotoChange} multiple={false}>
                                <div className="file-uploader-container">
                                    <img src={cameraIcon} alt="Upload Photo" width="80px" className="upload-icon" />
                                    <div className="upload-text">Upload Photo</div>
                                </div>
                            </FileUploader>
                        </div>
                    )}
                </div>

                {/* Add more photos */}
                <div className="mt-4">
                    <FileUploader handleChange={handlePhotoChange} multiple={false}>
                        <div className="file-uploader-container add-more-container d-flex justify-content-center align-items-center">
                            <img src={addIcon} alt="Add More Photos" width="50px" className="add-icon" />
                            <div className="add-more-text fw-semibold">Add More Images Here</div>
                        </div>
                    </FileUploader>
                </div>


            </div>
        </div>
    );
};

export default Step7;
