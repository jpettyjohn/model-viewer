import React, { useEffect, useState } from "react";
import { initViewer, loadModel } from "../utils/viewerapi.js";

const ViewerComponent = () => {
	const [viewer, setViewer] = useState(null);
	const [selectedUrn, setSelectedUrn] = useState(null);

	useEffect(() => {
		initViewer(document.getElementById("preview")).then((viewer) => {
			setViewer(viewer);
			const urn = window.location.hash?.substring(1);
			setSelectedUrn(urn);
			setupModelSelection(viewer, urn);
			setupModelUpload(viewer);
		});
	}, []);

	const setupModelSelection = async (viewer, selectedUrn) => {
		const dropdown = document.getElementById("models");
		dropdown.innerHTML = "";
		try {
			const resp = await fetch("/api/models");
			if (!resp.ok) {
				throw new Error(await resp.text());
			}
			const models = await resp.json();
			dropdown.innerHTML = models.map((model) => (
				<option key={model.urn} value={model.urn} selected={model.urn === selectedUrn}>
					{model.name}
				</option>
			));
			dropdown.onchange = () => onModelSelected(viewer, dropdown.value);
			if (dropdown.value) {
				onModelSelected(viewer, dropdown.value);
			}
		} catch (err) {
			alert("Could not list models. See the console for more details.");
			console.error(err);
		}
	};

	const setupModelUpload = async (viewer) => {
		const upload = document.getElementById("upload");
		const input = document.getElementById("input");
		const models = document.getElementById("models");
		upload.onclick = () => input.click();
		input.onchange = async () => {
			const file = input.files[0];
			let data = new FormData();
			data.append("model-file", file);
			if (file.name.endsWith(".zip")) {
				const entrypoint = window.prompt("Please enter the filename of the main design inside the archive.");
				data.append("model-zip-entrypoint", entrypoint);
			}
			upload.setAttribute("disabled", "true");
			models.setAttribute("disabled", "true");
			showNotification(`Uploading model <em>${file.name}</em>. Do not reload the page.`);
			try {
				const resp = await fetch("/api/models", {
					method: "POST",
					body: data,
				});
				if (!resp.ok) {
					throw new Error(await resp.text());
				}
				const model = await resp.json();
				setupModelSelection(viewer, model.urn);
			} catch (err) {
				alert(`Could not upload model ${file.name}. See the console for more details.`);
				console.error(err);
			} finally {
				clearNotification();
				upload.removeAttribute("disabled");
				models.removeAttribute("disabled");
				input.value = "";
			}
		};
	};

	const onModelSelected = async (viewer, urn) => {
		if (window.onModelSelectedTimeout) {
			clearTimeout(window.onModelSelectedTimeout);
			delete window.onModelSelectedTimeout;
		}
		window.location.hash = urn;
		try {
			const resp = await fetch(`/api/models/${urn}/status`);
			if (!resp.ok) {
				throw new Error(await resp.text());
			}
			const status = await resp.json();
			switch (status.status) {
				case "n/a":
					showNotification(`Model has not been translated.`);
					break;
				case "inprogress":
					showNotification(`Model is being translated (${status.progress})...`);
					window.onModelSelectedTimeout = setTimeout(onModelSelected, 5000, viewer, urn);
					break;
				case "failed":
					showNotification(
						`Translation failed. <ul>${status.messages
							.map((msg) => `<li>${JSON.stringify(msg)}</li>`)
							.join("")}</ul>`
					);
					break;
				default:
					clearNotification();
					loadModel(viewer, urn);
					break;
			}
		} catch (err) {
			alert("Could not load model. See the console for more details.");
			console.error(err);
		}
	};

	const showNotification = (message) => {
		const overlay = document.getElementById("overlay");
		overlay.innerHTML = `<div class="notification">${message}</div>`;
		overlay.style.display = "flex";
	};

	const clearNotification = () => {
		const overlay = document.getElementById("overlay");
		overlay.innerHTML = "";
		overlay.style.display = "none";
	};

	return (
		<div>
			<div id="preview"></div>
			<div>
				<select id="models"></select>
				<input type="file" id="input" style={{ display: "none" }} />
				<button id="upload">Upload Model</button>
			</div>
			<div id="overlay"></div>
		</div>
	);
};

export default ViewerComponent;
