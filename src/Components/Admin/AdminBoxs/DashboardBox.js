import React from "react";
import { Link } from "react-router-dom";
import './AdminBoxs.scss'
import { Divider, Grid, Header, Loader } from "semantic-ui-react";
const DashBoardBox = ({ box_count, link="#", header, icon, icon_Number, OnClick = () => { }, statustype ,isLoading= false }) => {
    return (
        <div className="Admin_box-blog">
            <div>
                <Grid >
                    <Grid.Row>
                        <Grid.Column computer={10} tablet={10} mobile={10}>
                            <Header as="h3">{header}</Header>
                        </Grid.Column>
                        <Grid.Column computer={6} tablet={6} mobile={6}>
                            <div className={`text-center icon_container ${icon_Number}`}>
                                <i className={icon}></i>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div className="text-center">
                    {
                        !box_count && isLoading ? <Loader  size='medium' active inline='centered' /> :
                        <Header as="h2" className="box_count">{box_count}</Header>

                    }

                </div>
            </div>
            <Divider />
            <div className="view_details-sec" onClick={() => OnClick(statustype)}>
                {link !== "" ?
                    <Link to={link}>View Details</Link>
                    : <p>View Details</p>

                }
                <i className="long arrow alternate right icon"></i>
            </div>
        </div>
    )
}

export default DashBoardBox;