const validate=(schema)=> async(req,res,next)=>{
    try {
        const pareBody = await schema.parseAsync(req.body);
        req.body=pareBody;
        next();
    } catch (err) {
        const status=422;
        const message="Fill the Input properly"
        const extraDetails=err.errors[0].message;

        const error ={
            status,
            message,
            extraDetails
        }
        console.log(error);
        next(error);
        
    }
}

module.exports = validate;