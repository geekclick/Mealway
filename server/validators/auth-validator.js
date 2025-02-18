const { z } = require('zod')

const signupSchema = z.object({

    name: z
        .string({ required_error: "name is required" })
        .trim()
        .min({ message: "Name must be at least of 2 chars" })
        .max(255, { required_error: "Name must be at most 255 characters" }),

    phone: z
        .string({ required_error: "phone number is required" })
        .trim()
        .min(10, { message: "Phone number must be at least of 10 digits" })
        .max(10, { required_error: "Phone number must be at most 10 digits" }),

    email: z
        .string({ required_error: "email is required" })
        .email({ required_error: "Email is required" })
        .trim()
        .min(2, { message: "Name must be at least of 2 chars" })
        .max(255, { required_error: "Name must be at most 255 characters" }),

    password: z
        .string({ required_error: "password is required" })
        .trim()
        .min(6, { required_error: "Paswword must be at least 6 characters" })
        .max(50, { required_error: "Paswword less than 50 char" })


});

module.exports = signupSchema;