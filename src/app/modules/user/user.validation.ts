import { z } from "zod";
const createUserValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),

});


export const userValidation = {
    createUserValidationSchema
}