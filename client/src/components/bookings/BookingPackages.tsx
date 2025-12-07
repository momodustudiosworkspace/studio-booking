import { useAppDispatch } from "@/hooks/hooks";
import { setBookingPackage } from "@/redux/slices/bookingSlice";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import nairaSymbol from "@/utils/symbols";
import { useGetPackagesQuery } from "@/redux/services/admin/package/adminPackages.api";
interface PackageProps {
  title: string | null;
  price: number | null;
  sessionId?: string | null;
}
interface BookingsPackagesProps {
  bookingPackage: PackageProps | null | undefined;
  setOnProceed: React.Dispatch<React.SetStateAction<(() => void) | null>>;
}

const BookingPackages = ({
  bookingPackage,
  setOnProceed,

}: BookingsPackagesProps): React.JSX.Element => {
  const { data, isLoading, } = useGetPackagesQuery({ sessionId: bookingPackage?.sessionId || "" }, {
    skip: !bookingPackage?.sessionId, pollingInterval: 300000
  });

  console.log("data: ", data?.data);

  const dispatch = useAppDispatch();
  const [selectedPackage, setSelectedPackage] = useState<PackageProps | null>(
    bookingPackage || null
  );


  useEffect(() => {
    // Register this child’s custom proceed handler

    setOnProceed(() => () => {
      dispatch(setBookingPackage({ package: selectedPackage }));
    });

    // Cleanup when leaving this step
    return () => setOnProceed(null);
  }, [setOnProceed, selectedPackage, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div >
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {data?.data.map(packages => {

          return (
            <div
              key={packages.title}
              className={`rounded-xl border-[2px] pb-5 shadow sm:w-[350px] ${selectedPackage?.price === packages.price ? "border-black bg-white text-black" : "border-white  text-white"}`}
            >

              <div className={`flex items-center justify-between rounded-tl-xs rounded-tr-xs ${selectedPackage?.price === packages.price ? "border-black bg-black text-white" : "border-black text-white"} px-4 py-2 font-medium`}>
                <h3 className='uppercase'>{packages.title}</h3>
                <h3 className='font-semibold'>
                  {nairaSymbol()}
                  {(packages.price ?? 0).toLocaleString("en-US")}
                </h3>
              </div>
              <div className='py-3 pl-6'>
                <ul className=''>
                  {packages.services.map((service, key) => {
                    return (
                      <li key={key} className='my-2'>
                        {service}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className='flex w-full justify-end pr-4'>
                <Button
                  text='Select package'
                  onClick={() => setSelectedPackage(packages)}
                  icon={<RedirectArrowWhite />}
                  // disabled={!values.agree || isSubmitting}
                  iconPosition='right'
                  className='w-[180px]'
                  size='md'
                  // loading={isSubmitting}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingPackages;
