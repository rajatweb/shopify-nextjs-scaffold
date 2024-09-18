"use client"; 

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('/api/shopify/products');
            setProducts(response.data.products);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Product Dashboard</h1>
            <ul>
                {products.map((product: any) => (
                    <li key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.body_html}</p>
                        <a href={`/dashboard/product/${product.id}`}>View Product</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
