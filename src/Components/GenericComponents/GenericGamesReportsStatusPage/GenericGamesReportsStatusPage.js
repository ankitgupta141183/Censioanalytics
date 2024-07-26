import React from "react";
import './_GenericGamesReportsStatusPage.scss'
import { useParams } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { useEffect } from "react";
import GamesReportsStatusOne from "./GamesReportsStatusOne";
import GamesReportsStatusTwo from "./GamesReportsStatusTwo";
import GamesReportsStatusThree from "./GamesReportsStatusThree";
import GamesReportsStatusFour from "./GamesReportsStatusFour";
import GamesReportsStatusFive from "./GamesReportsStatusFive";
import download from '../../../assets/upgrade-images/download.svg'
import print from '../../../assets/upgrade-images/print.svg'
import share from '../../../assets/upgrade-images/share.svg'
import domtoimage from 'dom-to-image';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { fetchGamesReportsStatus } from '../../../Services/UpgradeDashboardServices/UpgradeDashboardServices'
import ShareGmailModal from "../../CommonComponent/ShareGmailModal/ShareGmailModal";
import ProfileOptions from "../../CommonComponent/StaticData/ProfileOptions";
import { showNotification } from "../../../Actions/componentActions";
import { sendEmailDetails } from '../../../Services/CommonServices/CommonServices'


// Register the fonts with pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;



