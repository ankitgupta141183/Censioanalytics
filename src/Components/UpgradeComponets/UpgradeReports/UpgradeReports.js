
import React, { useRef } from "react";
// import print from '../../../assets/upgrade-images/print.svg'
// import download from '../../../assets/upgrade-images/download.svg'
// import share from '../../../assets/upgrade-images/share.svg'
import './_UpgradeReports.scss'
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGamesReportsStatus } from '../../../Services/UpgradeDashboardServices/UpgradeDashboardServices'
import { showNotification } from "../../../Actions/componentActions";
// import domtoimage from 'dom-to-image';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Register the fonts with pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const UpgradeReports = ({ isHeaderManu }) => {

    const gamesDetails = useSelector(state => state.gamesDetailsReducer.games)
    const history = useHistory()
    const dispatch = useDispatch()
    // const [gamesId, setGamesId] = useState('1')
    const testRef = useRef()

    
    // function openGmail(email) {
            // const attachmentUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Replace with your attachment URL
            // const recipient = 'recipient@example.com'; // Replace with the recipient's email address
            // const subject = 'Email subject';
            // const body = 'Email body';

            // const url = `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${body}\n\nAttachment: ${attachmentUrl}`)}`;
            // window.open(url);

    // }

    
    const redirectGamesReportsStatus = (e, gameId) => {
        getGamesReportsStatus(gameId)
    }

    const getGamesReportsStatus = async (gameId) => {
        let reporstStatus =  await dispatch(fetchGamesReportsStatus(gameId))
        if (reporstStatus.status === 200 && reporstStatus.data.status !== 422) {
            history.push(`/upgrade-games-reports/${gameId}`)

        } else {
            dispatch(showNotification(true, reporstStatus?.data? reporstStatus?.data?.message  :  "No report generated for this game."))
        }
    }


    return (
        <>
            <main
                className="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16"
            >
                <div
                    id="main_section"
                    className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto md:w-full lg:w-full xl:w-full 2xl:w-full 3xl:w-full"
                        : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"}
                >
                    <div className="pt-2">
                        <span className="font-rubik font-semibold text-xl text-[#1A1919] md:text-2xl dark:text-[#F5F5F5]">Your Reports</span>
                    </div>
                    <div ref={testRef} >
                        <div className="pb-3">
                        </div>
                        <div
                            className="p-6 w-full bg-white rounded-2xl dark:bg-[#212121] transition duration-300"
                        >
                            <table className="w-full">
                                <thead
                                    className="border-b-[1px] border-rgba(32,42,49,0.3) dark:border-[#656575]"
                                >
                                    <th className="pb-4"></th>
                                    <th className="pb-4"></th>
                                </thead> 
                                <tbody>
                                    {
                                        gamesDetails.map((games, index) => {
                                            return <>
                                                <tr>
                                                    <td className="text-center p-4 dark:text-[#F5F5F5]">Game {games.idGame}</td>
                                                    <td className="text-center p-4">
                                                        <Link className="underline text-[#1B75BC]"
                                                            onClick={(e) => { redirectGamesReportsStatus(e, games.idGame) }}
                                                        >
                                                            View file</Link>
                                                    </td>
                                                </tr>
                                            </>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
            {/* <div ref={gamesReportsPage} className="mainHidden-container" style={{ visibility: 'hidden' }}  >
                <GamesReportsStatusPage
                    gamesId={gamesId}
                />       
             </div> */}
        </>
    )
}


export default UpgradeReports