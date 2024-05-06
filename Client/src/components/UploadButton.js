import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getAccessToken } from "../utils/viewerapi";

function UploadButton() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [selectedName, setSelectedName] = useState("model-file");
	const [uploadedFile, setUploadedFile] = useState(null);

	const handleFileChange = (event) => {
		// Get the selected file
		const file = event.target.files[0];
		// Update the state with the selected file
		setSelectedFile(file);
	};

	const postModelFile = async (formData) => {
		getAccessToken(async function (access_token, expires_in) {
			console.log(access_token);
			try {
				const response = await fetch("http://localhost:8010/api/models", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
					body: formData,
				});
				const data = await response.json();
				console.log("File uploaded successfully:", data);
				return data;
			} catch (error) {
				console.error("Error uploading file:", error);
				throw error;
			}
		});
	};

	const handleUpload = async () => {
		if (selectedFile) {
			const data = new FormData();
			data.append("model-file", selectedFile);
			console.log("Uploading file:", selectedFile);
			postModelFile(data);
			//post to autodesk servers
			//Must create a unique name for the file everytime
			//user specifies name or random generator
			setSelectedName("file");
			setSelectedFile(null);
			setUploadedFile(true);
		} else {
			console.log("No file selected");
		}
	};

	const handleButtonClick = () => {
		document.getElementById("fileInput").click();
		setUploadedFile(false);
	};

	return (
		<div class="upload-button-main">
			<div class="upload-button-container">
				<div class="upload-button-input">
					<input
						type="file"
						id="fileInput"
						style={{ display: "none" }}
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
					/>{" "}
					<div class="upload-selected-file">
						{selectedFile && <p class="">Selected file: {selectedFile.name}</p>}
						{!selectedFile && <p style={{ color: "transparent" }}>Selected File: </p>}
					</div>
				</div>
				<div class="upload-button-button">
					<Button variant="primary" type="submit" onClick={handleUpload}>
						Upload
					</Button>{" "}
					{uploadedFile && (
						<p
							style={{
								color: "rgb(127, 252, 3)",
								width: "50%",
								whiteSpace: "normal",
							}}>
							Upload Successful
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default UploadButton;