const GenericGamesReportsStatusPage = ({ isHeaderManu, gamesId }) => {
  const profileDetail = useSelector(state => (state.profileReducer.profileDetail?.data?.user));
  const { reportsStatus } = useSelector(state => state?.gamesReportsStatusReducers)
  const [fullName, setFullname] = useState("")
  const [gamesPagesShow, setGamesPagesShow] = useState("1")
  const { game_id } = useParams()
  const currentDate = new Date((reportsStatus && reportsStatus?.data && reportsStatus?.data?.date) || new Date());
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const gamesReportsPage = useRef(null)
  const [mainGamesData, setMainGamesData] = useState([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [isPdfGenerating, setIsPdfGenerating] = useState(false)
  const [shareData, setShareData] = useState(ProfileOptions.sharingDetails)

  const dispatch = useDispatch()
  useEffect(() => {
    setFullname(profileDetail?.first_name + " " + profileDetail?.last_name)
  }, [profileDetail])

  useEffect(() => {
    setMainGamesData([reportsStatus?.data])
    // setMainGamesData([staticObjOne])

  }, [reportsStatus?.data])

  useEffect(() => {
    dispatch(fetchGamesReportsStatus(game_id))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setShareData({
      ...shareData, fileName: `games_report_${gamesPagesShow}.pdf`,
      subject: `Game report ${gamesPagesShow} PDF.`
    })
    // eslint-disable-next-line
  }, [gamesPagesShow])

  useEffect(() => {
    if (gamesId) {
      setGamesPagesShow(gamesId)
    } else {
      setGamesPagesShow(game_id)
    }
    // eslint-disable-next-line
  }, [gamesPagesShow, gamesId])


  const handleOnChange = (e) => {
    setShareData({ ...shareData, [e.target.name]: e.target.value })
  }

  console.log("shareData--",shareData)

  const handlePrintAndDownload = (e, type) => {
    setIsPdfGenerating(true)
    const element = gamesReportsPage.current;
    const originalVisibility = element.style.visibility;
    element.style.visibility = 'visible';
    domtoimage.toPng(element)
      .then((dataUrl) => {
        const docDefinition = {
          content: [
            {
              image: dataUrl,
              width: 500 // Adjust the width as needed
            }
          ]
        };
        if (type === "download") {
          pdfMake.createPdf(docDefinition).download('games_report.pdf');
          setIsPdfGenerating(false)
        }
        else if (type === "view") {
          pdfMake.createPdf(docDefinition).open()
          setIsPdfGenerating(false)
        }
        else if (type === "share") {
          setIsPdfGenerating(false)
          setShowShareModal(true)
          let baseBlob = pdfMake.createPdf(docDefinition)
          baseBlob.getBase64((base64) => {
            console.log('base64', base64)
            setShareData({ ...shareData, base64Url: base64 })
          })
        }
        else {
          pdfMake.createPdf(docDefinition).print();
          setIsPdfGenerating(false)
        }
      })
      .catch((error) => {
        setIsPdfGenerating(false)
        console.error('Error generating PDF:', error);
      })
      .finally(() => {
        element.style.visibility = originalVisibility;
      });
  };

  const handelSendEmailDetails = async (e) => {
    e.preventDefault()
    setShowShareModal(false)
    let mailTransferDetails = {
      mail_id: shareData.mail,
      subject: shareData.subject,
      message: shareData.message,
      base64_url: shareData.base64Url,
      file_name:shareData.fileName
    }
    
    let getIsMailDropped = await sendEmailDetails(mailTransferDetails)
    if (getIsMailDropped?.status === 200 && getIsMailDropped?.status !== 422) {
      setShareData({
        ...shareData,
        mail:"",
        base64Url:"",
        message:""
      })
      dispatch(showNotification(true, getIsMailDropped?.data ? getIsMailDropped?.data?.message : "Successfully !!!", "success"))
    } else {
      dispatch(showNotification(true, "Somthing went wrong."))
    }
  }

  return (
    <>

      <main className="talwind-dashboard max-w-sm mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[calc(100vw-80px)] md:max-w-[calc(100vw-80px)] md:pl-16">

        <div
          id="main_section"
          className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto md:w-full lg:w-full xl:w-full 2xl:w-full 3xl:w-full"
            : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"}>
          <div ref={gamesReportsPage} className="mainHidden-container" style={{ visibility: 'visible' }} >
            <div class="pt-2">
              <span class="font-rubik font-semibold text-xl text-[#1A1919] md:text-2xl dark:text-[#F5F5F5]">Reports</span>
            </div>


            <div className="report_details flex flex-col gap-6" id="report_details">
              <ul
                className="contents_details p-6 bg-[#FFFFFF] rounded-2xl grid grid-cols-2 lg:flex items-center gap-6 lg:gap-16 dark:bg-[#212121] transition duration-300"
              >
                <li>
                  <span
                    className="text-[#1A1919] dark:text-[#F5F5F5] font-medium text-sm">Name:</span>
                  <span className="text-[#1A1919] dark:text-[#F5F5F5] text-sm"> {"  " + fullName}</span>
                </li>
                <li>
                  <span
                    className="text-[#1A1919] dark:text-[#F5F5F5] font-medium text-sm">Date: </span>
                  <span className="text-[#1A1919] dark:text-[#F5F5F5] text-sm">{formattedDate}</span>
                </li>
                <li>
                  <span
                    className="text-[#1A1919] dark:text-[#F5F5F5] font-medium text-sm">Attribute:  </span>
                  <span className="text-[#1A1919] dark:text-[#F5F5F5] text-sm">
                    {mainGamesData[0]?.game_attribute ? mainGamesData[0]?.game_attribute : ""}
                  </span>
                </li>
                <li>
                  <span
                    className="text-[#1A1919] dark:text-[#F5F5F5] font-medium text-sm">Overall Level:</span>
                  <span className="text-[#1A1919] dark:text-[#F5F5F5] text-sm">

                    {
                      mainGamesData[0]?.user_result === "HIGH" ? " PROFICIENT" : mainGamesData[0]?.user_result === "MEDIUM" ? " INTERMEDIATE" : mainGamesData[0]?.user_result === "LOW" ? " DEVELOPING" : " DEVELOPING"
                    }
                  </span>
                </li>
                {!isPdfGenerating && <>
                  <li className="">
                    <span class="font-rubik font-semibold text-xl text-[#1A1919] md:text-2xl dark:text-[#F5F5F5]">
                      <img
                        className="dark:invert"
                        src={download}
                        alt="download icon"
                        onClick={(e,) => { handlePrintAndDownload(e, 'download') }}
                      />
                    </span>
                  </li>
                  <li>
                    <span class="font-rubik font-semibold text-xl text-[#1A1919] md:text-2xl dark:text-[#F5F5F5]">
                      <img
                        className="dark:invert"
                        src={print}
                        alt="print icon"
                        onClick={(e) => { handlePrintAndDownload(e, 'print') }}
                      />
                    </span>
                  </li>
                  <li>
                    <span class="font-rubik font-semibold text-xl text-[#1A1919] md:text-2xl dark:text-[#F5F5F5]">
                      <img
                        className="dark:invert"
                        src={share}
                        alt="share icon"
                        onClick={(e) => { handlePrintAndDownload(e, 'share') }}
                      />
                    </span>
                  </li>
                </>}
              </ul>

              {
                gamesPagesShow === "2" ?
                  <GamesReportsStatusTwo
                    yourResult={mainGamesData[0]?.user_result || ""}
                    gamesAttribute={mainGamesData[0]?.game_attribute || ""}
                    mainGamesData={mainGamesData[0] || ""}
                  />
                  : gamesPagesShow === "3" ?
                    <GamesReportsStatusThree
                      mainGamesData={mainGamesData[0] || ""}
                      yourResult={mainGamesData[0]?.user_result || ""}
                    />
                    : gamesPagesShow === "4" ?
                      <GamesReportsStatusFour
                        mainGamesData={mainGamesData[0] || ""}
                        yourResult={mainGamesData[0]?.user_result || ""}
                      />
                      :
                      gamesPagesShow === "5" ?
                        <GamesReportsStatusFive
                          mainGamesData={mainGamesData[0] || ""}
                          yourResult={mainGamesData[0]?.user_result || ""}
                        />
                        : <GamesReportsStatusOne
                          yourResult={mainGamesData[0]?.user_result || ""}
                          mainGamesData={mainGamesData[0] || ""}
                        />
              }
              {/* <GamesReportsStatusOne/> */}
              {/* <GamesReportsStatusTwo/> */}
              {/* <GamesReportsStatusThree/> */}
              {/* <GamesReportsStatusFour/> */}
              {/* // <GamesReportsStatusFive/> */}


            </div>
          </div>
          {
             showShareModal &&
             <ShareGmailModal
               setShowShareModal={setShowShareModal}
               handleOnChange={handleOnChange}
               handlePrintAndDownload={handlePrintAndDownload}
               setShareData={setShareData}
               handelSendEmailDetails={handelSendEmailDetails}
               gamesPagesShow={gamesPagesShow}
             />
          }
        </div>
      </main>
    </>
  )
}


export default GenericGamesReportsStatusPage