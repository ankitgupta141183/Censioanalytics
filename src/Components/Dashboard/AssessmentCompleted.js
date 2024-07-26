import React from "react";
import { useHistory } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
// import { Button, Header,  Icon } from "semantic-ui-react";
import { Button, Grid, Header ,Icon} from "semantic-ui-react";
import "react-step-progress-bar/styles.css";
import "./dashboard.css";
import { useSelector } from "react-redux";

const AssessmentCompleted = () => {
    const history = useHistory()

    const handleRedirect = (type) => {
        history.push(type)
        sessionStorage.setItem('isActiveItem', type)
        // dispatch(ShowGameLink(""))
        
    }

    const isUdc = useSelector(state => state.profileReducer?.profileDetail?.data?.user?.udc_user)
    // className={!isToggle? "dashboard-page" :  "user-question-page"}

    return (
        isUdc ? <div className="dashboard-page-udc" >
            <Grid className="right-content-sec-all">
                <Grid.Row>
                    <Grid.Column width={16}>
                        <div className="enable-take-test">
                            <br />
                            <Header as='h2' icon textAlign="center">
                                You Have Already Submitted The Assessment !
                                <Icon name='check circle' style={{ color: "#1e1e62cf", marginTop: 30, marginBottom: 30 }} />

                            </Header>
                            <div style={{ textAlign: "center", marginTop: 30 }}>
                                <Button
                                    className="next-button"
                                    onClick={() => handleRedirect("/UDC/dashboard")}
                                >
                                    Go to censio Dashboard
                                </Button>
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div> : 
        <div className="assesment-test_sec">
        <div className="enable-take-test">
            <br />
            <Header as='h2' icon textAlign="center">
                You Have Already Submitted The Assessment !
                <Icon name='check circle' style={{ color: "#1e1e62cf", marginTop: 30, marginBottom: 30 }} />

            </Header>
            <div style={{ textAlign: "center", marginTop: 30 }}>
                <Button
                    className="next-button"
                    onClick={() => handleRedirect("/dashboard")}
                >
                    Go to censio Dashboard
                </Button>
            </div>
        </div>
        </div>


    )
}
export default AssessmentCompleted;