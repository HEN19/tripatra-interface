/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState, useContext, useEffect  } from "react";
import {insertProduct,getListProduct} from "../api/products";

const token = localStorage.getItem("authToken");
const ProductContext = createContext();

export const useProduct =() => {
    return useContext(ProductContext);
}

export const ProductProvider =({children}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(""); 

    
    
    // const handleInsertProduct = async () =>{
    //     setLoading(true)
    //     try{
    //         const response = await insertProduct();
    //         setProducts([...products,response.data])
            
    //     }catch (error) {
    //         setError(error.message || "An unexpected error occurred");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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


    return (
        <ProductContext.Provider
            value={{ products, handleGetListProduct, error, loading }}
        >
            {children}
        </ProductContext.Provider>
    );
};



