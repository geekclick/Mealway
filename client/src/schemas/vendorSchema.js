import { z } from "zod";

export const vendorSchema = z.object({
    name: z.string().trim().min(1, 'Vendor name is required').max(255, 'Vendor name must be less than 256 characters'),
    shopname: z.string().trim().min(1, 'Shop name is required').max(255, 'Shop name must be less than 256 characters'),
    address: z.string().trim().min(1, 'Address is required').max(255, 'Address must be less than 256 characters'),
    contact: z.string().trim().min(10, 'Contact number must be at least 10 digits').max(10, 'Contact number contain at most 10 digits'),
    openingHour: z.string().trim().min(1, 'Opening hour is required').regex(/^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/, 'Opening hour must be in the format HH:MM (24-hour format)'),
    closingHour: z.string().trim().min(1, 'Closing hour is required').regex(/^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/, 'Closing hour must be in the format HH:MM (24-hour format)'),
});


export const menuSchema = z.object({
    name: z.string().max(255),
    description: z.string().max(500),
    category: z.string(),
    price: z.string(),
    image: z.string(),
})