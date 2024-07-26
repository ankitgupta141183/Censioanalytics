import React from "react";
import NewDashboard from "../../Dashboard/newDashboard";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Loader, Dimmer } from "semantic-ui-react";
import { updateAssessmentNumberParam } from '../../../Actions/AssessementNoActions/AssessementNoActions'
const AssessmentDashBoard = ({ isfetched }) => {
    // let {assessment_no} = useParams();
    let { game_name } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        // dispatch(updateAssessmentNumberParam(parseInt(assessment_no)))
        const matchGamesToShow = ['goldmine', 'skyline', 'restaurater', 'wordplay', 'the_great_escape']
        function isValidGameToShow(element) {
            return element === game_name;
        }
        let indexToShowAssessment = matchGamesToShow.findIndex(isValidGameToShow);
        console.log(indexToShowAssessment + 1, 'indexToShowAssessment');
        dispatch(updateAssessmentNumberParam(indexToShowAssessment + 1))
        if (indexToShowAssessment + 1 === 0) {
            // history.push("/");
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {/* <AssessmentHeader /> */}
            {
                isfetched &&
                <Dimmer active={true} inverted>
                    <Loader size='large' inline='centered' >
                        Loading...
                    </Loader>
                </Dimmer>
            }
            {
                !isfetched &&
                <>
                    <NewDashboard isAssessmentPage={true} />
                </>
            }
            {/* <HeaderComponent/> */}
            {/* {profileDetail?.data?.user &&
       <>  <HeaderComponent/> </>} */}
            {/* <NewDashboard  isAssessmentPage={true} /> */}
        </>
    )
}


export default AssessmentDashBoard;