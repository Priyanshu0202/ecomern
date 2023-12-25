import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductPreview from "../components/ProductPreview";
import "./CategoryPage.css";
import Pagination from "../components/Pagination";
import PriceFilter from "../components/PriceFilter";
const CategoryPage = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);

  const [filter, setFilter] = useState({
    price: {
      min: 5000,
      max: 200000,
    },
    keyword: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/category/${category}`)
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
        setData(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  }, [category]);

  if (loading) {
    <Loading />;
  }
  useEffect(() => {
    const productsSearch = products.filter(
      (product) =>
        product.name.toLowerCase().includes(filter.keyword.toLowerCase()) &&
        parseInt(product.price, 10) >= filter.price.min &&
        parseInt(product.price, 10) <= filter.price.max
    );
    setData(productsSearch);
  }, [filter]);

  function ProductSearch({ _id, category, name, pictures, price }) {
    return (
      <ProductPreview
        _id={_id}
        category={category}
        name={name}
        pictures={pictures}
        price={price}
      />
    );
  }
  return (
    <div className="category-page-container">
      <div
        className={`pt-3 ${category}-banner-container category-banner-container`}
      >
        <h1 className="text-center">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>

      <div className="mb-5 lg:flex">
        <div className=" d-flex-col  pt-4 pb-4 lg:w-[30%] pl-5">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                keyword: e.target.value.trim(),
              }))
            }
            className="bg-gray-200 rounded-md h-10 px-10 w-full mb-10 border border-gray-300"
          />
          <PriceFilter
            price={filter}
            setPrice={setFilter}
            max={200000}
            min={5000}
            step={500}
            type="max"
          />
          <PriceFilter
            price={filter}
            setPrice={setFilter}
            max={200000}
            min={5000}
            step={500}
            type="min"
          />
        </div>
        {data.length > 0 ? (
          <div className="w-full">
            <Pagination
              data={data}
              RenderComponent={ProductSearch}
              pageLimit={1}
              dataLimit={10}
              tablePagination={false}
            />
          </div>
        ) : (
          <h1 className="text-center w-full mt-10">No Products to Show</h1>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
