import Image from 'next/image'
import React from 'react'
import Stats from './Stats'

const Collaborations = () => {
    return (

        <div className="bg-gray-300 relative py-24 sm:py-32 sm:h-[900] bg-fixed bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: "url('/home-fixed-bg.jpg')" }}>
            <div className='h-full w-full absolute bg-black/50 top-0'></div>
            <div className="mx-auto z-10 relative max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-lg/8 font-semibold text-white capitalize">Trusted by many brands</h2>
                <div className="mx-auto mb-40 mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <Image
                        alt="Transistor"
                        src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-white.svg"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    />

                    <Image
                        alt="Reform"
                        src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-white.svg"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    />

                    <Image
                        alt="Tuple"
                        src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-white.svg"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    />

                    <Image
                        alt="SavvyCal"
                        src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-white.svg"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                    />

                    <Image
                        alt="Statamic"
                        src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-white.svg"
                        width={158}
                        height={48}
                        className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                    />
                </div>
                <div className=''>
                    <Stats />
           </div>
            </div>
        </div>
    )
}


export default Collaborations