import axios from "axios";

const API_URL = "http://localhost:8080/v1/product"; 


// Insert Request
export const insertProduct = async(token, product_name,price,stock) => {
    try {
        const response = await axios.post(`${API_URL}`, {
            product_name,
            price,
            stock
        },
        { 
            headers: {
                Authorization: `${token}` 
            }
        });

        return response.API.content
    } catch (error) {
        throw error.response?.API.content || "Insert Data Failed !!"
    }
};

// Get List Product
export const getListProduct = async(token) => { 
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `${token}`  // Include the token in the Authorization header
            }
        });

        return response.data;  // Return the data from the response
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Get List Product Failed!";
        throw new Error(errorMessage);
    }
}

export const updateDataProduct = async( token, id, product_name,price,stock) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, {
            product_name,
            price,
            stock
        },
        { 
            headers: {
                Authorization: `${token}` 
            }
        });

        return response.API.content
    } catch (error) {
        throw error.response?.API.content || "Update Data Failed !!"
    }
}

export const deleteDataProduct = async( token, id,) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, 
        { 
            headers: {
                Authorization: `${token}` 
            }
        });

        return response.API.content
    } catch (error) {
        throw error.response?.API.content || "Delete Data Failed !!"
    }
}