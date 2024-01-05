import React, { useState, useEffect } from "react";
import "./style.css";
import Preloader from "./components/Preloader/Preloader";
import Navbar from "./components/Navbar/Navbar";
import Allproducts from "./components/Products/Allproducts";
import { Routes, Route } from "react-router-dom";
import Checkout from "./components/Checking/Checkout";
import Info from './components/Checking/Info'
import Shipping from './components/Checking/Shipping'
import Payment from './components/Checking/Payment'
import Productlarge from "./components/Products/Productlarge";
import Productdata from "./components/Products/productdata.json";
import Carousel from "./components/Carousel/Carousel";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function App() {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [search, setsearch] = useState("");
  const [categoryvalue, setcategoryvalue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // const [Productdata, setProductsData] = useState('')

  // const storeData = async () => {
  //   try {
  //     const response = await axios.get('https://fakestoreapi.com/products')
  //     setProductsData(response.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  console.log("App.js line no 36 ye wala data ", Productdata)

  // useEffect(() => {
  //   storeData()
  // }, []);



  function handleemailchange(event) {
    setemail(event.target.value);
  }

  function handlenumberchange(event) {
    setnumber(event.target.value);
  }

  function handlesetsearch(event) {
    navigate('/shop');
    setsearch(event.target.value);
  }

  function handlesetcategoryvalue(event) {
    navigate('/shop');
    setcategoryvalue(event.target.innerHTML);
  }

  function handleclearfilter() {
    updatefiltereddata(Productdata);
  }

  const [filtereddata, updatefiltereddata] = useState(Productdata);
  useEffect(() => {
    const NewData = Productdata.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
    updatefiltereddata(NewData);
  }, [Productdata, search]);



  useEffect(() => {

    if (categoryvalue !== "") {
      const filteredByCategory = Productdata.filter(product => product.category === categoryvalue);
      updatefiltereddata(filteredByCategory);
    } else {
      // If the categoryvalue is empty, reset the filtered data to the original Productdata
      updatefiltereddata(Productdata);
    }
  }, [categoryvalue]);
  // useEffect(() => {
  //   const fetchDataByCategory = async () => {
  //     try {
  //       if (categoryvalue !== "") {
  //         const response = await axios.get(`https://fakestoreapi.com/products/category/${categoryvalue}`);
  //         updatefiltereddata(response.data);
  //       } else {
  //         // If the categoryvalue is empty, reset the filtered data to the original Productdata
  //         updatefiltereddata(Productdata);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching category data:', error);
  //     }
  //   };

  //   fetchDataByCategory(); // Call the function that fetches data based on category

  // }, [categoryvalue, Productdata]);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div className="bg">
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <Navbar handlesetsearch={handlesetsearch} handlesetcategoryvalue={handlesetcategoryvalue} handleclearfilter={handleclearfilter} />
            <Routes>
              <Route path="/" element={<Carousel />} />
              <Route path="/shop" element={<Allproducts data={filtereddata} />} />
              <Route path="/productlarge" element={<Productlarge />} />
              <Route path="/checkout" element={<Checkout />} >
                <Route index path="info" element={<Info emailchange={handleemailchange} numberchange={handlenumberchange} />} />
                <Route path="shipping" element={<Shipping email={email} number={number} />} />
                <Route path="payment" element={<Payment email={email} number={number} />} />
              </Route>
            </Routes>
          </>
        )}
      </div>
    </>
  );
}