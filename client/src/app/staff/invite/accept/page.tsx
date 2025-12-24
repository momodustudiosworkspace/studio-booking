"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useAcceptInvitationMutation } from "@/redux/services/admin/staff-management/adminStaffManagement.api";
import MomoduWhite from "@/assets/icons/MomoduWhite";
import { useAppDispatch } from "@/hooks/hooks";
import { adminStaffManagementApi } from "@/redux/services/admin/staff-management/adminStaffManagement.api";

const AcceptInvitationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [acceptInvitation, { isLoading, isSuccess, isError, error }] =
    useAcceptInvitationMutation();

  const dispatch = useAppDispatch();

  const handleAcceptInvitation = async () => {
    try {
      if (token) {
        const response = await acceptInvitation({ token }).unwrap();

        if (isSuccess) {
          alert(response);
        }
      }
      // 🔥 Force refresh staff list everywhere
      dispatch(adminStaffManagementApi.util.invalidateTags(["Staff"]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-10 bg-black px-4 text-white'>
      <MomoduWhite />
      <div className='w-full max-w-sm rounded-lg border border-white p-6'>
        {!isSuccess && <h1 className='mb-4'>
          Click the button below to accept staff invitation
        </h1>}

        {!isSuccess && (
          <button
            onClick={() => handleAcceptInvitation()}
            className='w-full rounded border-none bg-white p-3 text-black outline-none'
          >
            Accept invitation
          </button>
        )}

        {/* Missing token */}
        {!token && (
          <p className='text-red-400'>Invalid or missing invitation link.</p>
        )}

        {/* Loading */}
        {isLoading && (
          <p className='mt-3 text-gray-300'>Verifying your invitation…</p>
        )}

        {/* Success */}
        {isSuccess && (
          <div>
            <p className='mb-2 font-medium text-green-400'>
              Invitation verified successfully 🎉
            </p>
            <p className='text-sm text-gray-300'>
              You can now have your task report automated!
            </p>

            {/* Next step later */}
            {/* <Button>Create Password</Button> */}
          </div>
        )}

        {/* Error */}
        {isError && (
          <p className='mt-3 text-red-400'>
            {(error as any)?.data?.message ||
              "This invitation link is invalid or has expired."}
          </p>
        )}
      </div>
    </div>
  );
};

export default AcceptInvitationPage;
