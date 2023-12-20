import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-primary-100 bg-dotted-pattern bg-cover bg-fixed bg-center'>
        {children}
    </div>
  )
}

export default AuthLayout