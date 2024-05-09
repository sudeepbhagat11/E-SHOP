import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";



export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        getProducts : builder.query({
            query : ()  => ({
                url : PRODUCTS_URL,
            }),
            keepUnusedDataFor : 5,  
        }),

        getProductDetails: builder.query({
            query : (productId) => ({
                url : `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor : 5, 

        })

        
        

    })
})

export const { useGetProductsQuery , useGetProductDetailsQuery } = productApiSlice; // Here G is capital