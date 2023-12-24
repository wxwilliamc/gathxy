"use client"

import { FileWithPath } from '@uploadthing/react'
import React, { Dispatch, SetStateAction, useCallback } from 'react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '../ui/button'

interface FileUploaderProps {
  imageUrl: string
  onFieldChange: (value: string) => void
  setFiles: Dispatch<SetStateAction<File[]>>
}

const FileUploader = ({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  });

  return (
    <div {...getRootProps()} className='flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50'>
      <input {...getInputProps()} className='cursor-pointer' />

      {imageUrl ? (
        <div className='flex h-full w-full flex-1 justify-center'>
          <Image
            src={imageUrl}
            alt='image'
            width={250}
            height={250}
            className='w-full object-cover object-center'
          />
        </div>
      ) : (
        <div className='flex-center flex-col py-5 text-grey-500'>
          <Image
            src='https://i.pinimg.com/564x/e0/4f/e9/e04fe918bc98e99f960d239f80e26775.jpg'
            alt='file upload'
            width={77}
            height={77}
            className='rounded-full'
          />

          <h3 className='my-2'>
            Drag & Drop <br/> image here
          </h3>

          <p className='p-medium-12 mb-4'>
            PNG, JPG, SVG
          </p>

          <Button type='button' className='rounded-full gradient-button hover:animate-pulse'>
            Select from device
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileUploader