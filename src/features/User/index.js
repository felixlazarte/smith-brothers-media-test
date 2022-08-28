import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getUserState, validateEmail, changeValues } from './userSlice';

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, isLoading, result } = useSelector(getUserState);

  const { register, formState: { errors }, handleSubmit } = useForm({ defaultValues: form });

  const IS_INVALID_EMAIL = result && !result.is_valid_format.value;

  const onSubmit = (data) => {
    // populate user form values in store
    dispatch(changeValues(data));
    // api call to validate email address
    dispatch(validateEmail({ email: data.email }));
  };

  useEffect(() => {
    // redirect to dog page if email is valid
    if (result && result.is_valid_format.value) {
      navigate("/dog");
    }
  }, [result, navigate]);

  return (
    <div className="user-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className='dog-title'>Dog Matching</h1>

        <div className="user-form-container">
          <input
            type='text'
            placeholder='First name'
            {...register("name", { required: true })}
          />
          {errors.name?.type && <span className='error-label'>First name is required</span>}

          <input
            type='text'
            placeholder='Email Address'
            {...register("email", { required: true })}
          />
          {errors.email?.type && <span className='error-label'>Email is required</span>}
          {IS_INVALID_EMAIL && <span className='error-label'>Invalid Email</span>}

          <button type='submit' disabled={isLoading}>
            Submit
          </button>
        </div>

        {
          isLoading && <div className="loader"></div>
        }
      </form>
    </div>
  );
}

export default User;
