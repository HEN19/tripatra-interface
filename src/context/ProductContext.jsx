/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect  } from "react";
import {insertProduct,getListProduct, updateDataProduct,deleteDataProduct} from "../api/products";

const token = localStorage.getItem("authToken");
const ProductContext = createContext();

export const useProduct =() => {
    return useContext(ProductContext);
}

export const ProductProvider =({children}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(""); 

    
    
    const handleInsertProduct = async (product_name,price,stock) =>{
        setLoading(true)
        try{
            const response = await insertProduct(token,product_name,price,stock);
            setProducts((products) => [...products, response]);            
        }catch (error) {
            setError(error.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleGetListProduct = async () =>{
        setLoading(true)
        
        try {
            const response = await getListProduct(token);
            setProducts(response.API.content);             
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch products";
            setError(errorMessage)
            throw new Error(errorMessage);        
        } finally {
            setLoading(false);
        }
    }

    //update function
    const handleUpdateProduct = async (id, product_name, price, stock) => {
        setLoading(true);
        try {
            const data = await updateDataProduct(token, id, product_name, price, stock);
            setProducts((products) => [...products, data]);
            setError("");
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    //delete function
    const handleDeleteProduct = async (id) => {
        setLoading(true);
        try {
            const data = await deleteDataProduct(token, id);
            console.log(data)
            setError("");
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <ProductContext.Provider
            value={{ products, handleInsertProduct, handleGetListProduct,handleUpdateProduct,handleDeleteProduct, error, loading }}
        >
            {children}
        </ProductContext.Provider>
    );
};