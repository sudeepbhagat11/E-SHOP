import bcrypt from "bcryptjs";

const users = [
    {
        name : "Admin Users",
        email : "admin@gmail.com",
        password : bcrypt.hashSync('123456',10),
        isAdmin : true,
    },

    {
        name : "Sudip Bhagat",
        email : "sudip@gmail.com",
        password : bcrypt.hashSync('123456',10),
        isAdmin : false,
    },

    {
        name : "Sudeep Bhagat",
        email : "sudeep@gmail.com",
        password : bcrypt.hashSync('123456',10),
        isAdmin : false,
    }

];

export default users;