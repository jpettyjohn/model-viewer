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
            axios.post('/upload', formData)
                .then(response => {
                    console.log('File uploaded successfully:', response.data);
                    // Handle any further actions after successful upload
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    // Handle error
                });
          setSelectedFile(null);
        } else {
          console.log('No file selected');
        }
    };

    return (
        <div class="button-main">
        <input
        type="file"
        onChange={handleFileChange}
        accept=".rvt" // Optional: Specify accepted file types
        />
        <Button variant="secondary" onClick={handleUpload}>Upload</Button>{' '}
        {/* Optional: Display selected file name */}
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
    );
}

export default UploadButton;