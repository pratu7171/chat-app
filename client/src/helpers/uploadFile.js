const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'chat-app-file'); // Make sure this preset is created and set to unsigned in your Cloudinary dashboard

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData; // Return the response data

    } catch (error) {
        console.error('Error during file upload:', error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};

export default uploadFile;
