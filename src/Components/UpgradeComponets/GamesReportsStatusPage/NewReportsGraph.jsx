import React, { useEffect, useState } from "react";
import './_NewReportsGraph.scss'
import Loader from "../../CommonComponent/Loader/Loader";

const NewReportsGraph = ({ mainGamesData }) => {


    const [graphData, setGraphData] = useState([])

    const filterEmptyArray = (array) => {
        const filteredData = array?.filter(item => item !== null && (!Array.isArray(item) || item.length > 0));
        setGraphData(filteredData) 
    }
   
    useEffect(() => {

        if (mainGamesData?.bar_values) {
            filterEmptyArray(mainGamesData?.bar_values)
        }

    }, [mainGamesData?.bar_values])

    return (
        <>
            <div
                class="resilience_chart py-14 px-2 relative items-center justify-center bg-white rounded-2xl dark:bg-[#212121] transition duration-300"
            >

                {mainGamesData && mainGamesData?.bar_values && graphData ?
                    graphData.map((labels, index) => {
                        return (
                            <div className="d-flex align-center">
                                <div className="w-[15%]">
                                    <div className="text-xs text-right px-2 font-semibold break-all">
                                        {index === 0 ? <div className="" >{labels?.node_name?.toUpperCase()}</div> : labels?.node_name}
                                    </div>
                                </div>
                                <div className="w-[85%] border-s">
                                    <div className="flex relative align-center">
                                        <div className="border-e w-[10%] py-10">
                                        </div>
                                        <div className="border-e w-[10%] py-10"></div>
                                        <div className="border-e w-[10%] py-10"></div>
                                        <div className="border-e w-[10%] py-10"></div>
                                        <div className="border-e w-[10%] py-10"></div>
                                        <div className="border-e w-[10%] py-10"></div>
                                        <div className="border-e w-[10%] py-10"></div>
                                        <div className="border-e w-[10%] py-10"></div>
                                        <div className="border-e w-[10%] py-10"></div>
                                        <div className="border-e w-[10%] py-10"> </div>
                                        <div className="absolute w-100 bg-[#f4f6f7] flex">
                                            <div className={`bg-[#4472c4] w-[${labels?.value?.LOW}%] h-[25px]`}>

                                            </div>
                                            <div className={`bg-[#ed7d31] w-[${labels?.value?.MEDIUM}%]`}>

                                            </div>
                                            <div className={`bg-[#a5a5a5] w-[${labels?.value?.HIGH}%]`}>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                    :
                    <Loader />
                }
                {/* <div className="d-flex align-center">
                    <div className="w-[15%]">
                        <div className="text-sm text-end px-2 break-all">
                        Active
                        </div>
                    </div>
                    <div className="w-[85%] border-s">
                        <div className="flex relative align-center">
                            <div className="border-e w-[10%] py-10">
                            </div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"> </div>
                            <div className="absolute w-100 bg-[#f4f6f7] flex">
                                <div className="bg-[#4472c4] w-[33.33%] h-[25px]">
                                    
                                </div>
                                <div className="bg-[#ed7d31] w-[33.33%]">
                                    
                                </div>
                                <div className="bg-[#a5a5a5] w-[33.33%]">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-center">
                    <div className="w-[15%]">
                        <div className="text-sm text-end px-2 break-all">
                        Preservance
                        </div>
                    </div>
                    <div className="w-[85%] border-s">
                        <div className="flex relative align-center">
                            <div className="border-e w-[10%] py-10">
                            </div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"> </div>
                            <div className="absolute w-100 bg-[#f4f6f7] flex">
                                <div className="bg-[#4472c4] w-[33.33%] h-[25px]">
                                    
                                </div>
                                <div className="bg-[#ed7d31] w-[33.33%]">
                                    
                                </div>
                                <div className="bg-[#a5a5a5] w-[33.33%]">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex align-center">
                    <div className="w-[15%]">
                        <div className="text-sm text-end px-2 break-all">
                        Preservance
                        </div>
                    </div>
                    <div className="w-[85%] border-s">
                        <div className="flex relative align-center">
                            <div className="border-e w-[10%] py-10">
                            </div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"></div>
                            <div className="border-e w-[10%] py-10"> </div>
                            <div className="absolute w-100 bg-[#f4f6f7] flex">
                                <div className="bg-[#4472c4] w-[33.33%] h-[25px]">
                                    
                                </div>
                                <div className="bg-[#ed7d31] w-[33.33%]">
                                    
                                </div>
                                <div className="bg-[#a5a5a5] w-[33.33%]">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {
                    mainGamesData && mainGamesData?.bar_values &&
                    <>
                        <div className="flex relative align-center">
                            <div className="w-[14%] block">

                            </div>
                            <div className="w-[85%]">
                                <div className="flex">
                                    <div className="w-[10%] text-sm text-center">
                                        0%
                                    </div>
                                    <div className="w-[10%] text-sm text-center">
                                        10%
                                    </div>
                                    <div className="w-[10%] text-sm text-center">
                                        20%
                                    </div>
                                    <div className="w-[10%] text-sm text-center">
                                        30%
                                    </div>
                                    <div className="w-[10%] text-sm text-center">
                                        40%
                                    </div>
                                    <div className="w-[10%] text-sm text-center">
                                        50%
                                    </div>
                                    <div className="w-[10%] text-sm text-center">
                                        60%
                                    </div>
                                    <div className="w-[10%] text-sm text-center">
                                        70%
                                    </div>
                                    <div className="w-[10%] text-sm text-center">
                                        80%
                                    </div>
                                    <div className="w-[10%] text-sm text-center">
                                        90%
                                    </div>
                                    <div className="w-[10%] text-sm text-center">
                                        100%
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center text-sm pt-6">
                            <div className="px-2 flex align-center">
                                <div className="h-[8px] w-[8px] me-2 bg-[#4472c4]"></div> Developing
                            </div>
                            <div className="px-2 flex align-center">
                                <div className="h-[8px] w-[8px] me-2 bg-[#ed7d31]"></div> Developing
                            </div>
                            <div className="px-2 flex align-center">
                                <div className="h-[8px] w-[8px] me-2 bg-[#a5a5a5]"></div> Developing
                            </div>
                        </div>
                    </>
                }


            </div>

        </>
    )
}

export default NewReportsGraph