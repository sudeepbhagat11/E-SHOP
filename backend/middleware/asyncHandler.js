const asyncHandler = fn => (req,res,next) => {
    Promise.resolve(fn(req,res,next)).catch(next);
}

export default asyncHandler;

// here we created our asyncHandler (not express default asyncHandler ) 
// and gave the resolve to do what we wanted and move to the next middleware 