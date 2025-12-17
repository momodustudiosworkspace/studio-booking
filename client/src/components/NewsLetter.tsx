"use client"
import { useSendUserSubscriptionEmailMutation } from '@/redux/services/user/user/user.api';
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { AuthToast } from './toast/ToastMessage';

const NewsLetter = () => {
 const [sendUserSubscriptionEmail, { isLoading }] =
    useSendUserSubscriptionEmailMutation();

    const [email, setEmail] = useState<string>("")
    const handleNewsLetterSubscription = async () => {
        const response = await sendUserSubscriptionEmail({ email: email }).unwrap();
                     console.log("email user: ", email);
       
                     if (response.message || response.status === "success") {
                     
                       toast.success(AuthToast, {
                         data: {
                           title: "Subscribed!",
                           content: `${response.message || "Success! you have been added to newsletter!"}`,
                         },
                         ariaLabel: "Email sent to user",
                         icon: false,
                         theme: "colored",
                       });
                     }
       
                     console.log("response: ", response);
    }
  return (
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                  <div className="max-w-xl lg:max-w-lg">
                      <h2 className="text-4xl font-semibold tracking-tight text-white">Subscribe to our newsletter</h2>
                      <p className="mt-4 text-lg text-gray-300">
                          Get the latest photography tips, studio updates, and exclusive booking offers delivered to your inbox.
                      </p>
                      <div className="mt-6 flex max-w-md gap-x-4">
                          <label htmlFor="email-address" className="sr-only">
                              Email address
                          </label>
                          <input
                              id="email-address"
                              name="email"
                              type="email"
                              value={email}
                              onChange={(e)=>setEmail(e.target.value)}
                              required
                              placeholder="Enter your email"
                              autoComplete="email"
                              className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                          />
                          <button
                              type="submit"
                              className="flex items-center gap-2 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                              onClick={() => handleNewsLetterSubscription()} >
                              Subscribe {isLoading && <div className='ml-2 h-4 w-4 animate-spin rounded-full border-4 border-white border-t-transparent'></div>}
                          </button>
                      </div>
                  </div>
                  <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                      <div className="flex flex-col items-start">
                          <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                              <CalendarDaysIcon aria-hidden="true" className="size-6 text-white" />
                          </div>
                          <dt className="mt-4 text-base font-semibold text-white">Weekly articles</dt>
                          <dd className="mt-2 text-base/7 text-gray-400">
                              Receive weekly articles on photography techniques, studio tips, and industry trends to enhance your skills.
                          </dd>
                      </div>
                      <div className="flex flex-col items-start">
                          <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                              <HandRaisedIcon aria-hidden="true" className="size-6 text-white" />
                          </div>
                          <dt className="mt-4 text-base font-semibold text-white">No spam</dt>
                          <dd className="mt-2 text-base/7 text-gray-400">
                              We respect your privacy and promise no spam, only valuable content and exclusive offers.
                          </dd>
                      </div>
                  </dl>
              </div>
          </div>
          <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6">
              <div
                  style={{
                      clipPath:
                          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                  className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              />
          </div>
      </div>
  )
}

export default NewsLetter