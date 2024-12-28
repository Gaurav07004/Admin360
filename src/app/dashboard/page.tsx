"use client";

import Chart from "@/components/Chart";
import RecentOrder from "@/components/RecentOrder";
import RightBar from "@/components/rightbar";

function Page() {
    return (
        <section className="flex gap-4 animate-fadeIn">
            <section className="w-[70%] flex flex-col gap-4">
                <Chart />
                <RecentOrder />
            </section>
            <section className="w-[30%] flex gap-4">
                <RightBar />
            </section>
        </section>
    );
}

export default Page;
