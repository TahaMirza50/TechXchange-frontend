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
    const getAdvertsbySearch = async () => {
      try {
        await apiPrivate.get('/advert', { params: {title: state.searchValue}}).then((res) => {
          if (res.status === 200) {
            setAdverts(res.data);
          }
        });
      } catch (error) {
        console.log(error);
        setAdverts([]);
      }
    };
    

    getAdvertsbySearch();

  }, [state.searchValue]);

  return (
    <div>
      <HomePageNavbar/>
      <h1 className="font-bold text-3xl mb-4 ml-20 mt-10">{state.searchValue}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ml-20 mb-10">
        {adverts.length === 0 
        ? (
        <p>No Adverts Found</p>
        ) 
        : (
          adverts.map((advert, index) => (
          <AdvertCard key={index} advert={advert}/>
          ))
          )}
      </div>
    </div>
  )
}

export default SearchResultsPage