import React from 'react';
import { MAIN_CONFIG } from '../../Config/Main';

export default ({ id, className, color = MAIN_CONFIG.COLORS.fillBlack, width = "100", height = "100" }) => {
    return (
        <svg id={id} className={className} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 100 100">
            <defs>
                <clipPath id="clip-share">
                    <rect width="100" height="100" />
                </clipPath>
            </defs>
            <g id="share" clip-path="url(#clip-share)">
                <g id="Icon_feather-share-2" data-name="Icon feather-share-2" transform="translate(-1 -1.666)">
                    <path id="Path_7785" data-name="Path 7785" d="M77.059,20.2A13.53,13.53,0,1,1,63.53,6.667,13.53,13.53,0,0,1,77.059,20.2Z" transform="translate(13.941 0)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="6.667" />
                    <path id="Path_7786" data-name="Path 7786" d="M37.059,43.53A13.53,13.53,0,1,1,23.53,30,13.53,13.53,0,0,1,37.059,43.53Z" transform="translate(0 8.137)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="6.667" />
                    <path id="Path_7787" data-name="Path 7787" d="M77.059,66.863a13.53,13.53,0,1,1-13.53-13.53,13.53,13.53,0,0,1,13.53,13.53Z" transform="translate(13.941 16.274)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="6.667" />
                    <path id="Path_7788" data-name="Path 7788" d="M28.633,45.033l30.8,17.949" transform="translate(6.488 13.4)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="6.667" />
                    <path id="Path_7789" data-name="Path 7789" d="M59.391,21.7,28.633,39.649" transform="translate(6.488 5.251)" fill="none" stroke={color} stroke-linecap="round" stroke-linejoin="round" stroke-width="6.667" />
                </g>
            </g>
        </svg>

    );
};
