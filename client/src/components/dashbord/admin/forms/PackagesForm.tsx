"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Field, Form, Formik } from "formik";
import { useCreatePackageMutation } from "@/redux/services/admin/package/adminPackages.api";
import { toast } from "react-toastify";

interface PackagesFormProps {
    setOpen: (open: boolean) => void;
    open: boolean;
    selectedSession: {
        selectedSessionId: string;
        selectedSessionTitle?: string;
    }
    formDataId: string
}

const formData = {
    package_title: "Basic",
    package_services: [
        "1 15sec instagram reel",
        "1 20X30 portrait print",
        "2 photographer outfit"
    ],
    price: 124000,
    discount: 12400
}

const PackagesForm = ({ setOpen, open, selectedSession, formDataId }: PackagesFormProps) => {
    const [packageFeatures, setPackageServices] = useState<string[]>(formData.package_services || []);
    const [createPackage] = useCreatePackageMutation();
    console.log("formDataId: ", formDataId);


    const handleAddPackageFeatures = (newFeature: string, setFieldValue: any) => {

        console.log("newFeature: ", newFeature);

        if (!newFeature.trim()) return; // Prevent empty strings
        setPackageServices((prev) => [...prev, newFeature]);
        setFieldValue("package_services", ""); // Reset Formik input
    };

    const removeFeature = (index: number) => {
        setPackageServices((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/50" />

            <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-xl">
                    <div className="px-6 py-5">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex size-12 items-center justify-center rounded-full bg-black/20">
                                <PlusCircleIcon className="size-6 text-black" />
                            </div>
                            <DialogTitle className="text-base font-semibold text-black">
                                Edit {selectedSession.selectedSessionTitle} package
                                <p className="text-sm text-gray-500">
                                    Enter package title and add all package features.
                                </p>
                            </DialogTitle>
                        </div>

                        {/* FORM */}
                        <Formik
                            initialValues={{
                                package_title: formData.package_title || "",
                                package_service: "",
                                price: formData.price || 0,
                                discount: formData.discount || 0
                            }}
                            onSubmit={async (values) => {
                                console.log({
                                    ...values,
                                    features: packageFeatures,
                                });

                                try {
                                    
                                    const res =   await createPackage({
                                          session: selectedSession.selectedSessionId,
                                          title: values.package_title,
                                          price: values.price,
                                          discount: values.discount,
                                          services: packageFeatures,
                                      }).unwrap();
      
                                    if (res?.status === 200) {
                                        console.log("Package created successfully");
                                        setOpen(false);
                                        return toast.success("Package created successfully");
                                    }
                                } catch (error) {
                                   return console.log(error);
                                    
                                }
                                return
                            }}
                        >
                            {({ values, isSubmitting, setFieldValue }) => (
                                <Form className="flex flex-col gap-8">
                                    {/* Package Title */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-black">
                                            Select package title
                                        </label>
                                        {
                                            values.package_title ? (
                                                <Field
                                                    name="package_title"
                                                    type="text"
                                                    className="border-b border-black pb-2 outline-0 focus:border-b-2"
                                                    placeholder="Enter package title"
                                                />
                                            ) : (
                                                <Field as="select" name="package_title" className='border-b-[1px] border-white pb-2 outline-0 transition-all ease-in-out focus:border-b-2 sm:border-black'
                                                >
                                                    <option value="" label="Select package title" />
                                                    <option value="basic">Basic</option>
                                                    <option value="standard">Standard</option>
                                                    <option value="super">Super</option>
                                                    <option value="ultra">Ultra</option>
                                                </Field>)
                                        }
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-black">
                                            Price
                                        </label>
                                        <Field
                                            name="price"
                                            type="number"
                                            className="border-b border-black pb-2 outline-0 focus:border-b-2"
                                            placeholder="Enter package price"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-black">
                                            Discount
                                        </label>
                                        <Field
                                            name="discount"
                                            type="number"
                                            className="border-b border-black pb-2 outline-0 focus:border-b-2"
                                            placeholder="Enter package discount"
                                        />
                                    </div>

                                    {/* Add Package Feature */}
                                    <div className="flex flex-col gap-3">
                                        <label className="text-sm font-medium text-black">
                                            Add package features
                                        </label>

                                        <div className="flex gap-2">
                                            <Field
                                                name="package_service"
                                                type="text"
                                                className="flex-1 border-b border-black pb-2 outline-0 focus:border-b-2"
                                                placeholder="Enter a feature"
                                            />
                                            <button
                                                type="button"
                                                className="rounded-md bg-black px-4 py-2 text-white hover:bg-black/80 text-sm"
                                                onClick={() =>
                                                    handleAddPackageFeatures(
                                                        values.package_service,
                                                        setFieldValue
                                                    )
                                                }
                                            >
                                                Add
                                            </button>
                                        </div>

                                        {/* Feature Pills */}
                                        <div className="flex flex-wrap gap-2 mt-2">

                                            {packageFeatures.length > 0 ? (
                                                <div className="flex flex-col gap-2 w-full">
                                                    {packageFeatures.map((feature, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md text-sm justify-between"
                                                        >
                                                            <span>{feature}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFeature(index)}
                                                                className="text-gray-600 hover:text-black"
                                                            >
                                                                <XMarkIcon className="size-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                               
                                            ) : (
                                                <p className="text-sm text-gray-400">
                                                    No features added yet.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-end gap-3 ">
                                        <button
                                            type="button"
                                            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-500"
                                            onClick={() => setOpen(false)}
                                        >
                                            x Close
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !values.package_title || packageFeatures.length === 0}
                                            className={`rounded-md px-4 py-2 text-sm text-white ${!values.package_title
                                                    ? "bg-green-700/60 cursor-not-allowed"
                                                    : "bg-green-700 hover:bg-green-800"
                                                }`}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default PackagesForm;
