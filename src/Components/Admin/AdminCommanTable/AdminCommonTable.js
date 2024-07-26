import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Icon } from "semantic-ui-react"
import Pagination from "../../CommonComponent/Pagination/Pagination"
import "./AdminComman.scss"
import { Loader } from 'semantic-ui-react';
import AdminCommonPagination from "../AdminCommonPagination/AdminCommonPagination"

const AdminCommonTable = ({
    TableData, columns = [], LinkBy = [], LinkFunCtion = () => { }, DateTrue = [],
    checkBoxInput = [], filters = false, sorting = false,
    checked = [], setChecked = () => { }, UserActionButton = () => { }, itemsCountPerPages = 15,
    isLoading, currentPage, setCurrentPage, setTotalPages, totalPages , type
},

) => {
    const [issort, setissort] = useState("")
    const [search, setSearch] = useState("")
    const [filterBy, setFilterBy] = useState("")
    const [Data, setData] = useState([])
    const [currentPageNum, setCurrentPageNum] = useState(1)
    const [shownext, setShownext] = useState(0)
    const [allChecked, setAllChecked] = useState(false)

    useEffect(() => {
        // if (TableData.length > 0) {
        //     setData(TableData)
        // }
        setData(TableData)
    }, [TableData])

    useEffect(() => {
        if (isLoading) {
            setCurrentPageNum(1)
        }
    }, [isLoading])

    const dateFunction = (fetcheddate) => {
        const lastUpdate = new Date(fetcheddate)
        const Year = lastUpdate.getFullYear()
        let Month = lastUpdate.getMonth() + 1
        let date = lastUpdate.getDate()
        let Hours = lastUpdate.getHours()
        let Minutes = lastUpdate.getMinutes()
        let Sec = lastUpdate.getSeconds()
        if (Month < 10) {
            Month = `0${Month}`;
        }
        if (date < 10) {
            date = `0${date}`;
        }
        if (Hours < 10) {
            Hours = `0${Hours}`;
        }
        if (Minutes < 10) {
            Minutes = `0${Minutes}`;
        }
        if (Sec < 10) {
            Sec = `0${Sec}`;
        }
        const LastUpdateTime = Year + "/" + Month + "/" + date + "  " + Hours + ":" + Minutes + ":" + Sec
        return LastUpdateTime
    }

    const handleFocus = (e) => {
        if (e.target.name !== filterBy) {
            setFilterBy(e.target.name)
            setSearch("")
            setissort(false)
            setData(TableData)
        }
    }

    const handleChangeValue = (e) => {
        if (e.target.type === "select-one") {
            setSearch(e.target.value)
            handleFilter(e.target.value)
        }
        else {
            if (e.target.value.length === 0) {
                // handleFilter(e.target.value)
                setData(TableData)
            }
            setSearch(e.target.value)
        }

    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setissort("")
            handleFilter()
        }
    }

    const handleFilter = (value) => {
        const byfilter = columns.find((column) => column.accessor === filterBy)
        let fiter_user = ""
        if (filterBy === 'role') {
            fiter_user = [...TableData].filter((data) => data[byfilter.Value] !== null && data[byfilter.Value].toString().toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        } else {
            if (byfilter.combined) {
                const FilterByName = (data) => {
                    if (data[byfilter.Value[0]] !== null && data[byfilter.Value[1]] !== null) {
                        let full_name = data[byfilter.Value[0]] + " " + data[byfilter.Value[1]]
                        return full_name.toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())
                    }
                    // data[byfilter.Value[0]] !== null && data[byfilter.Value[0]].toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())
                }
                fiter_user = [...TableData].filter((data) => FilterByName(data))

            } else {

                fiter_user = [...TableData].filter((data) => data[byfilter.Value] !== null && data[byfilter.Value].toString().toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            }
        }
        if (fiter_user !== "") {
            setData(fiter_user)
        }
    }

    const handleGetPageNum = (num) => {
        let roundedNumber = Math.floor(num)  // converted decimal numbers
        setShownext((roundedNumber * 15) - 15)
        // setShownext((roundedNumber * 10) - 10)
        setCurrentPageNum(roundedNumber)
    }

    const handleSorting = () => {

        let SortBy
        const assignValue = (a, b) => {
            if (a === null || a === "") {
                return 1;
            }
            else if (b === null || b === "") {
                return -1;
            }
            else if (a.toString().toLocaleLowerCase() === b.toString().toLocaleLowerCase()) {
                return 0;
            }
            else {
                if (issort) {
                    return a.toString().toLocaleLowerCase() < b.toString().toLocaleLowerCase() ? 1 : -1;
                } else {
                    return a.toString().toLocaleLowerCase() < b.toString().toLocaleLowerCase() ? -1 : 1;
                }
            }
        };
        if (issort) {
            setissort(false)
            SortBy = [...Data].sort((a, b) => assignValue(a[filterBy], b[filterBy]))
        } else {
            setissort(true)
            SortBy = [...Data].sort((a, b) => assignValue(a[filterBy], b[filterBy]))
        }
        // console.log(SortBy);
        setData(SortBy)
    }

    const handleCombinedKey = (Val, keys) => {
        let full_name = Val[keys[0]] + " " + Val[keys[1]]
        return !LinkBy.includes(keys[0]) ? full_name : (<Link to={LinkFunCtion(Val, keys)}>{full_name}</Link>)
    }

    const getObjectValue = (val, keys) => {
        const Value = val[keys.Value] !== null ? val[keys.Value][keys.accessor] : "N/A"
        return Value ? Value : "N/A"
    }

    const HandleCheckBox = (e, val) => {
        const cloneCheckedBox = [...checked]
        const All_id = Data.map(item => item.id)
        if (e.target.id === "checkAll") {
            if (All_id.find(item => cloneCheckedBox.includes(item))) {
                cloneCheckedBox.splice(0, All_id.length)
            } else {
                cloneCheckedBox.push(...All_id)
            }
        } else {
            if (cloneCheckedBox.includes(val.id)) {
                const index = cloneCheckedBox.indexOf(val.id);
                if (index > -1) {
                    cloneCheckedBox.splice(index, 1); // 2nd parameter means remove one item only
                }
            } else {
                cloneCheckedBox.push(val.id)

            }
        }
        setAllChecked(All_id.length === cloneCheckedBox.length)
        setChecked(cloneCheckedBox)
    }

    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(34); // Initialize with 1 page by default
    const pagesToShow = 5; // Number of pages to show at a time

    return (
        <>
            <div className={`${Data?.length > 0 && !isLoading ? "overflow-auto mt-5" : "overflow-unset mt-5"}`}>
                <table className={'Admin_Table admin_user-table'} style={{ width: 'max-content' }}>
                    {
                        columns.length > 0 ?
                            <thead>
                                <tr>
                                    {
                                        columns?.map((CH, Index) => {
                                            return (
                                                <th key={Index} className={"Common-hearder"} style={{ textAlign: "center" }}>{CH?.Header}</th>
                                            )
                                        })
                                    }
                                </tr>
                                {filters &&
                                    <tr>
                                        {columns && columns?.map((column) => {
                                            return <th className='filter_admin-row' key={column?.Header}>
                                                {column.inputType === "select" ?
                                                    <>
                                                        <select className="select-input" name={column.accessor} value={column.accessor === filterBy ? search : ""} placeholder={column.placeholder} onFocus={handleFocus} onChange={handleChangeValue} >
                                                            <option hidden value={""}>{column.placeholder}</option>
                                                            {
                                                                column.options.map((option) => {
                                                                    return <option value={option} key={option}>{option}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </>
                                                    : column.inputType === "checkBox" ?
                                                        <>
                                                            <input name='checkAll' id='checkAll' type={"checkbox"} style={{ margin: '3px 3px 0 0', cursor: 'pointer', width: "auto !important" }} onFocus={handleFocus} checked={checked.length > 0 && allChecked} onChange={HandleCheckBox} />
                                                        </>
                                                        : column.inputType === "Not requested" ?
                                                            null
                                                            :
                                                            <>
                                                                <input name={column.accessor} className="filter-input" value={column.accessor === filterBy ? search : ""} placeholder={column.placeholder} type={column.type} onFocus={handleFocus} onChange={handleChangeValue} onKeyDown={handleKeyDown} />
                                                                {sorting && <>
                                                                    <Button name={column.accessor} type="button" className="sort-button" onFocus={handleFocus} onClick={handleSorting}>
                                                                        {
                                                                            issort && column.accessor === filterBy ?
                                                                                column.type === "number" ?
                                                                                    <Icon name="sort numeric up" />
                                                                                    : <Icon name="sort alphabet descending" />
                                                                                : column.type === "number" ?
                                                                                    <Icon name="sort numeric down" />
                                                                                    : <Icon name="sort alphabet ascending" />
                                                                        }

                                                                    </Button>
                                                                </>}
                                                            </>
                                                }
                                            </th>
                                        })}
                                    </tr>
                                }
                            </thead>
                            : null
                    }

                    <tbody>
                        {
                            Data.length > 0 && !isLoading ? Data?.slice(shownext, shownext + itemsCountPerPages)?.map((val, index) => {
                                return (
                                    <tr key={index}>

                                        {
                                            columns?.map((TD, Ind) => {

                                                return (
                                                    <td key={Ind} style={{ textAlign: "center" }}>
                                                        {
                                                            TD.combined === true ?
                                                                handleCombinedKey(val, TD.Value)
                                                                : TD.ValueType === "Object" ?
                                                                    getObjectValue(val, TD)
                                                                    : val[TD.Value] !== null ?
                                                                        LinkBy.includes(TD.Value) ?
                                                                            <Link to={LinkFunCtion(val, TD.Value)}>{val[TD.Value]}</Link>
                                                                            : DateTrue.includes(TD.Value) ?
                                                                                dateFunction(val[TD.Value])
                                                                                : checkBoxInput.includes(TD.Value) ?
                                                                                    <input type="checkbox" id={Ind} className='' style={{ margin: '3px 3px 0 0', cursor: 'pointer' }} checked={checked.includes(val.id)} onChange={(e) => HandleCheckBox(e, val)} />
                                                                                    : TD.ValueType === "Action" ?
                                                                                        UserActionButton(val, index)
                                                                                        : val[TD.Value] === "" ? "N/A"
                                                                                            : `${val[TD.Value]}`
                                                                        : "N/A"
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>

                                )
                            })
                                : isLoading ? <tr><td colSpan="13" style={{ textAlign: "center" }}>
                                    <Loader size='big' active inline='centered' />
                                </td></tr> : <tr><td colSpan="13" style={{ textAlign: "center" }}>No Data Found!</td></tr>
                        }


                    </tbody>

                </table>
            </div>
            <div>
                {
                    Data.length > itemsCountPerPages && type !== "games-data" &&
                    <Pagination
                        activePage={currentPageNum}
                        TotalPage={Data.length}
                        itemsCountPerPage={itemsCountPerPages}
                        onClick={handleGetPageNum}
                        isLoading={isLoading}
                    />

                }
            </div>
            {
                Data.length > 0 && type === "games-data" &&  !isLoading  &&
                <div>
                    <AdminCommonPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pagesToShow={pagesToShow}
                        setCurrentPage={setCurrentPage}
                        setTotalPages={setTotalPages}
                    />
                </div>
            }
        </>
    )
}

export default AdminCommonTable;