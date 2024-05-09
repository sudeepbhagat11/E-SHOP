import React from "react";
import  {useEffect , useState} from 'react';

import {  useNavigate,useParams } from "react-router-dom";
// import products from '../products';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import Rating from '../components/Rating';

import axios from 'axios';
// import { useGetProductDetailsQuery } from "../slices/ProductApiSlice";



const ProductScreen = () => {
    
    
    
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const [product, setProduct] = useState([]);

    

    const [qty , setQty ] = useState(1);

    useEffect(() => {
        const fetchProduct = async() => {
            const { data } = await axios.get(`/api/products/${productId}`);
            setProduct(data);
        }
        fetchProduct();
    }, [productId]);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product,qty }));
       
        navigate('/cart');
    }

    

    // const { data : product , isLoading, error } = useGetProductDetailsQuery(productId);
    
  return (
    <>
    
        <Link className = "btn btn light my-3" to ="/" >Go Back</Link>

    {/* {isLoading ? (<h1>isLoading ...</h1>) : error ? (<div>{ error?.data?.message || error.error} </div>) : ( */}
        
        <Row>
            <Col md = {4}>
            <Image src = {product.image} alt = {product.name} fluid />
            </Col>

            <Col md = {4}>
            <ListGroup variant = "flush">
                <ListGroup.Item>
                    <h3> {product.name}</h3>

                </ListGroup.Item>

                <ListGroup.Item>
                    <Rating value = {product.rating} text = {`${product.numReviews} reviews`} />
                    
                </ListGroup.Item>

               

                <ListGroup.Item> Price : ${product.price}</ListGroup.Item>
            </ListGroup>
            </Col>

            <Col md = {4}>
            <Card>
            <ListGroup>
            <ListGroup.Item>
            <Row><Col>Price :</Col> <Col><strong>${product.price}</strong></Col></Row>
            </ListGroup.Item>

            <ListGroup.Item>
            <Row><Col>Status :</Col> <Col><strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong></Col></Row>
            </ListGroup.Item>
            {product.countInStock > 0 && (
                <ListGroup.Item>
                <Row>
                    <Col>
                        Qty :
                    </Col>
                    <Col>
                  
                    <Form.Control as = 'select'
                    value = {qty}
                    onChange={(e) => setQty(Number(e.target.value))}>
                    {Array.from({ length: product.countInStock }, (_, x)=> (
                        <option key = {x + 1} value = { x +1 }>
                        {x + 1}

                        </option>
                    ))}

                    </Form.Control>
                        
                    </Col>
                </Row>
            </ListGroup.Item>

            )}
            

            <ListGroup.Item>
                <Button className = "btn btn-block" type = "button" 
                onClick={addToCartHandler}
                disabled = {product.countInStock === 0}>Add To Cart</Button>
            </ListGroup.Item>
            </ListGroup>

            </Card>
           
            
            </Col>
        </Row>
      

        
    {/* )} */}
        
    </>
  )
}

export default ProductScreen;