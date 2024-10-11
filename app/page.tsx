"use client";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  price: number;
  img: string;
  text: string;
  status: number;
  category: string;
  __v: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/product");
      const data = await res.json();

      const productsWithImages = await Promise.all(
        data?.data.map(async (item: Product) => {
          const imgUrl = await getTelegramImageUrl(item.img);
          return { ...item, img: imgUrl }; // Store the actual image URL in the product object
        })
      );

      setProducts(productsWithImages); // Update state with products containing valid image URLs
    };

    fetchProducts();
  }, []);

  const getTelegramImageUrl = async (fileId: string) => {
    const response = await fetch(
      `https://api.telegram.org/bot7838539243:AAHaTHA0bnj48cpIyEqjNJvYCqtX2S3Bkg8/getFile?file_id=${fileId}`
    );
    const data = await response.json();
    if (data.ok) {
      const filePath = data.result.file_path;
      return `https://api.telegram.org/file/bot7838539243:AAHaTHA0bnj48cpIyEqjNJvYCqtX2S3Bkg8/${filePath}`;
    }
    return "";
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {products?.map((item) => (
        <div
          key={item._id}
          className="w-full max-w-sm bg-white border  border-gray-200 rounded-lg shadow "
        >
          <div className="flex junitify-center flex-col items-center">
            <img
              className="p-8 rounded-t-lg h-[200px] "
              src={item.img}
              alt={item.title}
            />
          </div>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                {item.title}
              </h5>
            </a>
            <div className="flex items-center justify-between mt-2.5 mb-5">
              <span className="text-3xl font-bold text-gray-900 ">
                ${item.price}
              </span>
              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
