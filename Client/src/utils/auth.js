import axios from 'axios';

const auth = async () => {
  const CLIENT_ID = 'kF2Nv4HAjsJ6Gp2RjiRZ5Gyf3wHhGXDzodTiqjCms8e02GcO';
  const SCOPE = 'viewables:read data:write'; // Include the required scopes for uploading
  const AUTH_URL = 'https://developer.api.autodesk.com/authentication/v1/authenticate';

  try {
    // Make a POST request to the Autodesk Forge authentication endpoint
    const response = await axios.post(AUTH_URL, {
      client_id: CLIENT_ID,
      grant_type: 'client_credentials',
      scope: SCOPE
    });

    // Check if the response is successful (status code 200)
    if (response.status === 200) {
      // Extract the access token from the response
      const accessToken = response.data.access_token;
      
      // Use the access token for further operations
      console.log('Access Token:', accessToken);
      return accessToken;
    } else {
      // Handle error response
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Error:', error.message);
  }
};

// Call the function to authenticate with Autodesk Forge
export default auth;