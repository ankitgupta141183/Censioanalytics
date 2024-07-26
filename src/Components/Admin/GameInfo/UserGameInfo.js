import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Loader } from 'semantic-ui-react';
import './UserGameInfo.scss';
import { CSVDownload } from 'react-csv';
import { SignatureExpired } from "../../../Actions/AuthAction";
import { useDispatch } from "react-redux";
import AdminCommonTable from "../AdminCommanTable/AdminCommonTable";
const UserGameInfo = () => {
    const history = useHistory()
    const StateData = useLocation();
    const [GameData, setGameData] = useState([])
    const [DownLoadCSV, setDownloadCsv] = useState(false)
    const [GameDataShow, setGameDataShow] = useState("The Gold Mine Treasure Map")
    const [isLoading, setIsLoading] = useState(true)
    // const [GameDataMessage , setGameDataMessage] = useState("")
    const dispatch = useDispatch()

    var apiUrl = global.platformURI;

    const DynamicColumns = useMemo(() => {
        const DYColumns = Object.keys(GameData[0] ?? {})
        const RemoveColums = DYColumns.length > 0 ? DYColumns.filter((val) => val !== "Game1_User_Log") : []
        const replaceWord = GameDataShow === "The Gold Mine Treasure Map" ? "G1 " : GameDataShow === "Skyline" ? "G2 " : GameDataShow === "The Restaurateur" ? "G3 " : GameDataShow === "Wordplay" ? "G4 " : GameDataShow === "The Great Escape" ? "G5 " : "G1 "
        return RemoveColums.map((key, index) => {
            return (
                {
                    Header: key.replace(replaceWord, ""),
                    Value: key
                }
            )
        })
        // eslint-disable-next-line
    }, [GameData])

    function getGameData(gameId) {
        setIsLoading(true)
        setGameData([])
        return axios.get(apiUrl + `/api/v1/games/?game_id=${gameId}`, { params: { user_id: StateData.state.uuid } }).then(response => {
            // setOrgData(response.data);
            if (response.data.status === 401) {
                console.log(response.data.message , "response.data.message");
                // setGameDataMessage(response.data.message)
                setGameData([])
                setIsLoading(false)
            } else {
                if(response.data.games.length === 0){
                    // setGameDataMessage(response.data.message)
                }
                setGameData(response.data.games)
                setIsLoading(false)
            }
        })
            .catch((error) => {
                if (error.response.data.errors === "Signature has expired") {
                    dispatch(SignatureExpired("Signature has expired"))
                }
                console.log("else run admin");
            }
            );
    }
    useEffect(() => {

        if (StateData.state === undefined) {
            history.push("/admin")
        } else {
            getGameData(1)
            // setDownloadCsvFile(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const dateFunction = (fetcheddate) => {
    //     const lastUpdate = new Date(fetcheddate)
    //     const Year = lastUpdate.getFullYear()
    //     let Month = lastUpdate.getMonth() + 1
    //     let date = lastUpdate.getDate()
    //     let Hours = lastUpdate.getHours()
    //     let Minutes = lastUpdate.getMinutes()
    //     let Sec = lastUpdate.getSeconds()
    //     if (Month < 10) {
    //         Month = `0${Month}`;
    //     }
    //     if (date < 10) {
    //         date = `0${date}`;
    //     }
    //     if (Hours < 10) {
    //         Hours = `0${Hours}`;
    //     }
    //     if (Minutes < 10) {
    //         Minutes = `0${Minutes}`;
    //     }
    //     if (Sec < 10) {
    //         Sec = `0${Sec}`;
    //     }
    //     const LastUpdateTime = Year + "/" + Month + "/" + date + "  " + Hours + ":" + Minutes + ":" + Sec
    //     return LastUpdateTime
    // }

    const handleChange = (e) => {

        setGameDataShow(e.target.value)
        if (e.target.value === "The Gold Mine Treasure Map") {
            getGameData(1)
        } else if (e.target.value === "Skyline") {
            getGameData(2)
        } else if (e.target.value === "The Restaurateur") {
            getGameData(3)
        } else if (e.target.value === "Wordplay") {
            getGameData(4)
        } else if (e.target.value === "The Great Escape") {
            getGameData(5)
        }
        setGameData([])
        setIsLoading(true)

    }

    const handleCSVDownload = () => {
        setDownloadCsv(true)
        setTimeout(() => {
            setDownloadCsv(false)
        }, 1000)
    }

    // const HandleLink = (val) => {
    // }
    return (<div className='admin-main'>
        <div className={"userGame-inner"}>
            <div className="p-3">
                <h1>{GameDataShow}</h1>
                <>
                    {/* <label htmlFor="fruits">Games</label>{' '} */}
                    <select
                        // id="game"
                        className="game_select"
                        name="Game"
                        onChange={(e) => handleChange(e)}
                        defaultValue={GameDataShow}
                    >
                        <option value={"The Gold Mine Treasure Map"} id="1">The Gold Mine Treasure Map</option>
                        <option value={"Skyline"} id="2">Skyline</option>
                        <option value={"The Restaurateur"} id="3">The Restaurateur</option>
                        <option value={"Wordplay"} id="4">Wordplay</option>
                        <option value={"The Great Escape"} id="5">The Great Escape</option>
                    </select>
                    <Button className="clear-filter export-grey-btn" onClick={handleCSVDownload}>Export</Button>
                    {
                        DownLoadCSV && (GameData.length > 0) &&
                        <CSVDownload data={GameData}
                            filename={`UsersData.csv`}
                            target="_blank"
                        >
                        </CSVDownload>
                    }
                </>
                <div>
                    {isLoading && GameData.length === 0  && <Loader size='big' active inline='centered' /> 
                       
                    }
                    {/* {
                      !isLoading  && DynamicColumns.length === 0 && GameData.length === 0  && <p className="geme-data-noFound">{GameDataMessage}!</p>
                    } */}
                    <div className='table-responsive' style={{ overflow: 'auto' }}>
                        <AdminCommonTable
                            TableData={ GameData}
                            columns={GameData.length > 0 ? DynamicColumns : []}
                        // dateFunction={dateFunction}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default UserGameInfo;