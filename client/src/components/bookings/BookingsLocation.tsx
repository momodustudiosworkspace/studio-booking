"use client";
import { BaseIcons, IconsType } from "@/assets/icons/BaseIcons";
import { useAppDispatch } from "@/hooks/hooks";
import { setBookingLocationType } from "@/redux/slices/bookingSlice";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";

interface BookingLocationOptions {
  state?: string;
  address?: string;
}
interface BookingsLocationProps {
  selectedDefaultLocation: number | null;
  selectedBookingLocation: BookingLocationOptions | null | undefined;
  setOnProceed: React.Dispatch<React.SetStateAction<(() => void) | null>>;
}

const BookingsLocation = ({
  selectedBookingLocation,
  selectedDefaultLocation,
  setOnProceed,
}: BookingsLocationProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);
  const [selectedbookingsLocation, setSelectedbookingsLocation] = useState<
    number | null
  >(selectedDefaultLocation || null);

  const BOOKING_LOCATIONS: {
    title: string;
    icon: IconsType;
    id: number | null;
  }[] = [
    {
      title: "Studio",
      icon: "studio-black",
      id: 1,
    },
    {
      title: "Choose Location",
      icon: "marker-black",
      id: 2,
    },
  ];

  useEffect(() => {
    // Register this child’s custom proceed handler
    setOnProceed(() => () => {
      hiddenSubmitRef.current?.click();
      if (selectedbookingsLocation === 1) {
        dispatch(
          setBookingLocationType({
            location: {
              state: "Abuja",
              address: "C1 Melita Plaze, Gimbiya street, Garki",
            },
            defaultLocation: selectedbookingsLocation,
          })
        );
      }
    });

    // Cleanup when leaving this step
    return () => setOnProceed(null);
  }, [setOnProceed, selectedbookingsLocation, dispatch]);

  return (
    <div className='w-full sm:w-[450px]'>
      <div className='mb-10 grid h-[128px] w-full grid-cols-2 gap-x-5 gap-y-5 overflow-y-scroll rounded-lg bg-[#f3f3f3] p-5'>
        {BOOKING_LOCATIONS.map((location, key) => (
          <button
            key={key}
            className={`${selectedbookingsLocation === location.id ? "border-2 border-black" : ""} flex h-[86px] w-[100%] flex-col items-center justify-center gap-2 rounded-lg bg-white text-sm`}
            onClick={() => {
              console.log(" setSelectedbookingsLocation(location.id);");
              setSelectedbookingsLocation(location.id);
            }}
          >
            <BaseIcons value={location?.icon} />
            <span className=''>{location?.title}</span>
          </button>
        ))}
      </div>
      {selectedbookingsLocation === 2 && (
        <Formik
          initialValues={{
            state: selectedBookingLocation?.state || "",
            address: selectedBookingLocation?.address || "",
          }}
          onSubmit={values => {
            if (selectedbookingsLocation > 1) {
              if (values.state && values.address) {
                dispatch(
                  setBookingLocationType({
                    location: {
                      state: values.state,
                      address: values.address,
                    },
                    defaultLocation: selectedbookingsLocation,
                  })
                );
              }
            }
          }}
        >
          <Form className='flex flex-col gap-10 text-black'>
            {/* Date field */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-black'>
                Select state
              </label>
              <Field
                name='state'
                as='select'
                className='border-b-[1px] border-black pb-2 text-sm outline-0 transition-all ease-in-out focus:border-b-2'
              >
                <option value=''>Select state</option>
                <option value='abuja'>Abuja</option>
                <option value='lagos'>Lagos</option>
              </Field>
            </div>

            {/* Time field */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm font-medium text-black'>Address</label>
              <Field
                name='address'
                type='text'
                className='border-b-[1px] border-black pb-2 outline-0 transition-all ease-in-out focus:border-b-2'
              />
            </div>

            {/* Hidden button that actually triggers Formik submit */}
            <button
              type='submit'
              ref={hiddenSubmitRef}
              className='hidden'
              onClick={() => {}}
            ></button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default BookingsLocation;
