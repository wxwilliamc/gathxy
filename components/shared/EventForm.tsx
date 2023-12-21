"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EventFormSchema, EventFormSchemaType } from "@/lib/validations/schema"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"


interface EventFormProps {
    userId: string
    type: 'Create' | 'Update'
}

const EventForm = ({ userId, type }: EventFormProps) => {

    const initialEventFormValue = eventDefaultValues;

    const form = useForm<EventFormSchemaType>({
        resolver: zodResolver(EventFormSchema),
        defaultValues: initialEventFormValue,
    })

    const onSubmit = () => {

    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">

                                    <FormControl>
                                        <Input placeholder="Event Title" {...field} className="input-field" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem className="w-full">

                                    <FormControl>
                                        <Dropdown
                                            value={field.value}
                                            onChangeHandler={field.onChange}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">

                                    <FormControl className="h-72">
                                        <Textarea placeholder="Description" {...field} className="textarea rounded-xl" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="w-full">

                                    <FormControl className="h-72">
                                        
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="gradient-button">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default EventForm