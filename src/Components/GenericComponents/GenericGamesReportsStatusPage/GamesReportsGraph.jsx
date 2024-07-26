import React, { useEffect, useState } from "react";
import Loader from "../../CommonComponent/Loader/Loader";


const GamesReportsGraph = ({ gamesAttribute, mainGamesData }) => {

    const [grapData, setGraphData] = useState([])

    console.log("mainGamesData-- graph00", mainGamesData)
    const filterEmptyArray = (array) => {
        // let filteredArray = array?.filter(item => !Array.isArray(item) || item.length > 0)
        const filteredData = array?.filter(item => item !== null && (!Array.isArray(item) || item.length > 0));
        setGraphData(filteredData)
        console.log('filteredArray--', filteredData)
    }



    useEffect(() => {

        if (mainGamesData?.bar_values) {
            filterEmptyArray(mainGamesData?.bar_values)
        }

    }, [mainGamesData?.bar_values])


    return (
        <>
            <div
                className="resilience_chart py-14 pr-8 align-center relative items-center justify-center bg-white rounded-2xl dark:bg-[#212121] transition duration-300"
            >

                {/* <div
                    className="resilience_txt p-6 bg-white rounded-2xl flex flex-col gap-4 dark:bg-[#212121] transition duration-300"
                >
                    <span className="text-sm md:text-base text-[#1A1919] dark:text-[#F5F5F5] font-medium">
                        {mainGamesData ? mainGamesData?.game_attribute.toUpperCase() : ""}
                    </span>
                </div> */}

                <div className="">
                    {
                        mainGamesData && mainGamesData?.bar_values && grapData ?
                            grapData?.map((labels, index) => {
                                return <>
                                    {console.log("labels--", labels, 'index-', index)}
                                    {/* {console.log("mainGamesData.bar_values[0] --", mainGamesData.bar_values , 'index-',index)} */}
                                    <div className="flex">
                                        <div className="max-w-[30%] w-[30%] border-r border-[#CCCCCC] border-dashed px-2">
                                            <div className="text-xs text-right font-semibold pt-4 break-all">{
                                                // labels.node_name ?   labels.node_name.toUpperCase() : ""
                                                index === 0 ? <div className="" >{labels?.node_name?.toUpperCase()}</div> : labels?.node_name
                                            }</div>
                                        </div>
                                        <div className="max-w-[90%] w-[90%] flex max-w-[100%] relative">
                                            <div className="border-r border-[#CCCCCC] border-dashed max-w-[33%] w-[33%] h-[100%] flex py-8"></div>
                                            <div className="border-r border-[#CCCCCC] border-dashed max-w-[33%] w-[33%] h-[100%] flex py-8"></div>
                                            <div className="border-r border-[#CCCCCC] border-dashed max-w-[33%] w-[33%] h-[100%] flex py-8"></div>
                                            <ul
                                                className="absolute top-[20%] lg:top-[22%] xl:top-[30%] 2xl:top-[30%] 3xl:top-[28%] w-full flex flex-col gap-[44px] pr-1"
                                            >
                                                <li
                                                    className="h-3 w-[100%] 3xl:w-[100%] ml-auto rounded-full bg-gradient-to-l from-[#1B75BCCC] to-[#ECF7FFCC] relative flex items-center"
                                                >

                                                    <div
                                                        className={`absolute left-[${labels?.value?.LOW ? labels?.value?.LOW : labels?.value?.MEDIUM ? labels?.value?.MEDIUM : labels?.value?.HIGH ? labels?.value?.MEDIUM : '0'}%] h-5 w-5 bg-[#1B75BC] rounded-full`}
                                                    ></div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </>
                            })
                            :
                            <Loader />

                    }
                    {
                        mainGamesData && mainGamesData?.bar_values &&
                        <>
                            <div className="flex">
                                <div className="max-w-[30%] w-[30%] px-2">

                                </div>
                                <div className="max-w-[90%] w-[90%] flex max-w-[100%] relative text-xs">
                                    <div className="w-[33%] max-w-[33%] h-[100%] break-all py-8 px-1 justify-center">DEVELOPING</div>
                                    <div className="w-[33%] max-w-[33%] h-[100%] break-all py-8 px-1 justify-center">INTERMEDIATE</div>
                                    <div className="w-[33%] max-w-[33%] h-[100%] break-all py-8 px-1 justify-center">PROFICIENT</div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}


export default GamesReportsGraph