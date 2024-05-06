import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function UploadButton() {
	const [selectedFile, setSelectedFile] = useState(null);
	const [selectedName, setSelectedName] = useState("Test");
	const [uploadedFile, setUploadedFile] = useState(null);
	const [accessToken, setAccessToken] = useState(null);

	const handleFileChange = (event) => {
		// Get the selected file
		const file = event.target.files[0];
		// Update the state with the selected file
		setSelectedFile(file);
	};

	//const getBucketKey = async () => {};

	const getAccessToken = async (callback) => {
		const resp = await fetch("http://localhost:8010/api/auth/token");
		if (!resp.ok) {
			throw new Error(await resp.text());
		}
		const { access_token, expires_in } = await resp.json();
		// Callback with access token and expiration
		callback(access_token, expires_in);
	};

	const handleUpload = async () => {
		getAccessToken(async function (access_token, expires_in) {
			if (selectedFile) {
				const formData = new FormData();
				formData.append("file", selectedFile);
				console.log("Uploading file:", selectedFile);

				//post to autodesk servers
				//Must create a unique name for the file everytime
				//user specifies name or random generator
				setSelectedName("Test");
				setSelectedFile(null);
				setUploadedFile(true);
				try {
					const response = await fetch(
						"https://developer.api.autodesk.com/oss/v2/buckets/${APS_BUCKET}/objects/${selectedName}",
						{
							method: "POST",
							headers: {
								Authorization: `Bearer ${accessToken}`,
							},
							body: formData,
						}
					);
					const data = await response.json();
					console.log("File uploaded successfully:", data);
					return data;
				} catch (error) {
					console.error("Error uploading file:", error);
					throw error;
				}
			} else {
				console.log("No file selected");
			}
		});
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
