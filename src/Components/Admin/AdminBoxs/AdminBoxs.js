// const Admin = () => {
import { Grid,  Divider } from "semantic-ui-react";
import React from 'react';
import './AdminBoxs.scss';
import { useLocation } from "react-router-dom";
import DashBoardBox from "./DashboardBox";
// import graphImg from '../../assets/img/orange-theme-graph.png';



const AdminBoxs = ({ BoxData, ChangeTable, ShowUserTable }) => {
    const location = useLocation();
    const handleClick = (type) => {
        if (ShowUserTable.statustype !== type) {
            if (location.pathname === "/admin") {
                ChangeTable({ type: "assessment" , statustype : type })
            } else {
                ChangeTable({ type: "games" ,  statustype : type })
            }
        }

    }
    return (<div className="Admin_Box">
        <Grid>
            <Grid.Row>
                <Grid.Column computer={4} tablet={8} mobile={8}>
                    <DashBoardBox
                        box_count={BoxData.Total}
                        isLoading={BoxData.isLoading}
                        link={""}
                        header={'No. of Users'}
                        icon={"address book outline icon"}
                        icon_Number={"icon_1"}
                        OnClick={handleClick}
                        statustype={location.pathname === "/admin/game_dashboard" ? "games" : "assessments"}
                    />
                </Grid.Column>
                <Grid.Column computer={4} tablet={8} mobile={8}>
                    <DashBoardBox
                        box_count={BoxData.Completed}
                        isLoading={BoxData.isLoading}
                        //location.pathname === "/admin/game_dashboard" ? "/status/complete_games" : "/status/complete_assessment"
                        link={""}
                        header={`Completed ${location.pathname === "/admin/game_dashboard" ? "Games" : " Assessments"}`}
                        icon={"checkmark icon"}
                        icon_Number={"icon_2"}
                        OnClick={handleClick}
                        statustype= {location.pathname === "/admin/game_dashboard" ? "complete_games": "Completed" }
                    />
                </Grid.Column>
                <Grid.Column computer={4} tablet={8} mobile={8}>
                    <DashBoardBox
                        box_count={BoxData.Pending}
                        isLoading={BoxData.isLoading}
                        //location.pathname === "/admin/game_dashboard" ? "/status/pending_games" : "/status/pending_assessment"
                        link={""}
                        header={`Pending ${location.pathname === "/admin/game_dashboard" ? "Games" : "Assessments"}`}
                        icon={"spinner icon"}
                        icon_Number={"icon_3"}
                        OnClick={handleClick}
                        statustype= {location.pathname === "/admin/game_dashboard" ? "pending_games": "In Progress" }
                    />
                </Grid.Column>
                <Grid.Column computer={4} tablet={8} mobile={8}>
                    <DashBoardBox
                        box_count={BoxData.organisation}
                        link={""}
                        isLoading={BoxData.isLoading}
                        header={"Organizations"}
                        icon={"building icon"}
                        icon_Number={"icon_4"}
                        OnClick={handleClick}
                        statustype={"organizations"}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Divider hidden />

    </div>)
}

export default AdminBoxs;