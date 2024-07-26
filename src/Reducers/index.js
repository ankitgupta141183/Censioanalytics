import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import questionListReducer from './qestionListReducer'
import ComponentReducer from "./ComponentReducer";
import authReducer from "./AuthReducer";
import AdminReducer from "./AdminReducers";
import sidebarHoverReducer from './sidebarHoverReducer'
import gamesDetailsReducer from './gamesDetailsReducer'
import assessmentNoReducer from "./assessmentNoReducer";
import gamesPercentageReducer from './gamesPercentageReducer'
import surveyQuestionsReducers from './surveyQuestionsReducers'
import {gamesReportsStatusReducers} from './GamesReportsStatusReducers/GamesReportsStatusReducers'
import {assessmentMturkQuestionsReducers} from './AssessementMturkReducers/assessmentMturkQuestionsReducers'

const rootReducer = combineReducers({
    questionListReducer: questionListReducer,
    profileReducer: profileReducer,
    componentReducer: ComponentReducer,
    authReducer: authReducer,   
    AdminReducer : AdminReducer,
    sidebarHoverReducer:sidebarHoverReducer,
    gamesDetailsReducer:gamesDetailsReducer,
    assessmentNoReducer:assessmentNoReducer,
    gamesPercentageReducer:gamesPercentageReducer,
    surveyQuestionsReducers:surveyQuestionsReducers ,
    gamesReportsStatusReducers:gamesReportsStatusReducers,
    assessmentMturkQuestionsReducers:assessmentMturkQuestionsReducers
})
export default rootReducer