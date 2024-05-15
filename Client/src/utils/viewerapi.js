export async function getAccessToken(callback) {
	const resp = await fetch("http://localhost:8010/api/auth/token");
	if (!resp.ok) {
		throw new Error(await resp.text());
	}
	const { access_token, expires_in } = await resp.json();
	// Callback with access token and expiration
	callback(access_token, expires_in);
}

// Function to initialize viewer
export function initViewer(container) {
	return new Promise(function (resolve, reject) {
		// Call getAccessToken to retrieve access token
		getAccessToken(function (access_token, expires_in) {
			//console.log(access_token);
			// Initialize viewer after retrieving access token
			/* eslint-disable */
			Autodesk.Viewing.Initializer(
				{ env: "AutodeskProduction", accessToken: access_token, height: "50%", width: "50%" },
				function () {
					const config = {
						extensions: ["Autodesk.DocumentBrowser"],
					};
					const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
					viewer.start();
					viewer.setTheme("light-theme");
					// Resolve promise with viewer instance
					resolve(viewer);
				}
			);
			/* eslint-enable */
		});
	});
}

export function loadModel(viewer, urn) {
	return new Promise(function (resolve, reject) {
		function onDocumentLoadSuccess(doc) {
			resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));
		}
		function onDocumentLoadFailure(code, message, errors) {
			reject({ code, message, errors });
		}
		viewer.setLightPreset(0);
		/* eslint-disable */
		Autodesk.Viewing.Document.load("urn:" + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
		/* eslint-enable */
	});
}
