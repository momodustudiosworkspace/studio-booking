"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import DashboardHeader from "./DashboardHeader";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import BookingCardAnalytics from "./cards/BookingCardAnalytics";
import nairaSymbol from "@/utils/symbols";
import BookingCardPayment from "./cards/BookingCardPayment";
import {
  useGetAllPaymentQuery,
  usePrefetch,
} from "@/redux/services/admin/payment/adminPayments.api";
import Pagination from "@/components/Pagination";
// import { formatDate } from "@/utils/dateFormatter";
// import { formatTime } from "@/utils/timeFormatter";

const DashboardPayment = () => {
  const [paymentPage, setPaymentPage] = useState(1);
  const limit = 10;
  const { data: payments, isLoading } = useGetAllPaymentQuery(
    { page: paymentPage, limit: limit },
    { pollingInterval: 600000 }
  );
  const [currentTab, setCurrentTab] = useState<number>(1);

  console.log("payments: ", payments);

  // Prefetch hook for single booking
  const prefetchPayment = usePrefetch("getPaymentById");
  // ✅ Compute analytics safely and memoize
  const analytics = useMemo(() => {
    // const total = payments?.length || 2000;
    // const completed = payments?.filter(b => b.status === "completed").length || 0;
    // const upcoming = payments?.filter(b => b.status === "pending").length || 0;
    // const cancelled = payments?.filter(b => b.status === "cancelled").length || 0;

    return [
      {
        title: "Total Payment",
        count: payments?.totalPayment,
        linkText: "Completed payments",
        href: "/payments",
        dataType: 1,
      },
      {
        title: "today's revenue",
        count: `${nairaSymbol()}${payments?.todaysRevenue}`,
        linkText: "2 payments today",
        href: "/payments",
        dataType: 0,
      },
      {
        title: "balance",
        count: `${nairaSymbol()}${payments?.balance}`,
        linkText: "Pending payments",
        href: "/payments",
        dataType: 0,
      },
    ];
  }, []);
  // if (isLoading) return "Loading...";
  // if (error) return "Failed to load data";

  // 🔹 Compute and format your bookings once
  const formattedPayments = useMemo(() => {
    if (!payments) return [];

    return payments?.data.map(payment => ({
      booking: payment.booking,
      reference: payment.reference,
      amount: payment.amount,
      status: payment.status,
      paidAt: payment.paidAt,
    }));
  }, [payments]);

  // 🔹 Filter payments based on status or date
  const allpayments = formattedPayments;

  console.log("formattedPayments: ", formattedPayments);

  // const now = new Date();
  const upcomingpayments = formattedPayments.filter(payment => {
    // const paymentookingDate = payment.date;
    return payment.status;
  });

  const pastpayments = formattedPayments.filter(payment => {
    // const paymentookingDate = payment.date;
    return payment.status;
  });
  if (isLoading) return "Loading...";
  // if (error) return "Failed to load data";

  const TABS = [
    { label: "All", index: 1 },
    { label: "Upcoming", index: 2 },
    { label: "Past", index: 3 },
  ];

  const renderpayments = (data: typeof formattedPayments) => {
    if (!data.length)
      return (
        <p className='flex h-[100px] w-full items-center justify-center'>
          No payments available.
        </p>
      );
    return data.map(payment => (
      <div
        key={payment.reference}
        onMouseEnter={() =>
          prefetchPayment(payment.reference || "", { ifOlderThan: 60 })
        } // 👈 Prefetch on hover
        onFocus={() =>
          prefetchPayment(payment.reference || "", { ifOlderThan: 60 })
        } // 👈 Accessibility
      >
        <BookingCardPayment
          // id={payment.reference}
          booking={payment.booking}
          reference={payment.reference}
          amount={payment.amount}
          status={payment.status === "success" ? "completed" : "pending"}
          paidAt={payment.paidAt}
        />
      </div>
    ));
  };

  return (
    <DashboardLayout
      headerProps={{
        headerText: "Payments",
        paragraph: "track all booking payments, completed, pending & balance",
        linkText: "",
        href: "",
      }}
    >
      {/* Booking analytics  */}
      <div className='mb-14 flex w-full flex-col items-center gap-4 sm:flex-row'>
        {analytics.map((card, key) => (
          <BookingCardAnalytics
            key={key}
            title={card.title}
            count={card.count || 0}
            text={card.linkText}
            dataType={card.dataType}
          />
        ))}
      </div>
      <section className='w-full'>
        {/* payments table  */}
        <section className='max-h-[670px] w-full rounded-md border-[1px] border-[#F2F2F2] shadow'>
          {/* header section  */}
          <div className='mb-1 flex items-start justify-between p-5'>
            <div className='flex flex-col gap-10'>
              <DashboardHeader
                headerText={"Payments"}
                paragraph={"All payment records"}
              />
              {/* Tabs */}
              <div className='relative mb-5 flex items-center gap-10'>
                {TABS.map(tab => (
                  <button
                    key={tab.index}
                    className={`pb-1 text-sm font-medium capitalize ${
                      currentTab === tab.index
                        ? "border-b-[3px] border-black font-semibold"
                        : ""
                    }`}
                    onClick={() => setCurrentTab(tab.index)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex items-center gap-10'>
              <div className='relative w-full'>
                <div className=''>
                  <div className='absolute top-3 left-1 text-[14px] font-semibold capitalize underline'>
                    <DashboardIcons value='search-outlined-black' />
                  </div>
                  <input
                    type='text'
                    placeholder='Search'
                    name='search'
                    className='h-[37px] w-full border-b-[1px] border-white bg-white pr-2 pl-7 text-[14px] outline-0 transition-all ease-in-out focus:border-b-2 sm:w-[224px] sm:border-black'
                  />
                </div>
              </div>
              <div className='relative w-full'>
                <button className='flex items-center gap-2 rounded-md bg-[#FAFAFA] px-4 py-2'>
                  <DashboardIcons value='filter-outlined-black' />
                  <p>Filter</p>
                  <DashboardIcons value='down-arrow-outlined-black' />
                </button>
              </div>
            </div>
          </div>

          {/* booking list  */}
          <div className='flex flex-col font-medium'>
            <div className='flex items-center gap-[120px] rounded-tl-2xl rounded-tr-2xl bg-[#F9FAFB] p-4 font-semibold'>
              <div className='flex shrink-0 justify-between sm:w-[480px] sm:items-center'>
                <p>Invoice</p>
                <p>Client</p>
                <p>Amount</p>
              </div>
              <div className='flex items-center justify-center gap-2 sm:w-[200px]'>
                <p>Date</p>
              </div>
              <div className='flex items-center gap-2 sm:w-[200px]'>
                <p>Status</p>
              </div>
              <div className='flex gap-2 sm:items-center sm:justify-center'>
                <p>Action</p>
              </div>
            </div>

            {/* payments lists */}

            {/* payments per tab */}
            <div className='flex flex-col gap-4 py-6 pr-6 pl-4'>
              {currentTab === 1 && renderpayments(allpayments)}
              {currentTab === 2 && renderpayments(upcomingpayments)}
              {currentTab === 3 && renderpayments(pastpayments)}
            </div>
            <div className='p-6'>
              <Pagination
                currentPage={payments?.pagination.page || null}
                totalPages={payments?.pagination.totalPages || null}
                onPageChange={setPaymentPage}
              />
            </div>
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
};

export default DashboardPayment;
