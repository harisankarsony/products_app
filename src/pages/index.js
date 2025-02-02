
"use client"

import { Inter } from "next/font/google";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import CONSTANTS from "./constants";
import List from "@/components/ListProducts";
import CategoryButtons from "@/components/CategoryButtons";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const productApi = 'https://dummyjson.com/products';
  const sortOptions = [CONSTANTS.SORT_OPTION_DEFAULT, CONSTANTS.SORT_OPTION_LOWTOHIGH, CONSTANTS.SORT_OPTION_HIGHTOLOW];

  //inititalizing state variables
  const [productList, setProductList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  // keeps track of the categoreis currently selected by user 
  const [selectedCategory, setSelectedCategory] = useState([CONSTANTS.CATEGORY_ALL]);
  const [selectedSortOption, setSelectedSortOption] = useState(CONSTANTS.SORT_OPTION_DEFAULT);

  // fn to get unique product categories
  function getCategories() {
    let catergories = [CONSTANTS.CATEGORY_ALL];

    productList.forEach(element => {
      if (!catergories.includes(element.category)) {
        catergories.push(element.category);
      }
    });

    return catergories;
  }

  // fn to update input and category change
  function handleOnChange(e) {
    const { name, value } = e.target;

    if (name === CONSTANTS.INPUT_SEARCH) {
      setSearchValue(value);
    }

    if (name === CONSTANTS.SELECT_CATEGORY) {
      setSelectedCategory(value);
    }

    if (name === CONSTANTS.SELECT_SORT_OPTION) {
      setSelectedSortOption(value);
    }
  }

  // fn that does all kinds of filtering
  function getFilteredProducts() {
    let finalFilteredList = [];

    finalFilteredList = productList

      // filter based on selected category
      .filter(product => {
        // if selected category contains categories other than 'all', filter those categories
        if (!(selectedCategory[0] === CONSTANTS.CATEGORY_ALL)) {
          return selectedCategory.includes(product.category)
        }
        // if selected category contains only 'all', no need to filter
        return true
      })

      // filter again based on search value
      .filter(product => product.title.toLowerCase().includes(searchValue.toLowerCase()))
      // sort filtered items
      .sort((a, b) => {
        if (selectedSortOption === CONSTANTS.SORT_OPTION_LOWTOHIGH) {
          return a.price - b.price;
        }
        if (selectedSortOption === CONSTANTS.SORT_OPTION_HIGHTOLOW) {
          return b.price - a.price;
        }
      });

    return finalFilteredList
  }

  // list used for rendering (useMemo prevents unnecessary re-renders)
  const filterList = useMemo(getFilteredProducts, [productList, selectedCategory, searchValue, selectedSortOption]);
  
  // get count of filtered products
  const filteredCount = filterList.length;

  // category list for rendering categories select
  const categoryList = getCategories();

  //fetch only once when page is loaded
  useEffect(() => {

    // fn to fetch all product details from api
    async function fetchProductList() {
      let prodcutResponse = await fetch(productApi);
      let readableProductResponse = await prodcutResponse.json();

      // set single source of truth (OG list)
      setProductList(readableProductResponse.products);
    }
    fetchProductList()

  }, []);

  //returns heading and searchbar along with the List component
  return (
    <>
      <header className="header">
        <h1>Find Product</h1>
        <div className="header-main-div">
          <input name={CONSTANTS.INPUT_SEARCH} value={searchValue} type="text" placeholder="Type the product name" onChange={handleOnChange}></input>
          <div className="sort-div">
            <label>Sort by: </label>
            <select className={CONSTANTS.SELECT_SORT_OPTION} value={selectedSortOption} name={CONSTANTS.SELECT_SORT_OPTION} onChange={handleOnChange}>
              {sortOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>
      </header>

      <div className="main-div">
        <div className="filter-div">
          <p>Filter by category: </p>
          {/* component that handles selected category list */}
          <CategoryButtons categories={categoryList} currState={selectedCategory} setState={setSelectedCategory} />
          <p className="product-count">Displaying <b style={{color: 'brown'}}>{filteredCount}</b> products</p>
        </div>
        <div className="product-list-div">
          <List list={filterList} />
        </div>
      </div>
      </>
  )
}

// TODO:
// CSS refactoring
// clear button
// product page styling

