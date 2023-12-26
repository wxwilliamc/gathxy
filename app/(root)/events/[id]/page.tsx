import CheckoutButton from '@/components/shared/CheckoutButton'
import Collection from '@/components/shared/Collection'
import DeleteConfirmation from '@/components/shared/DeleteConfirmation'
import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils'
import { SearchParamProps } from '@/types'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EventDetailsPage = async ({ params: { id }, searchParams }: SearchParamProps) => {

  const event = await getEventById(id)
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const organizer = userId === event.organizer._id;

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  })

  return (
    <>

      <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
        <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl py-8'>
          <Image
            src={event.imageUrl}
            alt={event.title}
            width={450}
            height={450}
            className='h-full min-h-[200px] object-cover object-center rounded-xl shadow-md'
          />

          {/* Event Details */}
          <div className='flex w-full flex-col gap-8 py-12 md:pl-8 md:py-24'>
            <div className='flex flex-col gap-6'>
              <div className='flex gap-2 items-center'>
                <h2 className='h2-bold'>
                  {event.title}
                </h2>

                <p className='p-medium-18 mt-2 ml-2 sm:mt-0'>
                  host by {' '} <span className='text-blue-500'>{event.organizer.firstName} | {event.organizer.lastName}</span>
                </p>
              </div>

              <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                <div className='flex gap-3'>
                  <p className='p-bold-16 rounded-full bg-green-500/20 px-4 py-2.5 text-green-700'>
                    {event.isFree ? 'FREE' : `$ ${event.price}`}
                  </p>

                  <p className='p-medium-16 rounded-full px-4 py-2.5 gradient-button text-white opacity-80'>
                    {event.category.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <CheckoutButton 
              event={event}
            />


            <div className='flex flex-col gap-5'>

              {/* Date */}
              <div className='flex gap-2 md:gap-3 items-center'>
                <Image
                  src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWNoZWNrIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjQiIHJ4PSIyIiByeT0iMiIvPjxsaW5lIHgxPSIxNiIgeDI9IjE2IiB5MT0iMiIgeTI9IjYiLz48bGluZSB4MT0iOCIgeDI9IjgiIHkxPSIyIiB5Mj0iNiIvPjxsaW5lIHgxPSIzIiB4Mj0iMjEiIHkxPSIxMCIgeTI9IjEwIi8+PHBhdGggZD0ibTkgMTYgMiAyIDQtNCIvPjwvc3ZnPg=='
                  alt='date'
                  width={24}
                  height={24}
                />

                <div className='flex flex-wrap gap-2 text-slate-600'>
                  <p>{formatDateTime(event.startDateTime).dateOnly} - {' '}</p>
                  <p>{formatDateTime(event.endDateTime).dateOnly}</p>
                </div>
              </div>

              {/* Time */}
              <div className='flex gap-2 md:gap-3 items-center'>
                <Image
                  src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNsb2NrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwb2x5bGluZSBwb2ludHM9IjEyIDYgMTIgMTIgMTYgMTQiLz48L3N2Zz4='
                  alt='time'
                  width={24}
                  height={24}
                />

                <div className='flex flex-wrap gap-2 text-slate-600'>
                  <p>{formatDateTime(event.startDateTime).timeOnly} - {' '}</p>
                  <p>{formatDateTime(event.endDateTime).timeOnly}</p>
                </div>
              </div>

              {/* Location */}
              <div className='flex items-center gap-2 md:gap-3'>
                <Image
                  src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1hcC1waW4iPjxwYXRoIGQ9Ik0yMCAxMGMwIDYtOCAxMi04IDEycy04LTYtOC0xMmE4IDggMCAwIDEgMTYgMFoiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PC9zdmc+'
                  alt='location'
                  width={24}
                  height={24}
                />

                <p className='text-slate-600'>
                  {event.location}
                </p>
              </div>

              {/* Event Description */}
              <div className='flex-col gap-3'>
                <p className='p-bold-20 opacity-70'>
                  What You'll Experience:
                </p>

                <p className='p-medium-16 lg:p-regular-18 truncate'>
                  {event.description}
                </p>

                <div className='flex-col gap-2 pt-4'>
                  <span className='p-bold-20 opacity-70'>
                    For more details:
                  </span>

                  <p className='text-blue-400 underline underline-offset-1 p-medium-16'>
                    {event.url}
                  </p>
                </div>
              </div>

              {/* Event Organizer */}
              {organizer ? (
                <div className='flex gap-2'>
                  <div className='rounded-xl bg-slate-300 p-3 shadow-sm transition-all hover:bg-slate-800 hover:text-white hover:scale-105'>
                    <Link href={`/events/${event._id}/update`}>
                      <p>
                        Update
                      </p>
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Events from the same category */}
      <section className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
        <h2 className='h2-bold'>
          Related Events
        </h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptySubTitle="Come back later"
          collectionType="All_Events"
          limit={3}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  )
}

export default EventDetailsPage