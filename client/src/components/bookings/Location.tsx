'use client'
import { BaseIcons, IconsType } from '@/assets/icons/BaseIcons'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'

interface LocationProps {
    proceedBtnRef: React.RefObject<HTMLButtonElement | null>
    setLocation: (values: { state: string, address: string }) => void
}

const Location = ({ proceedBtnRef, setLocation }: LocationProps): React.JSX.Element => {
    const hiddenSubmitRef = useRef<HTMLButtonElement>(null)
    const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
    
      const BOOKING_SESSIONS: {
            title: string;
            icon: IconsType,
            id:number | null
        }[]= [
            {
                title: 'Studio',
                icon: 'studio-black',
                id:1
            },
            {
                title: 'Choose location',
                icon: 'marker-black',
                id:2
            },
           
          
        ]

    useEffect(() => {
        if (!proceedBtnRef.current || !hiddenSubmitRef.current) return

        proceedBtnRef.current.onclick = () => {
            hiddenSubmitRef.current?.click()
        }
    }, [proceedBtnRef])

    return (
        <div>
 <div className='bg-[#f3f3f3] h-[128px] w-full mb-10 grid grid-cols-2 gap-x-5 gap-y-5 p-5 rounded-lg overflow-y-scroll'>
          {BOOKING_SESSIONS.map((session, key) => (
              <button key={key} className={`${selectedLocation === session.id ? 'border-2 border-black' : ''} bg-white  text-sm rounded-lg h-[86px] flex flex-col items-center justify-center gap-2 w-[100%]`}
                  onClick={() =>
                  {
                      console.log(selectedLocation);
                      setSelectedLocation(session.id)
                      
                  }
              }>
                  <BaseIcons value={session?.icon} /> 
                  <span className=''>{session?.title}</span>
              </button>
          ))}
      </div>
            {
                
                selectedLocation === 2 && <Formik
                    initialValues={{
                        state: '',
                        address: '',
                    }}
                    onSubmit={(values) => {
                        setLocation({
                            state: values.state,
                            address: values.address

                        })
                    }}
                >
                    <Form className="flex flex-col gap-10 text-black">
                        {/* Date field */}
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium text-black">Select state</label>
                            <Field
                                name="state"
                                as="select"
                                className="border-b-[1px] text-sm outline-0 border-black focus:border-b-2 transition-all ease-in-out pb-2"
                               
                            >
                                <option value="">Select state</option>
                                <option value="abuja">Abuja</option>
                                <option value="lagos">Lagos</option>
                            </Field> 
                        </div>

                        {/* Time field */}
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium text-black">Address</label>
                            <Field
                                name="address"
                                type="text"
                                className="border-b-[1px] outline-0 border-black focus:border-b-2 transition-all ease-in-out pb-2"
                            />
                        </div>

                        {/* Hidden button that actually triggers Formik submit */}
                        <button type="submit" ref={hiddenSubmitRef} className="hidden">

                        </button>
                    </Form>
                </Formik>
       }
        </div>
    )
}

export default Location
