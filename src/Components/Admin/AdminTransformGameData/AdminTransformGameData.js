import { useEffect, useState } from "react";
import { Button, Popup, Tab } from "semantic-ui-react";
import "./AdminTransformGameData.scss"
import { CSVDownload } from 'react-csv';
import { panes } from "../../../StaticData/AdminStaticData";
import CommonProfileOptions from '../../CommonComponent/StaticData/ProfileOptions'
import { fetchAllAdminGamesData } from '../../../Services/SuperAdminServices/SuperAdminServices'
import AdminCommonTable from "../AdminCommanTable/AdminCommonTable";
import LoaderLineSvg from "../../CommonComponent/LoaderLineSvg/LoaderLineSvg"

const AdminTransformGameData = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [gamesData, setGamesData] = useState([])
  const [dynamicColumns, setDynamicColumns] = useState([])
  const [activeTab, setActiveTab] = useState(0)
  const [isdisable, setIsdisable] = useState(false)
  const [gamesCsvData, setGameCsvData] = useState({ export_data: [] })
  const [isFilterButton, setIsFilterButton] = useState(false)
  const [filterUrl, setFilterUrl] = useState(`/api/v1/game_data?filter_game_data[game_id]=1&page=1`)
  const [filterCurrentPage, setFilterCurrentPage] = useState(1)
  const [selectValue, setSelectedValues] = useState({
    email: "",
    unique_id: "",
    date: ""
  })
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(34); // Initialize with 1 page by default
  const handleTabChange = (e, { activeIndex }) => {
    setActiveTab(activeIndex)
    setTotalPages(0)
    setCurrentPage(1)
    setFilterUrl(`/api/v1/game_data?filter_game_data[game_id]=${activeIndex + 1}&page=1`)
    handleClearFilter('mount')
  }

  useEffect(() => {
    const { unique_id, email, date } = selectValue;
    let paramUrl;
    if (!isFilterButton) {
      paramUrl = `/api/v1/game_data?filter_game_data[game_id]=${activeTab + 1}&page=${currentPage}&email=${email ? email : ''}&user_id=${unique_id ? unique_id : ''}`
      getAllGamesTableRecord(paramUrl)
    } else {
      paramUrl = `/api/v1/game_data?filter_game_data[game_id]=${activeTab + 1}&page=${filterCurrentPage}&email=${email ? email : ''}&user_id=${unique_id ? unique_id : ''}&date=${date ? date : ''}`
      getAllGamesTableRecord(paramUrl)
    }
    // eslint-disable-next-line 
  }, [currentPage, filterCurrentPage, filterUrl])
  
  const getAllGamesTableRecord = async (url) => {
    setIsLoading(true)
    const gamesDataAllUser = await fetchAllAdminGamesData(url)
    if (gamesDataAllUser.status === 200 && gamesDataAllUser.data.status !== 422) {
      setIsLoading(false)
      setTotalPages(gamesDataAllUser.data?.total_pages)
      setGamesData(handleFilterTableData(gamesDataAllUser.data?.data))
      setDynamicColumns(filterKeyDynamic(gamesDataAllUser.data?.data))
    } else {
      setIsLoading(false)
    }

  }

  const handleFilterTableData = (gameData, type) => {
    let filteredData = gameData.flatMap((items) => {
      let addData = { user_id: items.user_id, email: items.email, created_date: CommonProfileOptions.formatDateToCustomString(items?.created_at), ...items }
      if (items.game_id === 1) {
        addData.dashboard_clicks_dict = JSON.stringify(items.dashboard_clicks_dict)
        if (items.proximity_scores !== null) {
          addData.proximity_scores = JSON.stringify(items.proximity_scores)
        }
      }
      delete addData.created_at
      return addData
    })
    return type === "fistIndex" ? filteredData[0] : filteredData
  }

  const filterKeyDynamic = (data) => {
    const key = Object.keys(handleFilterTableData(data, "fistIndex"))
    const dynamicTableColumn = key.map((keys) => {
      return { Header: keys.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), Value: keys }
    })
    return dynamicTableColumn
  }

  const getRecordToDownload = async (e) => {
    setGameCsvData({ export_data: [] })
    setIsdisable(true)
    const { unique_id, email, date } = selectValue;
    let paramUrl;
    if (!isFilterButton) {
      paramUrl = `/api/v1/game_data?filter_game_data[game_id]=${activeTab + 1}&page=${currentPage}&email=${email ? email : ''}&user_id=${unique_id ? unique_id : ''}`
    } else {
      paramUrl = `/api/v1/game_data?filter_game_data[game_id]=${activeTab + 1}&page=${filterCurrentPage}&email=${email ? email : ''}&user_id=${unique_id ? unique_id : ''}&date=${date ? date : ''}`
    }
    const fetchedCsvData = await fetchAllAdminGamesData(paramUrl)
    if (fetchedCsvData.status === 200 && fetchedCsvData.data.status !== 422) {
      setGameCsvData({ export_data: handleFilterTableData(fetchedCsvData.data?.data) })
      setIsdisable(false)
    } else {
      setGameCsvData({ export_data: [] })
      setIsdisable(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setSelectedValues({ ...selectValue, [name]: value })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFilterApiCall()
    }
  }

  const handleFilterApiCall = () => {
    const { unique_id, email, date } = selectValue
    setIsFilterButton(true)
    setFilterUrl(`/api/v1/game_data?filter_game_data[game_id]=${activeTab + 1}&page=${filterCurrentPage}&email=${email ? email : ''}&user_id=${unique_id ? unique_id : ''}&date=${date ? date : ''}`)
    setFilterCurrentPage(1)
  }

  const handleClearFilter = (type) => {
    setIsFilterButton(false)
    setSelectedValues({ email: "", unique_id: "", date: "" })
    setGameCsvData({ export_data: [] })
    if (type !== 'mount') {
      setFilterUrl(`/api/v1/game_data?filter_game_data[game_id]=${activeTab + 1}&page=1`)
    }
    setCurrentPage(1)
    setFilterCurrentPage(1)
  }


  return (
    <div className="Recent_hearder">
      <div className="p-3">
        <div>
          <h1>Games Data</h1>
        </div>
        <div className="header-tabs d-flex vt-center">

          <Tab
            menu={{ pointing: false, borderless: false, attached: false, tabular: false }} panes={panes}
            activeIndex={activeTab}
            onTabChange={handleTabChange}
          />
          <>
            <div className="pr-2 pl-2">
              <input
                type="text"
                onKeyDown={(e) => handleKeyDown(e)}
                className="py-2 input-style"
                placeholder="Filter By Email"
                onChange={(e) => { handleFilterChange(e) }}
                value={selectValue.email}
                name="email" id="email" />
            </div>
            <div className="pr-2">
              <input
                type="number"
                onKeyDown={(e) => handleKeyDown(e)}
                className="py-2 input-style"
                placeholder="Filter By UserID"
                value={selectValue.unique_id}
                onChange={(e) => { handleFilterChange(e) }}
                name="unique_id" id="unique_id" />

            </div>
            <input
              value={selectValue.date ? selectValue.date : 'dd/mm/yy'}
              onChange={(e) => { handleFilterChange(e) }}
              name="date"
              className="py-2 input-style"
              type="date"
              id="start"
              min="2022-01-01"
              // max="2030-12-31"
              max={CommonProfileOptions.formattedDate}
            />
            <div className="pl-2">
              <Button onClick={handleFilterApiCall} style={{ padding: "10px" }} >Filter</Button>
            </div>
            <div>
              <Button onClick={handleClearFilter} style={{ padding: "10px" }} >Clear Filter</Button>
            </div>

          </>
          <div className="download-button ms-auto" style={{ float: 'right' }}>
            <div></div>
            {
              isdisable ?
                <>
                  <LoaderLineSvg
                    width={"60px"}
                    height={"20px"}
                  />
                </> :
                <Popup
                  trigger={
                    <Button type="button" onClick={getRecordToDownload} className={'clear-filter export-btn Csv-button '}><i className='download icon'></i></Button>
                  }
                  content='Export'
                  inverted
                />
            }
            {gamesCsvData.export_data.length > 0 && <CSVDownload data={gamesCsvData.export_data}
              filename={`survey_data.csv`}
              target="_blank"
            >
            </CSVDownload>}
          </div>
        </div>
        {
          <div className="table-container">
            <AdminCommonTable
              TableData={gamesData}
              columns={dynamicColumns}
              isLoading={isLoading}
              currentPage={isFilterButton ? filterCurrentPage : currentPage}
              setCurrentPage={isFilterButton ? setFilterCurrentPage : setCurrentPage}
              setTotalPages={setTotalPages}
              totalPages={totalPages}
              type={"games-data"}

            />
          </div>
        }
      </div>
    </div>
  )
}

export default AdminTransformGameData;