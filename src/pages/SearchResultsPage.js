import React, { useState } from 'react'
import { useEffect } from 'react';
import HomePageNavbar from '../components/HomePageNavbar';
import useApiPrivate from '../hooks/useAPIPrivate';
import AdvertCard from '../components/AdvertCard';
import { useLocation } from 'react-router-dom';

function SearchResultsPage() {

  const [adverts, setAdverts] = useState([]);
  const apiPrivate = useApiPrivate();
  const { state } = useLocation();

  useEffect(() => {
    console.log(state.searchValue)

    const getAdvertsBySearch = async () => {
      try {
        await apiPrivate.get('advert/search', { params: {title: state.searchValue}}).then((res) => {
          if (res.status === 200) {
            setAdverts(res.data);
          }
        });
      } catch (error) {
        console.log(error);
        setAdverts([]);
      }
    };
    

    getAdvertsBySearch();

  }, [state.searchValue,apiPrivate]);

  return (
    <div>
      <HomePageNavbar/>
      <h1 className="mb-4 mx-28 mt-10 text-2xl font-extrabold dark:text-white">result for search query '{state.searchValue}'</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-28 mb-10">
        {adverts.length === 0 
        ? (
        <p>No Adverts Found</p>
        ) 
        : (
          adverts.map((advert, index) => (
          <AdvertCard key={index} advert={advert} onHomePage={true}/>
          ))
          )}
      </div>
    </div>
  )
}

export default SearchResultsPage