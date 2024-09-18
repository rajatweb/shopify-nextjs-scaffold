"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('/api/shopify/products');
            console.log("🚀 ~ fetchProducts ~ response:", response.data.products.edges)
            setProducts(response.data.products.edges);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product Dashboard</h1>
            <ul>
                {products.map((product: any) => {
                    const gidString = product.node.id;
                    const gidArray = gidString.split("/");
                    return (
                        <li key={product.node.id}>
                            {`${product.node.id}`}
                            <h2>{product.node.title}</h2>
                            <p>{product.node.descriptionHtml}</p>
                            <a href={`/dashboard/product/${gidArray[gidArray.length - 1]}}`}>View Product</a>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Dashboard;
