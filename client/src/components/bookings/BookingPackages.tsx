import { useAppDispatch } from "@/hooks/hooks";
import { setBookingPackage } from "@/redux/slices/bookingSlice";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import nairaSymbol from "@/utils/symbols";

interface PackageProps {
  title: string | null;
  price: number | null;
}
interface BookingsPackagesProps {
  bookingPackage: PackageProps | null | undefined;
  setOnProceed: React.Dispatch<React.SetStateAction<(() => void) | null>>;
}

const BookingPackages = ({
  bookingPackage,
  setOnProceed,
}: BookingsPackagesProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const [selectedPackage, setSelectedPackage] = useState<PackageProps | null>(
    bookingPackage || null
  );

  const PACKAGES = [
    {
      title: "basic",
      price: 123400,
      services: [
        "1 outfit, 5 edited pictures",
        "15-30 seconds reels",
        "20X30 enlargement frame",
      ],
    },
    {
      title: "standard",
      price: 1234000,
      services: [
        "1 outfit, 5 edited pictures",
        "15-30 seconds reels",
        "20X30 enlargement frame",
      ],
    },
    {
      title: "super",
      price: 123400,
      services: [
        "1 outfit, 5 edited pictures",
        "15-30 seconds reels",
        "20X30 enlargement frame",
      ],
    },
    {
      title: "ultra",
      price: 123400,
      services: [
        "1 outfit, 5 edited pictures",
        "15-30 seconds reels",
        "20X30 enlargement frame",
      ],
    },
  ];

  useEffect(() => {
    // Register this child’s custom proceed handler

    setOnProceed(() => () => {
      dispatch(setBookingPackage({ package: selectedPackage }));
    });

    // Cleanup when leaving this step
    return () => setOnProceed(null);
  }, [setOnProceed, selectedPackage, dispatch]);

  return (
    <div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {PACKAGES.map(packages => {
          return (
            <div
              key={packages.title}
              className={`rounded-xl border-[2px] pb-5 shadow sm:w-[350px] ${selectedPackage?.title === packages.title ? "border-black" : "border-white"}`}
            >
              <div className='flex items-center justify-between rounded-tl-xl rounded-tr-xl bg-black px-4 py-2 font-medium text-white'>
                <h3 className='uppercase'>{packages.title}</h3>
                <h3 className='font-semibold'>
                  {nairaSymbol()}
                  {packages.price.toLocaleString("en-US")}
                </h3>
              </div>
              <div className='py-3 pl-6'>
                <ul className='list-disc'>
                  {packages.services.map(service => {
                    return (
                      <li key={service} className='my-2'>
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
