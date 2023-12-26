import EventForm from '@/components/shared/EventForm'
import { getEventById, updateEvent } from '@/lib/actions/event.actions'
import Event from '@/lib/database/models/event.model'
import { auth } from '@clerk/nextjs'

interface props {
  params: {
    id: string
  }
}

const UpdateEventPage = async ({ params: { id } }: props) => {

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const eventToUpdate = await getEventById(id);

  return (
    <>
        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
            <h3 className='h3-bold wrapper text-center sm:text-left'>
                Update Event
            </h3>
        </section>

        <div className='wrapper my-8'>
          <EventForm
            userId={userId}
            type="Update"
            eventId={eventToUpdate._id}
            eventData={eventToUpdate}
          />
        </div>
    </>
  )
}

export default UpdateEventPage