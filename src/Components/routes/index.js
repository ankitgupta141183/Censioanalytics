import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Paths } from "./routePaths";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Home from "../Home/Home";
import DashBoardUDC from "../DashboardUDC";
// import UDCRoute from "./UDCRoute";
import { useSelector } from "react-redux";
import PrivateCommonRoute from "./PrivateCommonRoute";
import PrivateRouteUpgrade from "./PrivateRouteUpgrade";
import UpgradeDashboard from "../UpgradeComponets/UpgradeDashboard/UpgradeDashboard";
import UpgradeGamesSurvey from "../UpgradeComponets/UpgradeGamesSurvey/UpgradeGamesSurvey";
import UpgradeSchedule from "../UpgradeComponets/UpgradeSchedule/UpgradeSchedule";
import UpgradeReports from "../UpgradeComponets/UpgradeReports/UpgradeReports";
import UpgradeAdvisorsCourses from "../UpgradeComponets/UpgradeAdvisorsCourses/UpgradeAdvisorsCourses";
import AssessmentDashBoard from "../AssessmentDashboardComponents/AssessmentDashBoard/AssessmentDashBoard";
import AssessmentQuestionsList from "../AssessmentDashboardComponents/AssessmentQuestionsList/AssessmentQuestionsList";
import AssessmentUserRoutes from "./AssessmentUserRoutes";
import AssessmentUserCollegeStatus from "../AssessmentDashboardComponents/AssessmentUserCollegeStatus/AssessmentUserCollegeStatus";
import AssessmentGamesScreens from "../AssessmentDashboardComponents/AssessmentGamesScreens/AssessmentGamesScreens";
import UpgradeAllGames from "../UpgradeComponets/UpgradeAllGames/UpgradeAllGames";
import UpgradeSettings from "../UpgradeComponets/UpgradeSettings/UpgradeSettings";
import UpgradeDemographics from "../UpgradeComponets/UpgradeDemographics/UpgradeDemographics";
import UpgradeIntroduction from "../UpgradeComponets/UpgradeIntroduction/UpgradeIntroduction";
import UpgradeDemographicsQuestions from "../UpgradeComponets/UpgradeDemographicsQuestions/UpgradeDemographicsQuestions";
import NewSurveyQuestions from "../UpgradeComponets/NewSurveyQuestions/NewSurveyQuestions";
import GamesReportsStatusPage from "../UpgradeComponets/GamesReportsStatusPage/GamesReportsStatusPage";
import FeedBackQuestions from "../UpgradeComponets/FeedBackQuestions/FeedBackQuestions";
import UpgradeContactUs from "../UpgradeComponets/UpgradeContactUs/UpgradeContactUs";
import UpgradeUniversityRoute from "./UpgradeUniversityRoute";
import UpgradeUniversityDashboard from "../UpgradeUniversityAdminComponents/UpgradeUniversityDashboard/UpgradeUniversityDashboard";
import UpgradeAdminStudentScore from "../UpgradeUniversityAdminComponents/UpgradeAdminStudentScore/UpgradeAdminStudentScore";
import AssessmentDemographicQuestions from "../AssessmentDashboardComponents/AssessmentDemographicQuestions/AssessmentDemographicQuestions";
import AssessmentMturkIntroduction from "../AssessmentDashboardComponents/AssessmentMturkIntroduction/AssessmentMturkIntroduction";
import AssessmentMturkQuestionsList from "../AssessmentDashboardComponents/AssessmentMturkQuestionsList/AssessmentMturkQuestionsList";
import AssessmentMturKFeedback from "../AssessmentDashboardComponents/AssessmentMturKFeedback/AssessmentMturKFeedback";
import GenericRouteUpgrade from "./GenericRouteUpgrade";
import GenericDashboard from "../GenericComponents/GenericDashboard/GenericDashboard";
import GenericGamesAndSurvey from "../GenericComponents/GenericGamesAndSurvey/GenericGamesAndSurvey";
import GenericSchedule from "../GenericComponents/GenericSchedule/GenericSchedule";
import GenericGamesReports from "../GenericComponents/GenericGamesReports/GenericGamesReports";
import GenericContactUs from "../GenericComponents/GenericContactUs/GenericContactUs";
import GenericConnectAdvisors from "../GenericComponents/GenericConnectAdvisors/GenericConnectAdvisors";
import GenericSetting from "../GenericComponents/GenericSetting/GenericSetting";
import GenericDemographics from "../GenericComponents/GenericDemographics/GenericDemographics";
import GenericIntroduction from "../GenericComponents/GenericIntroduction/GenericIntroduction";
import GenericFeedback from "../GenericComponents/GenericFeedback/GenericFeedback";
import GenericDemographicsQuestionList from "../GenericComponents/GenericDemographicsQuestionList/GenericDemographicsQuestionList";
import GenericQuestionnaireList from "../GenericComponents/GenericQuestionnaireList/GenericQuestionnaireList";
import GenericAllGames from "../GenericComponents/GenericAllGames/GenericAllGames";
import GenericGamesReportsStatusPage from "../GenericComponents/GenericGamesReportsStatusPage/GenericGamesReportsStatusPage";
import AdminSurveyData from "../Admin/AdminSurveyData/AdminSurveyData";
import AdminTransformGameData from "../Admin/AdminTransformGameData/AdminTransformGameData";
const Instructions = lazy(() => import("../Dashboard/Instructions"))
const NewDashboard = lazy(() => import("../Dashboard/newDashboard"))
const AssessmentCompleted = lazy(() => import("../Dashboard/AssessmentCompleted"))
const Register = lazy(() => import("../Register/Register"))
const Login = lazy(() => import("../Login/Login"))
const ForgotPassword = lazy(() => import("../Login/ForgotPassword"))
const Dashboard = lazy(() => import("../Dashboard/Dashboard"))
const QuestionListFirst = lazy(() => import("../QuestionList/QuestionListFirst"))
const ResetPassword = lazy(() => import("../Login/ResetPassword"))
// const MyAssessments = lazy(() => import("../MyAssessments/MyAssessments"))
const learningPrograms = lazy(() => import("../LearningPrograms/LearningPrograms"))
const Certificate = lazy(() => import("../Certificates/Certificate"))
const Messages = lazy(() => import("../Messages/Messages"))
const About = lazy(() => import("../About/About"))
const UserRepoting = lazy(() => import("../Admin/UserRepoting/UserRepoting"))
const game_dashboard = lazy(() => import("../GameScreen/GameScreen"))

