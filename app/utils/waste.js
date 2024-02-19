if (error.response) {

    if (error.response.status === 409) {
        toast.error('This email or Phone is already registered. Please Login ...', { position: toast.POSITION.TOP_CENTER })

        // setErrorMessage('User is already registered. Please Login ...');
    } else if (error.response.status === 401) {
        toast.error(error.response.data.message, { position: toast.POSITION.TOP_CENTER })

        // setErrorMessage('Please Enter Password must be 5+ characters with at least 1 uppercase, 1 lowercase, and 1 digit.');
    } else if (error.response.status === 409) {
        toast.error('User Exisited ', { position: toast.POSITION.TOP_CENTER })

        // setErrorMessage('Please Enter Password must be 5+ characters with at least 1 uppercase, 1 lowercase, and 1 digit.');
    } else if (error.response.status === 404) {
        toast.error('Invalid user data.', { position: toast.POSITION.TOP_CENTER })

        // setErrorMessage('Invalid user data.');
    } else if (error.response.status === 500) {
        toast.error('Internal server error', { position: toast.POSITION.TOP_CENTER })

        // setErrorMessage('Internal server error');
    } else {
        toast.error('An error occurred during registration.', { position: toast.POSITION.TOP_CENTER })

        // setErrorMessage('An error occurred during registration.');
    }
} else if (error.request) {
    toast.error('No response received from the server.', { position: toast.POSITION.TOP_CENTER })

    // setErrorMessage('No response received from the server.');
} else {
    toast.error('Error setting up the request.', { position: toast.POSITION.TOP_CENTER })

    // setErrorMessage('Error setting up the request.');
}