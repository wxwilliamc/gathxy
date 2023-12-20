import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link
          href='/'
          className="w-36 font-bold text-xl"
        >
          Gathxy
        </Link>

        <p>
          2023 Gathxy. All Rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer