import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchDogImages, getDogState, fetchBreedList } from './dogSlice';
import { getUserState } from '../User/userSlice';

const Dog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [breed, setBreed] = useState("");

  const { form: { name }, result } = useSelector(getUserState);
  const { imageURL, isLoading, breedList, errors } = useSelector(getDogState);

  const ERROR_MESSAGE = errors?.message && errors.message;
  
  useEffect(() => {
    // Logic for selecting the most similar breed name with user input name
    if (breedList) {
      const filteredBreedList = name.toLowerCase().split('').reduce((filteredList, ch, index) => {
        // filter all breed that match the character at current index of user first name
        const newFilteredList = filteredList.filter(breed => breed.charAt(index) === ch);
        if (newFilteredList.length > 0) {
          return newFilteredList;
        } else {
          return filteredList;
        }
      }, Object.keys(breedList));

      setBreed(filteredBreedList[0]);
      dispatch(fetchDogImages({ breed: filteredBreedList[0] }));
    }
  }, [breedList]);

  useEffect(() => {
    if (!result) {
      // redirect to user page if email is not yet validated
      navigate("/");
    } else {
      // api call to fetch the list of breed
      dispatch(fetchBreedList());
    }
  }, []);

  return (
    <div className="dog-container">
      <h1 className='dog-title'>Hi {name}!</h1>
      <h3 className='dog-subtitle'>Matched Breed: {breed}</h3>
      <div className={`dog-img-container ${ERROR_MESSAGE ? 'error-message' : ''}`}>
        {
          isLoading ? <div className="loader"></div> : 
            imageURL.map((url, index) => <img key={`dog-gallery-${index}`} src={url} alt={breed} className='dog-image' />)
        }

        {
          ERROR_MESSAGE && <span>{errors.message}</span>
        }
      </div>
      <button
        type='submit'
        disabled={isLoading }
        className="dog-button"
        onClick={() => dispatch(fetchDogImages({ breed }))}
      >
        View More
      </button>
    </div>
  );
}

export default Dog;
