"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const ProductPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  console.log("🚀 ~ ProductPage ~ id:", id)
  const [product, setProduct] = useState(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await axios.get(`/api/shopify/products/${id}`);
        console.log("🚀 ~ fetchProduct ~ response:", response)
        setProduct(response.data.product);
      };

      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    // Example: Countdown timer of 24 hours
    const timer = setInterval(() => {
      setCountdown((prev) => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      {/* <h1>{product?.title}</h1>
      <p>{product.body_html}</p> */}
      <div>Time Left for Sale: {countdown} seconds</div>
    </div>
  );
};

export default ProductPage;
