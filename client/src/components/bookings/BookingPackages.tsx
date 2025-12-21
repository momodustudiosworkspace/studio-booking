import { useAppDispatch } from "@/hooks/hooks";
import { setBookingPackage } from "@/redux/slices/bookingSlice";
import React, { useCallback, useEffect, useMemo, useState } from "react";
// import Button from "../ui/Button";
// import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import nairaSymbol from "@/utils/symbols";
import { useGetPackagesQuery } from "@/redux/services/admin/package/adminPackages.api";
import { CheckIcon } from "@heroicons/react/24/outline";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
interface PackageProps {
  title: string | null;
  price: number | null;
  sessionId?: string | null;
}
interface BookingsPackagesProps {
  bookingPackage: PackageProps | null | undefined;
  // setOnProceed: React.Dispatch<React.SetStateAction<(() => void) | null>>;
  setBookingStep: (step: number) => void;
}

const emblaOptions: EmblaOptionsType = {
  align: "start",
  containScroll: "trimSnaps",
};

const BookingPackages = ({
  bookingPackage,
  // setOnProceed,
  setBookingStep,
}: BookingsPackagesProps): React.JSX.Element => {
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const { data, isLoading } = useGetPackagesQuery(
    { sessionId: bookingPackage?.sessionId || "" },
    {
      skip: !bookingPackage?.sessionId,
      pollingInterval: 300000,
    }
  );

  const SESSIONS_PACKAGES = useMemo(() => data?.data || [], [data?.data]);
  const [selectedSessionPackage, setSelectedSessionPackage] = useState<
    string | null
  >("");
  console.log("data: ", data?.data);

  const dispatch = useAppDispatch();
  // const [selectedPackage, setSelectedPackage] = useState<PackageProps | null>(
  //   bookingPackage || null
  // );

  const handleSelect = (packageSelected: PackageProps) => {
    setSelectedSessionPackage(packageSelected.price?.toString() || null);
    dispatch(setBookingPackage({ package: packageSelected }));

    setBookingStep(2);
  };
  // useEffect(() => {
  //   // Register this child’s custom proceed handler

  //   setOnProceed(() => () => {
  //     dispatch(setBookingPackage({ package: selectedPackage }));
  //   });

  //   // Cleanup when leaving this step
  //   return () => setOnProceed(null);
  // }, [setOnProceed, selectedPackage, dispatch]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // Sync selected slide with Embla
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    const session = SESSIONS_PACKAGES[index];
    if (session) {
      setSelectedSessionPackage(session.price?.toString() || null);
    }
  }, [emblaApi, SESSIONS_PACKAGES]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='w-[350px] rounded-lg sm:w-[850px]'>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex w-full gap-4 py-10'>
          {data?.data.map((packages, packagesIdx) => {
            return (
              <div
                key={packages.title}
                className={classNames(
                  packages.services
                    ? "relative bg-black"
                    : "bg-white/[0.025] sm:mx-8 lg:mx-0",
                  packages.services
                    ? ""
                    : packagesIdx === 0
                      ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                      : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
                  "rounded-3xl p-8 ring-1 ring-white/10 sm:p-10"
                )}
              >
                <h3
                  id={packages.title}
                  className={classNames(
                    packages.services ? "text-white" : "text-white",
                    "text-base/7 font-semibold capitalize"
                  )}
                >
                  {packages.title}
                </h3>
                <p className='mt-4 flex items-baseline gap-x-2'>
                  <span
                    className={classNames(
                      packages.services ? "text-white" : "text-white",
                      "text-5xl font-semibold tracking-tight"
                    )}
                  >
                    {nairaSymbol()}
                    {packages.price.toLocaleString()}
                  </span>
                  <span
                    className={classNames(
                      packages.services ? "text-gray-400" : "text-gray-400",
                      "text-base"
                    )}
                  >
                    /session
                  </span>
                </p>
                {/* <p
                className={classNames(
                  packages.services ? "text-gray-300" : "text-gray-300",
                  "mt-6 text-base/7"
                )}
              >
                {tier.description}
              </p> */}
                <ul
                  role='list'
                  className={classNames(
                    packages.services ? "text-gray-300" : "text-gray-300",
                    "mt-8 space-y-3 text-sm/6 sm:mt-10"
                  )}
                >
                  {packages.services.map(service => (
                    <li key={service} className='flex gap-x-3'>
                      <CheckIcon
                        aria-hidden='true'
                        className={classNames(
                          packages.services ? "text-white" : "text-white",
                          "h-6 w-5 flex-none"
                        )}
                      />
                      {service}
                    </li>
                  ))}
                </ul>
                <button
                  // href={tier.href}
                  aria-describedby={packages.title}
                  className={classNames(
                    packages.services
                      ? "bg-white text-black hover:bg-white/35 focus-visible:outline-white/75"
                      : "bg-white/10 text-white inset-ring inset-ring-white/5 hover:bg-white/20 focus-visible:outline-white/75",
                    "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
                  )}
                  onClick={() => handleSelect(packages)}
                >
                  Select package
                </button>
              </div>
            );
          })}
        </div>
        {/* Thumbs / Indicators */}
        <div className='mt-4 flex justify-center gap-2'>
          {SESSIONS_PACKAGES.map((sessionPackage, index) => (
            <button
              key={sessionPackage.price}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition ${
                selectedSessionPackage === sessionPackage.price.toString()
                  ? "bg-white"
                  : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingPackages;

// <div className='flex w-full justify-end pr-4'>
//   <Button
//     text='Select package'
//     onClick={() => setSelectedPackage(packages)}
//     icon={<RedirectArrowWhite />}
//     // disabled={!values.agree || isSubmitting}
//     iconPosition='right'
//     className='w-[180px]'
//     size='md'
//     // loading={isSubmitting}
//   />
// </div>
