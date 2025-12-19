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

    const [
        acceptInvitation,
        { isLoading, isSuccess, isError, error },
    ] = useAcceptInvitationMutation();

    const dispatch = useAppDispatch();

    const handleAcceptInvitation = async () => {

        try {

            if (token) {
                
                const response = await acceptInvitation({ token }).unwrap();

                if (isSuccess) {
                    alert(response)
                }
            }
            // 🔥 Force refresh staff list everywhere
            dispatch(
                adminStaffManagementApi.util.invalidateTags(["Staff"])
            );
            
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className="flex flex-col gap-10 min-h-screen items-center justify-center bg-black text-white px-4">
            <MomoduWhite />
            <div className="w-full max-w-sm rounded-lg border border-white p-6">
                <h1 className="mb-4">
              Click the button below to accept staff invitation
                </h1>

                {!isSuccess && <button onClick={() => handleAcceptInvitation()} className="bg-white rounded text-black p-3 w-full outline-none border-none">Accept invitation</button>}

                {/* Missing token */}
                {!token && (
                    <p className="text-red-400">
                        Invalid or missing invitation link.
                    </p>
                )}

                {/* Loading */}
                {isLoading && (
                    <p className="text-gray-300 mt-3">
                        Verifying your invitation…
                    </p>
                )}

                {/* Success */}
                {isSuccess && (
                    <div>
                        <p className="text-green-400 font-medium mb-2">
                            Invitation verified successfully 🎉
                        </p>
                        <p className="text-sm text-gray-300">
                            You can now have your task report automated!
                        </p>

                        {/* Next step later */}
                        {/* <Button>Create Password</Button> */}
                     </div>
                )}

                {/* Error */}
                {isError && (
                    <p className="text-red-400 mt-3">
                        {(error as any)?.data?.message ||
                            "This invitation link is invalid or has expired."}
                    </p>
                )}
            </div>
        </div>
    );
};

export default AcceptInvitationPage;
