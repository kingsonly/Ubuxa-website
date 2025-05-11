import { z } from "zod"

export const requestDemoSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters long"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    companyName: z.string().min(2, "Company name must be at least 2 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 characters long"),
    interest: z.string().min(2, "Please select an option"),
    moreInfo: z.string().min(10, "Message must be at least 10 characters long"),
})

export type RequestDemoFormInput = z.infer<typeof requestDemoSchema>
