import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DeleteConfirmation from './DeleteConfirmation'

interface CardProps {
    event: IEvent
    hasOrderLink?: boolean
    hidePrice: boolean
}

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {

    const { sessionClaims } = auth();
    // userId from Clerk
    const userId = sessionClaims?.userId as string;

    const isEventHost = userId === event.organizer._id.toString();

    return (
        <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[450px] hover:scale-105'>
            <Link href={`/events/${event._id}`} style={{ backgroundImage: `url(${event.imageUrl})` }} className='flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500' />

            {/* Event Creator - Allow Update */}
            {isEventHost && !hidePrice && (
                <>
                    <div className='absolute right-3 top-2 rounded-xl bg-white p-3 shadow-sm transition-all hover:opacity-90'>
                        <Link href={`/events/${event._id}/update`}>
                            <Image
                                src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNldHRpbmdzLTIiPjxwYXRoIGQ9Ik0yMCA3aC05Ii8+PHBhdGggZD0iTTE0IDE3SDUiLz48Y2lyY2xlIGN4PSIxNyIgY3k9IjE3IiByPSIzIi8+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjMiLz48L3N2Zz4='
                                alt='edit'
                                width={20}
                                height={20}
                            />
                        </Link>
                    </div>

                    <div className='absolute right-3 bottom-5 rounded-xl px-4 pt-1.5 transition-all hover:bg-rose-400 bg-rose-200'>
                        <DeleteConfirmation eventId={event._id} eventTitle={event.title}/>
                    </div>
                </>
            )}

            {/* Event Preview Card */}
            <div className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4'>
                {!hidePrice && (
                    <div className='flex gap-2'>
                        <span className='p-semibold-14 rounded-full bg-green-100 px-4 py-1.5 text-green-60'>
                            {event.isFree ? 'FREE' : `$ ${event.price}`}
                        </span>

                        <p className='p-semibold-14 w-min rounded-full gradient-button px-4 py-1.5 text-white opacity-80 group-hover:opacity-100 transition line-clamp-1'>
                            {event.category.name}
                        </p>
                    </div>
                )}

                <p className='p-medium-16 text-grey-500'>
                    {formatDateTime(event.startDateTime).dateTime}
                </p>

                <Link href={`/events/${event._id}`}>
                    <p className='p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black'>
                        {event.title}
                    </p>
                </Link>

                <div className='flex-between w-full'>
                    <p className='p-medium-14 md:p-medium-16 text-grey-600'>
                        {event.organizer.firstName} | {event.organizer.lastName}
                    </p>

                    {hasOrderLink && (
                        <Link href={`/orders?eventId=${event._id}`} className='flex gap-2'>
                            <p className='absolute right-20 bottom-5 gradient-button text-white px-2 rounded-full py-1 opacity-80 group-hover:opacity-100 transition'>
                                Order Details
                            </p>
                        </Link>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Card