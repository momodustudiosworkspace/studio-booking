import React, { useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import PackagesForm from '../forms/PackagesForm';

interface SessionPackagesProps {
    setOpen: (open: boolean) => void;
    open: boolean;
    selectedSession: {
        selectedSessionId: string;
        selectedSessionTitle?: string;
    }
}
const SessionPackages = ({ setOpen, open, selectedSession }: SessionPackagesProps) => {
    const [openPackageForm, setOpenPackageForm]= useState<boolean>(false);
  return (
      <Dialog open={open} onClose={setOpen} className="relative z-50">
          <DialogBackdrop className="fixed inset-0 bg-gray-900/50" />

          <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
              <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-xl">
                  <div className="px-6 py-5">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-6">
                          <div className="flex size-12 items-center justify-center rounded-full bg-black/20">
                              <PlusCircleIcon className="size-6 text-black" />
                          </div>
                          <DialogTitle className="text-base font-semibold text-black">
                               {selectedSession.selectedSessionTitle} packages
                              <p className="text-sm text-gray-500">
                                  Click to edit package title and add all package features.
                              </p>
                          </DialogTitle>
                      </div>

                      <button onClick={()=>setOpenPackageForm(!openPackageForm)}>Add package</button>
                      <PackagesForm selectedSession={selectedSession} open={openPackageForm} setOpen={setOpenPackageForm} />
                  </div>
              </DialogPanel>
          </div>
      </Dialog>
  )
}

export default SessionPackages