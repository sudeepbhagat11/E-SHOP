import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps';
import { Form, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import { savePaymentMethod } from '../slices/cartSlice';
const PaymentScreen = () => {

    const [paymentMethod, setPaymentMehod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;


    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping');

        }

    },[shippingAddress, navigate])

    const submitHandler = () => {
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeOrder');
    }


  return (
    <FormContainer>
        
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label>Payment Method</Form.Label>
                <Col>
                <Form.Check
                    type='radio'
                    id='PayPal'
                    className='my-2'
                    label='PayPal or Credit Card'
                    value={paymentMethod}
                    checked
                    onChange={(e) => setPaymentMehod(e.target.value)}
                >
                </Form.Check>
                </Col>
            </Form.Group>

            <Button variant='primary' type='submit'>Continue</Button>
        </Form>

    </FormContainer>
  )
}

export default PaymentScreen