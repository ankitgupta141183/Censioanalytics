export const ColumnsNames =
        [
              
            {
                Header: "",
                Value: "checkBox",
                inputType : "checkBox"
            },
            {
                Header: "User Id",
                Value: "id",
                inputType : "text",
                placeholder:"Filter By User Id",
                accessor: "id",
                type: "number"

            },
            {
                Header: "Name",
                Value: "full_name",
                inputType : "text",
                placeholder:"Filter By Name",
                accessor: "full_name",
                type : "text"
            },
            {
                Header: "Email",
                Value: "email",
                inputType : "text",
                placeholder:"Filter By Email",
                accessor: "email",
                type : "text"
            },
            {
                Header: "Organisation",
                Value: "organisation_name",
                inputType : "text",
                placeholder:"Filter By Organisation Name",
                accessor: "oraganisation_name",
                type : "text"

            },
            {
                Header: "Role",
                Value: "role",
                inputType : "select",
                options : ["Student","Organization" , "Not Assign"],
                placeholder:"Filter By Role",
                accessor: "role",
                type : "text"
            },
            {
                Header : "Action",
                Value : "Action",
                ValueType: "Action",
                inputType: "Not requested"

            }

        ]
