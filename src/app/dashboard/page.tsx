"use client";

import React from 'react'
import Chart from '@/components/Chart'
import RecentOrder from '@/components/RecentOrder'
import RightBar from '@/components/rightbar'

function Page() {
    return (
        <section className='flex gap-5'>
            <section className='w-[70%] flex flex-col gap-5'>
                <Chart />
                <RecentOrder />
            </section>
            <section className='w-[30%] flex gap-5'>
                <RightBar />
            </section>
        </section>
    )
}

export default Page 