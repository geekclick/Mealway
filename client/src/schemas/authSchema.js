import { z } from "zod";

export const loginSchema = z.object({
    email: z.string()
        .email({ message: "Invalid email address" })
        .min(6, { message: "Email must be at least 6 characters long" })
        .max(255, { message: "Email must not exceed 255 characters" })
        .refine((value) => value.trim() === value, {
            message: "Email must not contain leading or trailing spaces",
        }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(50, { message: "Password must not exceed 50 characters" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            {
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            }
        ),
});

export const signupSchema = z.object({
    fullName: z
        .string()
        .min(4, { message: "Enter a valid name" })
        .max(100, { message: "Name is too long" }),
    phoneNumber: z
        .string()
        .refine((value) => value.length === 10, {
            message: "Phone number must be 10 digits",
        }),
    email: z.string()
        .email({ message: "Invalid email address" })
        .min(6, { message: "Email must be at least 6 characters long" })
        .max(255, { message: "Email must not exceed 255 characters" })
        .refine((value) => value.trim() === value, {
            message: "Email must not contain leading or trailing spaces",
        }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(50, { message: "Password must not exceed 50 characters" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            {
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            }
        ),
    confirmPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(50, { message: "Password must not exceed 50 characters" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            {
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            }
        )
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
});
