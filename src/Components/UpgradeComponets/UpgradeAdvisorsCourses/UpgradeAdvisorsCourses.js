
import React from "react";
import sanglee from '../../../assets/img/sangleeMam.png'
import coolbeans from '../../../assets/img/newVoolbeans.png'
import sanam from '../../../assets/upgrade-images/upgrade_sanam.png'
import './_UpgradeAdvisorsCourses.scss'
import { Link } from "react-router-dom"

const UpgradeAdvisorsCourses = ({ isHeaderManu }) => {

   

    return (
        <>
            <main
                class="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16"
            >
                <div
                    id="main_section"
                    class={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto md:w-full lg:w-full xl:w-full 2xl:w-full 3xl:w-full"
                        : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"}
                >
                    <div class="pt-2">
                        <span
                            class="font-rubik font-semibold text-[#1A1919] text-xl md:text-2xl dark:text-[#F5F5F5]"
                        >Connect with Advisors</span>
                    </div>
                    <div
                        class="bg-white px-4 py-7 rounded-2xl flex flex-col gap-6 dark:bg-[#212121] transition-all duration-300"
                    >
                        {/* <div
                            class="border-b pb-2 border-[rgba(32, 42, 49, 0.3)] dark:border-[#656575]"
                        >
                            <span class="font-medium dark:text-[#F5F5F5]"
                            >UDC Advisors: Discuss your report with a UDC advisor</span>
                        </div> */}
                        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
                            <div
                                class="bg-[#E5EFF7] p-4 rounded-lg flex items-center gap-6 dark:bg-[#1B75BC66] transition-all duration-300"
                            >
                                <div class="w-20 h-20">
                                    <img src={sanglee} alt="" />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <span class="font-semibold font-rubik dark:text-[#F5F5F5]"
                                    >Dr. Sanglee</span>
                                    <Link
                                        class="text-sm font-rubik text-[#1B75BC] underline dark:text-[#B7B7B7]"
                                    >c.sanglee@udc.edu</Link>
                                </div>
                            </div>
                            <div
                                class="bg-[#E5EFF7] p-4 rounded-lg flex items-center gap-6 dark:bg-[#1B75BC66] transition-all duration-300"
                            >
                                <div class="w-20 h-20">
                                    <img
                                        class="w-full h-full"
                                        src={coolbeans}
                                        alt=""
                                    />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <span class="font-semibold font-rubik dark:text-[#F5F5F5]"
                                    >Mr. Coolbeans</span>
                                    <Link
                                        class="text-sm font-rubik text-[#1B75BC] underline dark:text-[#B7B7B7]"
                                    >D.coolbeans@udc.edu</Link>
                                </div>
                            </div>
                            <div
                                class="bg-[#E5EFF7] p-4 rounded-lg flex items-center gap-6 dark:bg-[#1B75BC66] transition-all duration-300"
                            >
                                <div class="w-20 h-20">
                                    <img class="w-full" src={sanam} alt="" />
                                </div>
                                <div class="flex flex-col gap-1">
                                    <span class="font-semibold font-rubik dark:text-[#F5F5F5]"
                                    >Ms. Sanam</span>
                                    <Link class="text-sm font-rubik text-[#1B75BC] underline dark:text-[#B7B7B7]" >L.sanam@udc.edu</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}


export default UpgradeAdvisorsCourses