import React, { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const stopScrollingBackContent = () => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }

  useEffect(stopScrollingBackContent, [])

  return (
    <>
      {isOpen
        ? createPortal(
            <div
              className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-10'
              onClick={handleBackgroundClick}
            >
              <div className=' absolute inset-0 bg-gray-700 bg-opacity-80'></div>

              <div className=' relative z-50 mx-auto overflow-y-auto rounded bg-white shadow-lg md:max-w-3xl'>
                <div className='px-6 py-4 text-left'>
                  <div className='flex items-center justify-between pb-3	'>
                    <p className='text-2xl font-bold text-black'>{title}</p>
                    <div className='z-50 cursor-pointer' onClick={onClose}>
                      <svg
                        className='fill-current text-black'
                        xmlns='http://www.w3.org/2000/svg'
                        width='18'
                        height='18'
                        viewBox='0 0 18 18'
                      >
                        <path d='M18 1.3L16.7 0 9 7.7 1.3 0 0 1.3 7.7 9 0 16.7 1.3 18 9 10.3l7.7 7.7 1.3-1.3L10.3 9z'></path>
                      </svg>
                    </div>
                  </div>
                  {children}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}

export default Modal
