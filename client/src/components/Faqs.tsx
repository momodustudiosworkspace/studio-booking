"use client"
import React, { useState } from 'react'
import { BaseIcons } from '@/assets/icons/BaseIcons';
import SectionHeader from './SectionHeader';

const Faqs = () => {
    const [selectedFaq, setSelectedFaq] = useState<number | null>(null)
    const FAQS: {
        id: number;
        question: string;
        answer: string
    }[] = [
            {
                id: 1,
                question: 'How do I book a photoshoot?',
                answer: 'You can book directly on our website in just a few clicks. Select your service, choose a date and time, make your payment, and you’re all set!'
            },
            {
                id: 2,
                question: 'Can I reschedule my session?',
                answer: 'You can book directly on our website in just a few clicks. Select your service, choose a date and time, make your payment, and you’re all set!'
            },
            {
                id: 3,
                question: 'How long will it take to get my pictures?',
                answer: 'You can book directly on our website in just a few clicks. Select your service, choose a date and time, make your payment, and you’re all set!'
            },
            {
                id: 4,
                question: 'Can I request edits on my photos?',
                answer: 'You can book directly on our website in just a few clicks. Select your service, choose a date and time, make your payment, and you’re all set!'
            },
            {
                id: 5,
                question: 'Do you travel for shoots?',
                answer: 'You can book directly on our website in just a few clicks. Select your service, choose a date and time, make your payment, and you’re all set!'
            },
        ]
    return (
        <div>
            <SectionHeader
                badgeText="FAQs"
                badgeWidth="w-[120px]"
                headerText="Quick answers to the questions we get asked the most." />
            <div className='flex flex-col gap-10 justify-center mt-10'>
                {FAQS.map((faq, key) => {
                    return <div className='border-b-[1px] pb-3 border-[#CCCCCC]' key={key}>

                        <button className='w-full flex items-center justify-between' onClick={() => setSelectedFaq(faq.id)}>

                            <p className='font-bold'>{faq.question}</p>
                            {
                                selectedFaq === faq.id ?
                                    <BaseIcons value='arrow-up-solid' /> : <BaseIcons value='arrow-down-solid' />
                            }
                        </button>

                        {selectedFaq === faq.id ? <div className='mt-2'>{faq.answer}</div> : ''}


                    </div>
                })}
            </div>
        </div>
    )
}

export default Faqs