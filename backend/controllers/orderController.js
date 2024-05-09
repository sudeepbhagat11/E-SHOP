import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";


// @desc    Create new Order
//  @route POST/api/orders
//  @access Private

const addOrderItems = asyncHandler(async(req,res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No Order Items ');
    }
    else{
        const order = new Order({
            orderItems : Array.isArray(orderItems) ? orderItems.map((x) => ({
                ...x,
                products : x._id,
                _id:undefined
            })) : [],
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    }
})

// @desc    Get Logged in Orders
//  @route GET/api/orders/myOrders
//  @access Private

const getMyOrders = asyncHandler(async(req,res) => {
    const orders = await Order.find({user:req.user._id});
    res.status(200).json(orders);
})

// @desc    Get Logged in Orders
//  @route GET/api/orders/:id
//  @access Private

const getOrderById= asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if(order){
        res.status(200).json(order);
    }
    else{
        res.status(400);
        throw new Error('Order not found');
    }
})

// @desc    Update Order To Paid
//  @route PUT/api/orders/:id/pay
//  @access Private/Admin

const updateOrderToPaid = asyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt= Date.now();
        order.paymentResult = {
            id:req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        }

        const updateOrder = await order.save();
        res.status(200).json(updateOrder)
    }
    else{
        res.status(404);
        throw new Error('Order not found');
    }
    
})


// @desc    Update Order To Delivered
//  @route PUT/api/orders/:id/deliver
//  @access Private/Admin

const updateOrderToDelivered = asyncHandler(async(req,res) => {
    res.send('Delivered Orders');
})


// @desc    Get All Orders
//  @route GET/api/orders
//  @access Private/Admin

const getOrders = asyncHandler(async(req,res) => {
    res.send('Get all  Orders');
})

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToPaid,
    updateOrderToDelivered,
    
}

