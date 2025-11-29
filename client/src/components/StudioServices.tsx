import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const people = [
    {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        role: 'Hair Stylist',
        imageUrl:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        role: 'MakeUp Artist',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        role: 'Hair Barber',
        imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
    {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        role: 'Fashion Designer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        role: 'Face Model',
        imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: '3h ago',
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        role: 'Photographer',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
]
const peopleOnline = [

    {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        role: 'Fashion Designer',
        imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        role: 'Face Model',
        imageUrl:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
        lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
        name: 'Tom Cook',
        email: 'tom.cook@example.com',
        role: 'Photographer',
        imageUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        lastSeen: null,
    },
]
const StudioServices = () => {
    return (

        <div className='sm:mx-auto mx-5 max-w-7xl flex sm:flex-row flex-col gap-8 lg:p-8 rounded-lg'>
            <div>
                <h1 className='text-4xl font-bold'>Quick Access</h1>
                <h1 className='text-4xl font-bold mb-5'>to Studio Services</h1>
                <p className='sm:w-[60%]'>
                    Explore our range of professional studio services designed to meet all your creative needs. From state-of-the-art equipment rentals to expert technical support, we provide everything you need to bring your vision to life
                </p>
                <ul role="list" className="divide-y divide-white/5 pl-2 hidden sm:flex flex-col rounded-lg p-4 sm:w-full lg:w-[60%]">
                    {peopleOnline.map((person) => (
                        <li key={person.email} className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <Image
                                    width={100}
                                    height={100}
                                    alt=""
                                    src={person.imageUrl}
                                    className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                                />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm/6 font-semibold text-black">{person.name}</p>
                                    <p className="mt-1 truncate text-xs/5 text-gray-400">{person.email}</p>
                                </div>
                            </div>
                            <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm/6 text-black">{person.role}</p>
                                {person.lastSeen ? (
                                    <p className="mt-1 text-xs/5 text-gray-400">
                                        Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                    </p>
                                ) : (
                                    <div className="mt-1 flex items-center gap-x-1.5">
                                        <div className="flex-none rounded-full bg-emerald-500/30 p-1">
                                            <div className="size-1.5 rounded-full bg-emerald-500" />
                                        </div>
                                        <p className="text-xs/5 text-gray-400">Online</p>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
                  <Link
                                         href="#"
                                         className="inline-block mb-10 rounded-md border border-transparent bg-black px-8 py-3 text-center font-semibold text-white hover:bg-black/25"
                                       >
                                         View All Services
                                          </Link>
            </div>

            <ul role="list" className="divide-y divide-white/5 pl-2 bg-black rounded-lg p-4 sm:w-full lg:w-[60%]">
            {people.map((person) => (
                <li key={person.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <Image
                            width={100}
                            height={100}
                            alt=""
                            src={person.imageUrl}
                            className="size-12 flex-none rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                        />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm/6 font-semibold text-white">{person.name}</p>
                            <p className="mt-1 truncate text-xs/5 text-gray-400">{person.email}</p>
                        </div>
                    </div>
                    <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm/6 text-white">{person.role}</p>
                        {person.lastSeen ? (
                            <p className="mt-1 text-xs/5 text-gray-400">
                                Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                            </p>
                        ) : (
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/30 p-1">
                                    <div className="size-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs/5 text-gray-400">Online</p>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
        </div>
    )
}


export default StudioServices