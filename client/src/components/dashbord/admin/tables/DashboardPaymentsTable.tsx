"use client";

import { formatDate } from "@/utils/dateFormatter";
import Link from "next/link";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";

import { AllPaymentResponse } from "@/types/payment.types";
import nairaSymbol from "@/utils/symbols";


interface PaymentTableProps {
    payments: AllPaymentResponse[],
    isLoading: boolean
}


const DashboardPaymentsTable = ({
    payments, isLoading }: PaymentTableProps) => {
  

    return (
        <div className="w-full rounded-xl bg-white ">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b rounded-tr-2xl rounded-tl-2xl bg-gray-50">
                            <th className="px-4 py-5">Invoice</th>
                            <th className="px-4 py-5">Client</th>
                            <th className="px-4 py-5">Amount</th>
                            <th className="px-4 py-5">Date</th>
                            <th className="px-4 py-5">Status</th>
                            <th className="px-4 py-5">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading ? (
                            [...Array(6)].map((_, i) => (
                                <tr key={i} className="animate-pulse border-b">
                                    <td className="px-4 py-5">
                                        <div className="h-4 w-40 rounded bg-gray-200" />
                                    </td>
                                    <td className="px-4 py-5">
                                        <div className="h-4 w-48 rounded bg-gray-200" />
                                    </td>
                                    <td className="px-4 py-5">
                                        <div className="h-4 w-24 rounded bg-gray-200" />
                                    </td>
                                    <td className="px-4 py-5">
                                        <div className="h-4 w-20 rounded bg-gray-200" />
                                    </td>
                                </tr>
                            ))
                        ) : payments.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-6 text-center text-gray-500">
                                    No bookings found
                                </td>
                            </tr>
                        ) : (
                            payments.map(payment => (
                                <tr
                                    key={payment.reference}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-4 py-5 font-medium capitalize">
                                        #MS-{payment.reference?.slice(0, 4)}
                                    </td>
                                    <td className="px-4 py-5 capitalize">{payment.booking}</td>
                                    <td className="px-4 py-5 capitalize">{`${nairaSymbol()} ${payment.amount?.toLocaleString()}`}</td>

                                    <td className="px-4 py-5 flex items-center gap-2 capitalize">
                                        <div
                                            className={`flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FAFAFA]`}
                                        >
                                            <DashboardIcons value='calendar-grid-outlined-black' />
                                        </div>
                                        {/* {payment.date} */}
                                        <div>
                                            <p> {formatDate(payment.paidAt)}</p>
                                        </div>
                                    </td>

                                    <td className="px-4 py-5">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${payment.status === "success"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-5">
                                      
                                            <Link href={`/admin/dashboard/bookings/${payment.booking}`} className="inline-block rounded-md  px-6 text-sm py-2 text-center font-semibold text-white bg-black ">
                                                View
                                            </Link>
                                      


                                        {/* {payment.assignedTo ? "Assigned" : "Not assigned"} */}
                                        {/* {booking.assignedTo ? booking.assignedTo : "Not assigned"} */}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {/* {pagination && (
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Page {pagination.page} of {pagination.totalPages}
                    </p>

                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <button
                            disabled={page >= pagination.totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default DashboardPaymentsTable;
