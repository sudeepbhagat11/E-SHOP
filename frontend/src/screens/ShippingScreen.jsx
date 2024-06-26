import React from 'react';
import FormContainer from '../components/FormContainer';
import { Form,Button } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress ] = useState( shippingAddress?.address || '');
    const [city, setCity ] = useState(shippingAddress?.city || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');
    const [postalCode, setPostalCode ] = useState(shippingAddress?.postalCode || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = () => {
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        navigate('/payment');
    }
  return (
    <div>
        <FormContainer>

            <h1>Shipping</h1>
            <CheckoutSteps step1 step2/>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='my-2'>
                    <Form.Label> Address</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder='Enter Address' 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city' className='my-2'>
                    <Form.Label> City</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder='Enter City' 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className='my-2'>
                    <Form.Label> Postal Code</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder='Enter Postal Code' 
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='country' className='my-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control 
                    type="text"
                    placeholder='Enter Country' 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-2'>Continue</Button>
            </Form>
        </FormContainer>

    </div>
  )
}

export default ShippingScreen