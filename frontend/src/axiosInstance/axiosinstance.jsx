let axiosInstance = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

export default axiosInstance;
