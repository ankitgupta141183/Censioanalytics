
// -------------------------------------------------

import React, { useRef } from 'react';
import domtoimage from 'dom-to-image';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Register the fonts with pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PrintTesting = () => {
    const componentRef = useRef(null);

    const handleDownload = () => {
        const element = componentRef.current;

        // Capture the component as an image
        domtoimage.toPng(element)
            .then((dataUrl) => {
                // Convert the image to a PDF
                const docDefinition = {
                    content: [
                        {
                            image: dataUrl,
                            width: 500 // Adjust the width as needed
                        }
                    ]
                };

                // Generate and download the PDF
                pdfMake.createPdf(docDefinition).download('component_pdf.pdf');
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
            });
    };

    return (
        <div>
            <div ref={componentRef}>
                {/* Your component content */}
                <main
                        class="max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16"
                    >
                        <div
                            id="main_section"
                            class="flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"
                        >
                            <div class="pt-2">
                                <span
                                    class="font-rubik font-semibold text-xl text-[#1A1919] md:text-2xl dark:text-[#F5F5F5]"
                                >Games & Survey</span
                                >
                            </div>

                            <div
                                class="bg-white p-6 rounded-2xl dark:bg-[#212121] transition-all duration-300"
                            >
                                <div class="py-2 flex flex-col gap-3">
                                    <span
                                        class="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]"
                                    >Lorem Ipsum</span
                                    >
                                    <div
                                        class="hr w-full h-0.5 bg-[#202A31] opacity-25 dark:bg-[#CED8DF] transition-all duration-300"
                                    ></div>
                                </div>
                                <div
                                    class="grid gap-6 grid-cols-1 py-6 md:grid-cols-2 lg:grid-cols-3"
                                >
                                    <div
                                        class="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40"
                                    >
                                        <span
                                            class="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]"
                                        >Game 1</span
                                        >
                                        <span class="text-[#656575] font-rubik dark:text-[#B7B7B7]"
                                        >Lorem Ipsum</span
                                        >
                                    </div>
                                    <div
                                        class="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40"
                                    >
                                        <span
                                            class="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]"
                                        >Game 1</span
                                        >
                                        <span class="text-[#656575] font-rubik dark:text-[#B7B7B7]"
                                        >Lorem Ipsum</span
                                        >
                                    </div>
                                    <div
                                        class="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40"
                                    >
                                        <span
                                            class="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]"
                                        >Game 1</span
                                        >
                                        <span class="text-[#656575] font-rubik dark:text-[#B7B7B7]"
                                        >Lorem Ipsum</span
                                        >
                                    </div>
                                    <div
                                        class="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40"
                                    >
                                        <span
                                            class="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]"
                                        >Game 1</span
                                        >
                                        <span class="text-[#656575] font-rubik dark:text-[#B7B7B7]"
                                        >Lorem Ipsum</span
                                        >
                                    </div>
                                    <div
                                        class="pt-6 pl-6 h-28 bg-[#E5EFF7] flex flex-col gap-1 rounded-lg dark:bg-[#1B75BC66] transition-all duration-300 md:h-40"
                                    >
                                        <span
                                            class="text-[#1A1919] font-rubik font-medium dark:text-[#F5F5F5]"
                                        >Game 1</span
                                        >
                                        <span class="text-[#656575] font-rubik dark:text-[#B7B7B7]"
                                        >Lorem Ipsum</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <div class="pb-10 flex flex-col gap-3">
                                <div class="py-2">
                                    <span
                                        class="font-medium font-rubik text-[#1A1919] dark:text-[#F5F5F5]"
                                    >Student Experience & Expectations Survey</span
                                    >
                                </div>

                                <div
                                    class="py-4 px-6 bg-[#FDFDFD] relative shadow-md rounded-l-sm rounded-r-lg flex flex-col gap-1 dark:bg-[#212121] transition-all duration-300"
                                >
                                    <span
                                        class="w-3 h-full absolute bg-[#7D7D7D] rounded-sm left-0 top-0 transition-all duration-300 dark:bg-[#7D7D7D]"
                                    ></span>
                                    <span
                                        class="font-semibold font-rubik text-[#1A1919] dark:text-[#F5F5F5]"
                                    >Lorem ipsum dolor sit amet</span
                                    >
                                    <span class="text-[#656575] font-rubik dark:text-[#B1B1B1]"
                                    >Lorem ipsum dolor sit amet</span
                                    >
                                </div>
                            </div>
                        </div>
                    </main>

            </div>
            <center><button onClick={handleDownload}>Download Component as PDF</button></center>
        </div>
    );
};

export default PrintTesting;
