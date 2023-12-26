'use client'

import { IEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Checkout from './Checkout'

interface CheckoutButtonProps {
  event: IEvent
}

const CheckoutButton = ({ event }: CheckoutButtonProps) => {

  const hasEventOver = new Date(event.endDateTime) < new Date();

  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  return (
    <div className='flex items-center gap-3'>
      {/* If Event Over */}
      {hasEventOver ? (
        <p className='p-4 bg-rose-500 rounded-full text-white'>
          ⚠️ Sorry, tickets are no longer available / event was over.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className='button bg-blue-400 hover:bg-blue-500 transition'>
              <Link href='/sign-in'>
                Get Tickets
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout 
              event={event}
              userId={userId}
            />
          </SignedIn>
        </>
      )}
    </div>
  )
}

export default CheckoutButton