const TermsOfService = lazy(() => import("../TermsOfService/TermsOfService"))
const GetUserInfo = lazy(() => import("../Admin/GetUserInfo/GetUserInfo"))
const UpdateUserProfile = lazy(() => import("../Admin/UpdateUserProfile/UpdateUserProfile"))
const UserGameInfo = lazy(() => import("../Admin/GameInfo/UserGameInfo"))
const AllGames = lazy(() => import("../AllGames/AllGames"))
const AdminDashboard = lazy(() => import("../Admin/AdminDashboard/AdminDashboard"))
// const UsersStatusTable = lazy(()=> import("../Admin/UsersStatus/UsersStatusTable"))
// const GameVideo = lazy(()=>import("../gameVideo/GameVideo.js"))
const Recentuser = lazy(() => import("../Admin/recentuser/RecentUser"));
const Researchers = lazy(() => import("../Admin/Researchers/Researchers"))



function Routes(props) {
  const { profileReducer } = useSelector(state => state)
  const { profileDetail } = profileReducer

  const assessmentUser = ['shivam.sharma34@oaktreecloud.com', 'sourabh.staging34@gmail.com']

  const isSubmitted = sessionStorage.getItem("assessmentSubmitted")
  const USER_TYPE = sessionStorage.getItem("USER_TYPE")
  const userEmail = sessionStorage.getItem("email")
 


  return (
    <Suspense fallback={<div></div>}>
      <Router>
        <Switch>
          <Route path={Paths.LogIn} component={Login} />
          {/* <AdminRoute path={Paths.Admin} component={AdminDashboard} />
          <AdminRoute path={Paths.GetUserInfo} component={GetUserInfo} />
          <AdminRoute path={Paths.UpdateUserProfile} component={UpdateUserProfile} />
          <AdminRoute path="/game-info" component={UserGameInfo} />
          <AdminRoute path="/reporting/:type" component={UserRepoting} />
          <AdminRoute path="/recent_registrations" component={Recentuser} />
          <AdminRoute  path="/researchers" component={Researchers} /> */}
          {/* <AdminRoute path="/status/:statustype" component={UsersStatusTable} /> */}

          {/* ---new generic user dashboard--- */}
          <GenericRouteUpgrade path={Paths.GenericDashBoard} exact={true} component={GenericDashboard} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericGamesAndSurvey} component={GenericGamesAndSurvey} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericSchedule} component={GenericSchedule} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericReports} component={GenericGamesReports} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericAdvisorsCourses} component={GenericConnectAdvisors} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericContactUs} component={GenericContactUs} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericSetting} component={GenericSetting} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericDemographics} component={GenericDemographics} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericIntroduction} component={GenericIntroduction} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericFeedback} component={GenericFeedback} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericDemographicsQueslist} component={GenericDemographicsQuestionList} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericQuestionnaire} component={GenericQuestionnaireList} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={Paths.GenericAllGames} component={GenericAllGames} userlogin={profileDetail?.data?.user || false} />
          <GenericRouteUpgrade path={'/generic-games-reports/:game_id'} component={GenericGamesReportsStatusPage} userlogin={profileDetail?.data?.user || false} />

          {/* ---new generic user dashboard--- */}

          {/* ---new public assessment user --- */}
          <AssessmentUserRoutes path={'/assessment-dashboard/assessment'} component={AssessmentDashBoard} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />
          <AssessmentUserRoutes path={'/assessment-instructions'} component={Instructions} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />
          <AssessmentUserRoutes path={'/assessment-welcome'} component={Dashboard} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />
          <AssessmentUserRoutes path={'/assessment-games'} component={AllGames} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />
          <AssessmentUserRoutes path={'/college-status'} component={AssessmentUserCollegeStatus} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />
          <AssessmentUserRoutes path={'/assessment-questions-list/:id'} component={isSubmitted === "complete" ? Dashboard : AssessmentQuestionsList} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />
          <AssessmentUserRoutes path={'/assessment-dashboard'} component={AssessmentGamesScreens} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />
          <AssessmentUserRoutes path={'/assessment-demographic-questions'} component={AssessmentDemographicQuestions} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />
          <AssessmentUserRoutes path={'/assessment-Mturk-introduction'} component={AssessmentMturkIntroduction} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />
          <AssessmentUserRoutes path={'/assessment-feedback'} component={AssessmentMturKFeedback} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />
          <AssessmentUserRoutes path={'/assessment-questionnaire'} component={AssessmentMturkQuestionsList} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />

          {/* ---new public assessment user --- */}
          <Route exact path={Paths.SignUp} component={Register} />
          <Route exact path={Paths.ForgotPassword} component={ForgotPassword} />
          <Route exact path={Paths.ResetPassword} component={ResetPassword} />
          <Route exact path={Paths.About} component={About} />
          {/* <Route exact path="/privacy-policy" component={PrivacyPolicy} /> */}
          <Route exact path="/terms" component={TermsOfService} />
          <Route exact path={Paths.Home} component={Home} />
          {/*--- New upgrade design for censio been added --- */}
          <PrivateRouteUpgrade path={Paths.upgradeDashboard} exact={true} component={UpgradeDashboard} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.UpgradeSettings} component={UpgradeSettings} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.UpgradeDemographics} component={UpgradeDemographics} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.upgradeGamesSurvey} component={UpgradeGamesSurvey} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.upgradeSchedule} component={UpgradeSchedule} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.upgradeReports} component={UpgradeReports} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.upgradeAdvisorsCourses} component={UpgradeAdvisorsCourses} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.StudentAssessment} component={NewDashboard} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.Instructions} component={Instructions} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.Welcome} component={Dashboard} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={'/upgrade-games'} component={UpgradeAllGames} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.upgradeIntroduction} component={UpgradeIntroduction} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.upgradeDemographicsQuestions} component={UpgradeDemographicsQuestions} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.upgradeSurveyQuestions} component={NewSurveyQuestions} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.UpgradeFeedbackQuestions} component={FeedBackQuestions} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.UpgradeContactUs} component={UpgradeContactUs} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={'/upgrade-games-reports/:game_id'} component={GamesReportsStatusPage} userlogin={profileDetail?.data?.user || false} />
          <PrivateRouteUpgrade path={Paths.QuestListFirst} component={isSubmitted === "complete" ? Dashboard : QuestionListFirst} userlogin={profileDetail?.data?.user || false} />
          {/*--- New upgrade design for censio been added ---*/}
          {/* --- New upgrade university design has been added --- start */}
          <UpgradeUniversityRoute path={'/university-dashboard'} exact={true} component={UpgradeUniversityDashboard} userlogin={profileDetail?.data?.user || false} />
          <UpgradeUniversityRoute path={'/university-student-score'} component={UpgradeAdminStudentScore} userlogin={profileDetail?.data?.user || false} />
          {/* --- New upgrade university design has been added ---  end*/}
          <Route exact path="/api/v1/users/confirmation" component={Login} />
          {/* <UDCRoute />  */}
          {/* <UDCRoute  /> */}
          {/* <UDCRoute path={Paths.UdcStudentAssessment}  component={NewDashboard} userlogin={profileDetail?.data?.user || false} /> */}
          {/* <UDCRoute path={Paths.Welcome} component={Dashboard} userlogin={profileDetail?.data?.user || false} /> */}
          {/* <UDCRoute path={Paths.QuestListFirst} component={isSubmitted === "complete" ? Dashboard : QuestionListFirst} userlogin={profileDetail?.data?.user || false} /> */}
          {/* <UDCRoute path={Paths.Completed} component={AssessmentCompleted} userlogin={profileDetail?.data?.user || false} /> */}
          <PrivateCommonRoute path={Paths.Instructions} component={Instructions} userlogin={profileDetail?.data?.user || false} />
          <PrivateCommonRoute path={Paths.DashboardUDC} exact={true} component={DashBoardUDC} userlogin={profileDetail?.data?.user || false} />
          <PrivateCommonRoute path={Paths.UdcStudentAssessment} component={NewDashboard} userlogin={profileDetail?.data?.user || false} />
          <PrivateCommonRoute path={Paths.Welcome} component={Dashboard} userlogin={profileDetail?.data?.user || false} />
          <PrivateCommonRoute path={Paths.QuestListFirst} component={isSubmitted === "complete" ? Dashboard : QuestionListFirst} userlogin={profileDetail?.data?.user || false} />
          <PrivateCommonRoute path={Paths.Completed} component={AssessmentCompleted} userlogin={profileDetail?.data?.user || false} />

          <AdminRoute userlogin={profileDetail?.data?.user || false} path={Paths.Admin} component={AdminDashboard} />
          <AdminRoute path={Paths.GetUserInfo} component={GetUserInfo} userlogin={profileDetail?.data?.user || false} />
          <AdminRoute path={Paths.UpdateUserProfile} component={UpdateUserProfile} userlogin={profileDetail?.data?.user || false} />
          <AdminRoute path="/game-info" component={UserGameInfo} userlogin={profileDetail?.data?.user || false} />
          <AdminRoute path="/reporting/:type" component={UserRepoting} userlogin={profileDetail?.data?.user || false} />
          <AdminRoute path="/recentuser" component={Recentuser} userlogin={profileDetail?.data?.user || false} />
          <AdminRoute path="/researchers" component={Researchers} userlogin={profileDetail?.data?.user || false} />
          <AdminRoute path="/recent_registrations" component={Recentuser} userlogin={profileDetail?.data?.user || false} />
          <AdminRoute path="/survey-data" component={AdminSurveyData} userlogin={profileDetail?.data?.user || false} />
          <AdminRoute path="/games-data" component={AdminTransformGameData} userlogin={profileDetail?.data?.user || false} />

          {/* <AdminRoute path="/status/:statustype" component={UsersStatusTable} /> */}


          {/* <Route exact path={Paths.Assessment} component={Assessment} /> */}
          {/* --- private route section for old assessment user--- */}

          {/* <PrivateRoute path={Paths.Welcome} component={Dashboard} userlogin={profileDetail?.data?.user || false} /> */}
          {/* <PrivateRoute path={Paths.DashboardUDC} exact={true} component={DashBoardUDC} /> */}
          {/* <PrivateRoute path={Paths.QuestListFirst} component={isSubmitted === "complete" ? Dashboard : QuestionListFirst} userlogin={profileDetail?.data?.user || false} /> */}
          {/* <PrivateRoute path={Paths.MyAssessments} component={MyAssessments} /> */}
          <PrivateRoute path={Paths.StudentAssessment} exact={true} component={NewDashboard} userlogin={profileDetail?.data?.user || false} />
          <PrivateRoute path={Paths.Dashboard} component={game_dashboard} userlogin={profileDetail?.data?.user || false} />
          <PrivateRoute path={Paths.LearningProgram} component={learningPrograms} userlogin={profileDetail?.data?.user || false} />
          <PrivateRoute path={Paths.Certificate} component={Certificate} userlogin={profileDetail?.data?.user || false} />
          <PrivateRoute path={Paths.Messages} component={Messages} userlogin={profileDetail?.data?.user || false} />
          <PrivateRoute path={Paths.Completed} component={AssessmentCompleted} userlogin={profileDetail?.data?.user || false} />
          {/* --- private route section for old assessment user---  */}

          {/* <PrivateRoute path={Paths.Instructions} component={Instructions} userlogin={profileDetail?.data?.user || false} /> */}
          <PrivateCommonRoute path={"/games"} component={AllGames} userlogin={profileDetail?.data?.user || false} isAssessmentPage={true} />
          {/* <PrivateCommonRoute path={"/Take_a_Tour"} component={GameVideo} userlogin={profileDetail?.data?.user || false} /> */}



          <Redirect to={USER_TYPE === "Admin" ? Paths.Admin
            : USER_TYPE === "UDC_USER" ? Paths.upgradeDashboard
              : USER_TYPE === "Assessment_user" ? assessmentUser.includes(userEmail) ? '/assessment-dashboard'
                : Paths.upgradeDashboard : USER_TYPE === 'PrivateUser' ? '/assessment-dashboard'
                : Paths.Home
          }
          />
        </Switch>
      </Router>
    </Suspense>
  );
}
export default (Routes);
