import goldMineImage from "../assets/img/Game 1 The gold mine treasure map.png";
import skylineImage from "../assets/img/Game 2 Manhattan City Skyline.png";
import wordplayImage from "../assets/img/Game 4 word play make the connection.png";
import TheGreatEscapeImage from "../assets/img/Game 5 the great escape.png";
import The_Restaurateur from '../assets/img/New-restaurateur.png'
import circuit_Boards from '../assets/img/circuit_Boards.png'

// circuit_Boards

export const GameStaticData =[
    { gamename: "The Gold Mine Treasure Map", idGame: 1, gamecompleted: 0, gameImage: goldMineImage, GameLink: `${process.env.REACT_APP_GAMES_URL}/CensioGMT/?token=`, gameVideoLink: `${process.env.REACT_APP_S3_BUCKET_URL}/assets/img/Game1.mp4` },
    { gamename: "Skyline", idGame: 2, gamecompleted: 0, gameImage: skylineImage, GameLink: `${process.env.REACT_APP_GAMES_URL}/CensioMC/?token=`, gameVideoLink: `${process.env.REACT_APP_S3_BUCKET_URL}/assets/img/Game2.mp4` },
    { gamename: "The Restaurateur", idGame: 3, gamecompleted: 0, gameImage: The_Restaurateur, GameLink: `${process.env.REACT_APP_GAMES_URL}/TheRestaurant/?token=`, gameVideoLink: `${process.env.REACT_APP_S3_BUCKET_URL}/assets/img/Game3.mp4` },
    { gamename: "Wordplay", idGame: 4, gamecompleted: 0, gameImage: wordplayImage, GameLink: `${process.env.REACT_APP_GAMES_URL}/Censiowordplay/?token=`, gameVideoLink: `${process.env.REACT_APP_S3_BUCKET_URL}/assets/img/Game4.mp4` },
    { gamename: "The Great Escape", idGame: 5, gamecompleted: 0, gameImage: TheGreatEscapeImage, GameLink: `${process.env.REACT_APP_GAMES_URL}/thegreatescape/?token=`, gameVideoLink: `${process.env.REACT_APP_S3_BUCKET_URL}/assets/img/Game5.mp4` },
    { gamename: "Circuit Boards", idGame: 6, gamecompleted: 0, gameImage: circuit_Boards, GameLink: `${process.env.REACT_APP_GAMES_URL}/CensioSlide/?token=`, gameVideoLink: `${process.env.REACT_APP_S3_BUCKET_URL}/assets/img/Game2.mp4` },

]
