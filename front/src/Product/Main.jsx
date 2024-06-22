import React, { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchProductList } from "../Api/ProductDetailApi";

const Product = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const baseUrl = "http://localhost:3001/api/product";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProductList();
        setProducts(response.data.products);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };
    fetchData();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", { style: "decimal" }).format(price);
  };

  return (
    <div className="container">
      <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 place-items-center">
        {products.map((el) => (
          <Card
            key={el._id}
            onClick={() => {
              navigate(`/product/${el._id}`);
            }}
            className="max-w-sm hover:cursor-pointer flex-grow h-full"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={el.imageUrl}
          >
            <h5 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-400">
              {el.brandName}
            </h5>
            <p className="text-sm font-bold tracking-tight text-transparent text-yellow-500 bg-clip-text">
              {el.title}
            </p>
            <h2 className="font-normal text-gray-700 dark:text-gray-400">
              ₩{formatPrice(el.price)}
            </h2>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Product;
