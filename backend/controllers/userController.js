import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// jwt webtoken is used to authemticate the user.
// It stores the user cookie(all the data of users logged in) jwt as http-only cookie.
// Other way to do so is to store the cookie in client local storage 
// i.e session but doing so is not secure

// jwt has 3 parts i.e header, payload and signature
// payload consists of the rights given to user and
//  signature determines whether everything is allowed or not




// @desc    Auth users and get token
//  @route GET/users/login
//  @access Public

const authUser = asyncHandler (async(req,res) => {
    // res.send("Login");
    
    const { email,password } = req.body;

    

    const user = await User.findOne({email:email});

    if(user && (await user.matchPassword(password))){
        
        generateToken(res, user._id);
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            // password : user.password,
            isAdmin : user.isAdmin,


        })
    }

    else{
        res.status(401);
        throw new Error('Invalid Email or Password');
    }

}); 

// @desc   register user
//  @route POST/api/users
//  @access Public

const registerUser = asyncHandler (async(req,res) => {
    const {name,email,password, isAdmin} = req.body;

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error("User already exists");
    }
    
    //  if the user doesnot exists we create a new user, set its cookie to login
    //  and add it into the database

    const user = await User.create({
        name,
        email,
        password,
        isAdmin: false,
    })

    if(user){

        // Here creating the cookie before sending the res
        generateToken(res,user._id);
        
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email : user.email,
            isAdmin:user.isAdmin
        })
    }
    else{
        res.status(400);
        throw new Error("Wrong user credentials");

    }
}) 

// @desc   Logout user / clear cookie
//  @route POST/api/users/logout
//  @access Private

const logoutUser = asyncHandler (async(req,res) => {
    res.cookie('jwt','', {
        httpOnly:true,
        expires : new Date(0),
    });
    res.send("Logged out successfully");
})

// @desc   GET user profile
//  @route GET/api/users/profile
//  @access Private

const getUserProfile = asyncHandler (async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email : user.email,
            isAdmin : user.isAdmin,
        })
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
})

const updateUser = asyncHandler (async(req,res) => {
    res.send("update users");
})


// @desc   Get users 
//  @route GET/api/users
//  @access Private/Admin

const getUser = asyncHandler (async(req,res) => {
    res.send("get users");
})

// @desc   Get users  by id
//  @route GET/api/users/:id
//  @access Private/Admin

const getUserById = asyncHandler (async(req,res) => {
    res.send("get users by id");
})

// @desc   delete users 
//  @route DELETE/api/users/:id
//  @access Private/Admin

const deleteUser = asyncHandler (async(req,res) => {
    res.send("delete users");
})

// @desc   Update users 
//  @route PUT/api/users/:id
//  @access Private/Admin

const updateUserProfile = asyncHandler (async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){ // checked because password is hashed. So making sure that it changes 
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
})

export { authUser , registerUser,getUserProfile, logoutUser, getUser, updateUserProfile, getUserById,deleteUser,updateUser};






