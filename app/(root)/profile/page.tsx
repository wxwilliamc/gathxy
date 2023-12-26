import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventById, getEventsByUser } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const MyProfilePage = async () => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;
    const eventOrganizer = await getEventsByUser({ userId, page: 1})

    return (
        <>
            {/* My Tickets */}
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <div className='wrapper flex-center sm:justify-between'>
                    <h3 className='h3-bold text-center sm:text-left'>
                        My Tickets
                    </h3>

                    <Button className='button hidden sm:flex gradient-button opacity-100 transition hover:opacity-80 px-6' size={'sm'} asChild>
                        <Link href='/#events'>
                            Explore More Events
                        </Link>
                    </Button>
                </div>
            </section>

            {/* <section className='wrapper my-8'>
                <Collection
                    data={[]}
                    emptyTitle="No events tickets purchased yet"
                    emptySubTitle="Be patient, more events coming soon"
                    collectionType="My_Tickets"
                    limit={3}
                    page={1}
                    totalPages={2}
                    urlParamName='ordersPage'
                />
            </section> */}

            {/* Events Organized */}
            <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
                <div className='wrapper flex-center sm:justify-between'>
                    <h3 className='h3-bold text-center sm:text-left'>
                        Events Organized
                    </h3>

                    <Button className='button hidden sm:flex gradient-button opacity-100 transition hover:opacity-80 px-6' size={'sm'} asChild>
                        <Link href='/events/create'>
                            Create New Event
                        </Link>
                    </Button>
                </div>
            </section>

            <section className='wrapper my-8'>
                <Collection
                    data={eventOrganizer?.data}
                    emptyTitle="No events have been created yet"
                    emptySubTitle="Lets create some new events"
                    collectionType="Events_Organized"
                    limit={6}
                    page={1}
                    totalPages={2}
                    urlParamName='eventsPage'
                />
            </section>
        </>
    )
}

export default MyProfilePage