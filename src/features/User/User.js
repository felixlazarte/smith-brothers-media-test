import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getUserState, validateEmail } from './userSlice';

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, isLoading, result } = useSelector(getUserState);

  const { register, formState: { errors }, handleSubmit } = useForm({ defaultValues: form });

  const IS_INVALID_EMAIL = result && !result.is_valid_format.value;

  const onSubmit = (data) => {
    dispatch(validateEmail({ email: data.email }));
  };

  useEffect(() => {
    if (result && result.is_valid_format.value) {
      navigate("/dog");
    }
  }, [result, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <input type='text' placeholder='First name' {...register("name", { required: true })} />
        { errors.name?.type && <h6>First name is required</h6> }
        <input type='text' placeholder='Email Address' {...register("email", { required: true })} />
        { errors.email?.type && <h6>Email is required</h6> }
        { IS_INVALID_EMAIL && <h6>Invalid Email</h6> }

        <button type='submit' disabled={isLoading}>
          Submit
        </button>
      </div>

      {
        isLoading && <div className="loader"></div>
      }
    </form>
  );
}

export default User;
