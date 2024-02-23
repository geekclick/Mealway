const {z}=require('zod')

const signupSchema=z.object({

    fname:z
    .string({required_error:"name is required"})
    .trim()
    .min({message:"Name must be at least of 2 chars"})
    .max(255,{required_error:"Name must be at most 255 characters"}),

    lname:z
    .string({required_error:"lanme is required"})
    .trim()
    .min(2,{message:"Name must be at least of 2 chars"})
    .max(255,{required_error:"Name must be at most 255 characters"}),

    email:z
    .string({required_error:"email is required"})
    .email({required_error:"Email is required"})
    .trim()
    .min(2,{message:"Name must be at least of 2 chars"})
    .max(255,{required_error:"Name must be at most 255 characters"}),

    password:z
    .string({required_error:"password is required"})
    .trim()
    .min(6,{required_error:"Paswword must be at least 6 characters"})
    .max(50,{required_error:"Paswword less than 50 char"})


});

module.exports = signupSchema;