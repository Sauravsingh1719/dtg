import { z } from "zod";

// Define schema for all input fields with updated validation
export const formSchema = z.object({
  firstName: z.string().min(3, { message: "First name must be at least 3 characters." }).min(1, { message: "First name is required." }),
  lastName: z.string().min(3, { message: "Last name must be at least 3 characters." }).min(1, { message: "Last name is required." }),
  workMail: z.string().email({ message: "Invalid email format." }).min(1, { message: "Work email is required." }),
  phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/, { message: "Phone number must include the country code." }).min(1, { message: "Phone number is required." }),
  companyName: z.string().min(3, { message: "Company name must be at least 3 characters." }).min(1, { message: "Company name is required." }),
  jobTitle: z.string().min(3, { message: "Job title must be at least 3 characters." }).min(1, { message: "Job title is required." }),
  industry: z.string().min(3, { message: "Industry must be at least 3 characters." }).min(1, { message: "Industry is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  howDidYouHear: z.string().optional(),
  message: z.string().optional(),
});
