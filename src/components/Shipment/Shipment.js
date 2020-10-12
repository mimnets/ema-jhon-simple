import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../../App';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (

    <div className="row">
      <div className="col-md-6">
        <form class="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input name="name" defaultValue={loggedInUser.displayName} ref={register({ required: true })} placeholder="Your name" />
          {errors.name && <span className="error">Name is required</span>}
          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email" />
          {errors.email && <span className="error">Email is required</span>}
          <input name="address" ref={register({ required: true })} placeholder="Your mobile" />
          {errors.address && <span className="error">Mobile is required</span>}
          <input name="name" ref={register({ required: true })} placeholder="Your address" />
          {errors.exampleRequired && <span className="error">Address is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div className="col-md-6">
        <h2>Please pay for me</h2>
        <ProcessPayment></ProcessPayment>
      </div>
    </div>

  );
};

export default Shipment;