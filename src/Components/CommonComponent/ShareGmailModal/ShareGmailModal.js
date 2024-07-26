import React from "react";
import Attachment from '../../../assets/upgrade-images/Attachement.svg'
import ProfileOptions from "../../CommonComponent/StaticData/ProfileOptions";
import { useParams } from 'react-router';
import './ShareGmailModal.scss'
const ShareGmailModal = ({ setShowShareModal, handleOnChange = () => { }, handlePrintAndDownload = () => { }  , setShareData , handelSendEmailDetails = () =>{ } ,gamesPagesShow }) => {
    const { game_id } = useParams()

    const handleClose = () => {
        setShowShareModal(false)
        setShareData(ProfileOptions.sharingDetails)
    }

    return (
        <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 fixed top-0 left-0 right-0 z-50 h-100 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex" role="dialog" aria-modal="true">
            <div className="relative w-[40%]">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" onClick={(e) => { handleClose(e) }} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white px-6 py-4 border-b">Please enter sharing details below</h3>
                    <div className="px-6 py-6 lg:px-8">
                        <form className="space-y-6" onSubmit={(e)=>{handelSendEmailDetails(e)}}>
                            <div className="mt-3">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Send To</label>
                                <input type="email" name="mail"
                                    onChange={(e) => { handleOnChange(e) }}
                                    id="email" className="text-area-border m-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                                <input type="text" name="subject"
                                    defaultValue={`Games report ${game_id} PDF.`}
                                    onChange={(e) => { handleOnChange(e) }}
                                    disabled={true}
                                    id="text" placeholder="type subject" className="text-area-border rounded bg-[#BDBDBD] cursor-not-allowed   m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                                <textarea type="textarea" name="message"
                                    onChange={(e) => { handleOnChange(e) }}
                                    id="textarea" placeholder="type message" className="text-area-border m-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                            </div>
                            <div className=" text-sm flex gap-3 font-medium text-gray-900 dark:text-gray-300">
                                <span > <img src={Attachment} alt="Attachment logo"  /> </span>  <span className="pt-2">Attached file</span>
                                <p className="pt-2 text-blue-700 hover:underline dark:text-blue-500 cursor-pointer"
                                    onClick={(e) => { handlePrintAndDownload(e, "view") }}
                                    title="view file"
                                >
                                    {`games_report_${gamesPagesShow}.pdf`}</p>
                            </div>
                            <button title="share" type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Share</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareGmailModal


