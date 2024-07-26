import React from 'react';
import "./UserRepoting.scss"
import { useSelector } from "react-redux";
import { useParams } from 'react-router';
import AdminTable from '../AdminTable/AdminTable';

const UserRepoting = () => {
    const isToggle = useSelector((state) => state.componentReducer.isToggle)
    const param = useParams()

    const Assessmentcolumns = React.useMemo(() => [
        {
            Header: 'CSV Data',
            accessor: 'CSVData', // accessor is the "key" in the data
            placeholder: 'Filter By CheckBox',
            type: "checkbox"

        },
        {
            Header: 'User Id',
            accessor: 'UserId', // accessor is the "key" in the data
            placeholder: 'Filter By UserId',
            type: "number"

        },

        {
            Header: 'Name',
            accessor: 'first_name', // accessor is the "key" in the data
            placeholder: 'Filter By Name',
            type: 'text'
        },
        {
            Header: 'Email',
            accessor: 'filterbyemail',
            placeholder: 'Filter By Email',
            type: 'text'

        },
        {
            Header: 'Organization',
            accessor: 'filterbyorganization', // accessor is the "key" in the data
            placeholder: 'Filter By Organization',
            type: 'text'

        },
        {
            Header: 'Role',
            accessor: 'Role', // accessor is the "key" in the data
            placeholder: 'Filter By Role',
            type: 'text'
        },
        {
            Header: 'Status',
            accessor: 'Status', // accessor is the "key" in the data
            placeholder: 'Filter By Status ',
            type: 'select'
        },
        {
            Header: 'Start Date',
            accessor: 'Attempt_Start_Date', // accessor is the "key" in the data
            placeholder: 'Filter Not Applied',
            type: 'text'

        },
        {
            Header: 'Comp. Date',
            accessor: 'Attempt_Completion_Date', // accessor is the "key" in the data
            placeholder: 'Filter Not Applied',
            type: 'text'

        },
        // {
        //     Header: 'V_Code',
        //     accessor: 'verify_code', // accessor is the "key" in the data
        //     placeholder: 'Filter Not Applied',
        //     type: 'text'

        // },

    ],
        []
    )
    const Gamescolumns = React.useMemo(() => [
        {
            Header: 'CSV Data',
            accessor: 'CSVData', // accessor is the "key" in the data
            placeholder: 'Filter By CheckBox',
            type: "checkbox"

        },
        {
            Header: 'User Id',
            accessor: 'UserId', // accessor is the "key" in the data
            placeholder: 'Filter By UserId',
            type: "number"

        },

        {
            Header: 'Name',
            accessor: 'first_name', // accessor is the "key" in the data
            placeholder: 'Filter By Name',
            type: 'text'
        },
        {
            Header: 'Email',
            accessor: 'filterbyemail',
            placeholder: 'Filter By Email',
            type: 'text'

        },
        {
            Header: 'Organization',
            accessor: 'filterbyorganization', // accessor is the "key" in the data
            placeholder: 'Filter By Organization',
            type: 'text'

        },
        {
            Header: 'Role',
            accessor: 'Role', // accessor is the "key" in the data
            placeholder: 'Filter By Role',
            type: 'text'
        },
        // {
        //     Header : 'Status',
        //     accessor : 'status',
        //     placeholder : "Filter By Status",
        //     type : "text"
        // },
     
        // {
        //     Header: 'Played Date',
        //     accessor: 'Attempt_Start_Date', // accessor is the "key" in the data
        //     placeholder: 'Filter Not Applied',
        //     type: 'text'

        // },

        // {
        //     Header: 'V_Code',
        //     accessor: 'verify_code', // accessor is the "key" in the data
        //     placeholder: 'Filter Not Applied',
        //     type: 'text'

        // },

    ],
        []
    )


    return (<div className='admin-main'>
        <div className={!isToggle ? "admin-inner" : "admin"}>
            <div className='p-3'>
                <div>
                    <div className="users">
                        <AdminTable 
                        columns = {param.type === "assessment" ? Assessmentcolumns : Gamescolumns}
                        params = {param}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>)
};

export default UserRepoting;