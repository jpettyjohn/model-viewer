import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'; 

function UploadButton() {
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileChange = (event) => {
        // Get the selected file
        const file = event.target.files[0];
        // Update the state with the selected file
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();

            formData.append('file', selectedFile);
            formData.append('name', selectedFile.name);
            formData.append('size', selectedFile.size);
            formData.append('type', selectedFile.type);

            console.log('Uploading file:', selectedFile);
            // axios.post('/upload', formData)
            //     .then(response => {
            //         console.log('File uploaded successfully:', response.data);
            //         // Handle any further actions after successful upload
            //     })
            //     .catch(error => {
            //         console.error('Error uploading file:', error);
            //         // Handle error
            //     });

          setSelectedFile(null);
          setUploadedFile(true);
        } else {
          console.log('No file selected');
        }
    };
    
    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
        setUploadedFile(false);
    };

    return (
        <div class="upload-button-main">
            <div class="upload-button-container">
                <div class="upload-button-input">
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept=".rvt"
                    />
                    <Button
                        variant="light"
                        as="input"
                        type="button"
                        value="Choose File"
                        onClick={handleButtonClick}
                        accept=".rvt"
                    />{' '}
                    <div class="upload-selected-file">
                        {selectedFile && <p class=''>Selected file: {selectedFile.name}</p>}
                        {!selectedFile && <p style={{color: 'transparent'}}>Selected File: </p>}
                    </div>
                </div>
                <div class="upload-button-button">
                    <Button variant="primary" type="submit" onClick={handleUpload}>Upload</Button>{' '}
                    {uploadedFile && <p style={{color: 'rgb(127, 252, 3)', width: '50%', whiteSpace: 'normal'}}>Upload Successful</p>}
                </div>
            </div>
        </div>
    );
}

export default UploadButton;