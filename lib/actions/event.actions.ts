'use server'

import { CreateEventParams, DeleteEventParams, GetAllEventsParams, UpdateEventParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Event from "../database/models/event.model"
import User from "../database/models/user.model"
import Category from "../database/models/category.model"
import { revalidatePath } from "next/cache"

// Create Event
export const createEvent = async ({ userId, event, path }: CreateEventParams) => {
    try {
        await connectToDatabase();

        const organizer = await User.findById(userId);

        if(!organizer){
            throw new Error("Organizer not found.")
        }

        const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId });
        
        if(newEvent){
            revalidatePath(path);
        }

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        handleError(error);
    }
}

const populateEvent = async (query: any) => {
    return query
        .populate({
            path: 'organizer', model: User, select: '_id firstName lastName'
        })
        .populate({
            path: 'category', model: Category, select: '_id name'
        })
}

// Get The Only Event
export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase();

        const event = await populateEvent(Event.findById(eventId));

        if(!event){
            throw new Error("Event not found")
        }

        return JSON.parse(JSON.stringify(event));
        
    } catch (error) {
        handleError(error)
    }
}

// Get Events
export const getAllEvents = async ({ query, category, limit = 6, page }: GetAllEventsParams) => {
    try {
        await connectToDatabase();

        // Search Filter (query, category)
        const conditions = {};

        // Find The Events Based On Search Filter
        const eventsQuery = Event.find(conditions).sort({ createdAt: 'desc' }).skip(0).limit(limit);
        // Include the Organizer & Category
        const events = await populateEvent(eventsQuery);
        // Count The Events Total From DB Based On Search Filter For Pagination
        const eventsCount = await Event.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        }

    } catch (error) {
        handleError(error);
    }
}

// Delete Event
export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
    try {
        await connectToDatabase();

        const eventToDelete = await Event.findByIdAndDelete(eventId);

        revalidatePath(path)
     
    } catch (error) {
        handleError(error);
    }
}

// Update Event
export const updateEvent = async ({ event, path, userId }: UpdateEventParams) => {
    try {
        await connectToDatabase();

        const eventExist = await Event.findById(event._id);

        if(!eventExist || eventExist.organizer.toHexString() !== userId){
            throw new Error("Event Not Found | Unauthorized")
        }

        const eventToUpdate = await Event.findByIdAndUpdate(
            event._id,
            { ...event, category: event.categoryId },
            { new: true },
        )

        revalidatePath(path);

        return JSON.parse(JSON.stringify(eventToUpdate));
        
    } catch (error) {
        handleError(error);
    }
}