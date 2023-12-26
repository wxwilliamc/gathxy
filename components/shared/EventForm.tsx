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
import FileUploader from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { useUploadThing } from '@/lib/uploadthing'
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"
import { RouteMatcher } from "next/dist/server/future/route-matchers/route-matcher"
import Link from "next/link"

interface EventFormProps {
    userId: string
    type: 'Create' | 'Update'
    eventId?: string
    eventData?: IEvent
}

const EventForm = ({ userId, type, eventId, eventData }: EventFormProps) => {

    // Store Uploaded Image
    const [files, setFiles] = useState<File[]>([]);
    const { startUpload } = useUploadThing('imageUploader');
    const router = useRouter();

    // Event Form Default Values
    const initialEventFormValue = eventData && type === 'Update' ? {
        ...eventData,
        startDateTime: new Date(eventData.startDateTime),
        endDateTime: new Date(eventData.endDateTime),
    } : eventDefaultValues;

    const form = useForm<EventFormSchemaType>({
        resolver: zodResolver(EventFormSchema),
        defaultValues: initialEventFormValue,
    })

    const onSubmit = async (values: EventFormSchemaType) => {

        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files)

            if (!uploadedImages) return;

            uploadedImageUrl = uploadedImages[0].url
        }

        if (type === 'Create') {
            try {
                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadedImageUrl },
                    userId,
                    path: '/profile'
                });

                if (newEvent) {
                    form.reset();
                    router.push(`/events/${newEvent._id}`)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (type === 'Update') {
            try {
                if (!eventId) {
                    router.back();
                    return;
                }

                const updateExistingEvent = await updateEvent({
                    userId,
                    event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
                    path: `/event/${eventId}`,
                })

                if (updateExistingEvent) {
                    form.reset();
                    router.push(`/events/${updateExistingEvent._id}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <Button className="gradient-button hover:scale-105 transition hover:shadow-md opacity-80 hover:opacity-100 rounded-xl -mt-20 mb-8" asChild>
                <Link href='/'>
                    Go Back
                </Link>
            </Button>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

                    {/* Title / Category */}
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

                    {/* Location */}
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="w-full">

                                    <FormControl>
                                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                            <Image
                                                src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1hcC1waW5uZWQiPjxwYXRoIGQ9Ik0xOCA4YzAgNC41LTYgOS02IDlzLTYtNC41LTYtOWE2IDYgMCAwIDEgMTIgMCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iOCIgcj0iMiIvPjxwYXRoIGQ9Ik04LjgzNSAxNEg1YTEgMSAwIDAgMC0uOS43bC0yIDZjLS4xLjEtLjEuMi0uMS4zIDAgLjYuNCAxIDEgMWgxOGMuNiAwIDEtLjQgMS0xIDAtLjEgMC0uMi0uMS0uM2wtMi02YTEgMSAwIDAgMC0uOS0uN2gtMy44MzUiLz48L3N2Zz4='
                                                alt="calendar"
                                                width={24}
                                                height={24}
                                            />
                                            <Input placeholder="Event location or Online" {...field} className="input-field" />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Date */}
                    <div className="flex flex-col gap-5 md:flex-row">

                        <FormField
                            control={form.control}
                            name="startDateTime"
                            render={({ field }) => (
                                <FormItem className="w-full">

                                    <FormControl>
                                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                            <Image
                                                src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWRheXMiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iNCIgcng9IjIiIHJ5PSIyIi8+PGxpbmUgeDE9IjE2IiB4Mj0iMTYiIHkxPSIyIiB5Mj0iNiIvPjxsaW5lIHgxPSI4IiB4Mj0iOCIgeTE9IjIiIHkyPSI2Ii8+PGxpbmUgeDE9IjMiIHgyPSIyMSIgeTE9IjEwIiB5Mj0iMTAiLz48cGF0aCBkPSJNOCAxNGguMDEiLz48cGF0aCBkPSJNMTIgMTRoLjAxIi8+PHBhdGggZD0iTTE2IDE0aC4wMSIvPjxwYXRoIGQ9Ik04IDE4aC4wMSIvPjxwYXRoIGQ9Ik0xMiAxOGguMDEiLz48cGF0aCBkPSJNMTYgMThoLjAxIi8+PC9zdmc+'
                                                alt="calendar"
                                                width={24}
                                                height={24}
                                                className="filter-grey-500"
                                            />

                                            <p className="ml-3 whitespace-nowrap text-grey-600">
                                                Start Date:
                                            </p>

                                            <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} showTimeSelect timeInputLabel="Time:" dateFormat='MM/dd/yyyy h:mm aa' wrapperClassName="datePicker" />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="endDateTime"
                            render={({ field }) => (
                                <FormItem className="w-full">

                                    <FormControl>
                                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                            <Image
                                                src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWRheXMiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iNCIgcng9IjIiIHJ5PSIyIi8+PGxpbmUgeDE9IjE2IiB4Mj0iMTYiIHkxPSIyIiB5Mj0iNiIvPjxsaW5lIHgxPSI4IiB4Mj0iOCIgeTE9IjIiIHkyPSI2Ii8+PGxpbmUgeDE9IjMiIHgyPSIyMSIgeTE9IjEwIiB5Mj0iMTAiLz48cGF0aCBkPSJNOCAxNGguMDEiLz48cGF0aCBkPSJNMTIgMTRoLjAxIi8+PHBhdGggZD0iTTE2IDE0aC4wMSIvPjxwYXRoIGQ9Ik04IDE4aC4wMSIvPjxwYXRoIGQ9Ik0xMiAxOGguMDEiLz48cGF0aCBkPSJNMTYgMThoLjAxIi8+PC9zdmc+'
                                                alt="calendar"
                                                width={24}
                                                height={24}
                                                className="filter-grey-500"
                                            />

                                            <p className="ml-3 whitespace-nowrap text-grey-600">
                                                End Date:
                                            </p>

                                            <DatePicker selected={field.value} onChange={(date: Date) => field.onChange(date)} showTimeSelect timeInputLabel="Time:" dateFormat='MM/dd/yyyy h:mm aa' wrapperClassName="datePicker" />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Description / Image Uploader */}
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
                                        <FileUploader
                                            imageUrl={field.value}
                                            onFieldChange={field.onChange}
                                            setFiles={setFiles}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Price / Free Ticket */}
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="w-full">

                                    <FormControl>
                                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                            <Image
                                                src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWJhbmtub3RlIj48cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMTIiIHg9IjIiIHk9IjYiIHJ4PSIyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMiIvPjxwYXRoIGQ9Ik02IDEyaC4wMU0xOCAxMmguMDEiLz48L3N2Zz4='
                                                alt="cash note"
                                                width={24}
                                                height={24}
                                                className="filter-grey-500"
                                            />

                                            <Input
                                                type="number"
                                                placeholder="Price"
                                                {...field}
                                                className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            />

                                            <FormField
                                                control={form.control}
                                                name="isFree"
                                                render={({ field }) => (
                                                    <FormItem>

                                                        <FormControl>
                                                            <div className="flex items-center">

                                                                <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                                    Free Ticket
                                                                </label>

                                                                <Checkbox id="isFree" checked={field.value} onCheckedChange={field.onChange} className="mr-2 h-5 w-5 border-2 border-primary-500" />

                                                            </div>
                                                        </FormControl>

                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>

                    {/* Event Url */}
                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem className="w-full">

                                    <FormControl>
                                        <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                            <Image
                                                src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxpbmsiPjxwYXRoIGQ9Ik0xMCAxM2E1IDUgMCAwIDAgNy41NC41NGwzLTNhNSA1IDAgMCAwLTcuMDctNy4wN2wtMS43MiAxLjcxIi8+PHBhdGggZD0iTTE0IDExYTUgNSAwIDAgMC03LjU0LS41NGwtMyAzYTUgNSAwIDAgMCA3LjA3IDcuMDdsMS43MS0xLjcxIi8+PC9zdmc+'
                                                alt="url"
                                                width={24}
                                                height={24}
                                            />
                                            <Input placeholder="Event Url" {...field} className="input-field" />
                                        </div>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" disabled={form.formState.isSubmitting} className="gradient-button button col-span-2 w-full hover:animate-pulse">
                        {form.formState.isSubmitting ? "Loading..." : `${type} Event`}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default EventForm