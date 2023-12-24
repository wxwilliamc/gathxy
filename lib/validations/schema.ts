"use client"
 
import * as z from "zod"
 
export const EventFormSchema = z.object({
  title: z.string().min(3, 'Please provide a title for the event.'),
  description: z.string().min(3, 'Please provide the event descriptions.').max(400, 'Your description was way too long...'),
  location: z.string().min(3, 'Invalid Location. Eg. California').max(400, 'Invalid Location. Eg. California'),
  imageUrl: z.string(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url({
    message: 'Invalid Url. Eg. https://eventurl.com'
  }),
})

export type EventFormSchemaType = z.infer<typeof EventFormSchema>