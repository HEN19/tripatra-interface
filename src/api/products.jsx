import axios from "axios";

const API_URL = "http://localhost:8080/v1/product"; 


// Insert Request
export const insertProduct = async(product_name,price,stock) => {
    try {
        const response = await axios.post(`${API_URL}/`, {
            product_name,
            price,
            stock
        });
        return response.data
    } catch (error) {
        throw error.response?.data || "Insert Data Failed !!"
    }
};

// Get List Product
export const getListProduct = async(product_name,price,stock) => { 
    try{
        const response  = await axios.get(`${API_URL}/`, {
            product_name,
            price,
            stock
        })
        return response.data
    } catch(error) {
        throw error.response?.data || "Get List Product Failed !!"
    }
}