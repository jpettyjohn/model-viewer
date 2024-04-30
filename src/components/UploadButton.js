import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'; 

function UploadButton() {
    
    const [selectedFile, setSelectedFile] = useState(null);

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
        } else {
          console.log('No file selected');
        }
    };
    
    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
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
                </div>
                <div>
                    <Button variant="primary" onClick={handleUpload}>Upload</Button>{' '}
                </div>
                <div>
                    {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                </div>
            </div>
        </div>
    );
}

export default UploadButton;