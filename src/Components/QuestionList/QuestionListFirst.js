import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Grid, Form, Header, Image, Loader, Progress, Icon, Dimmer } from "semantic-ui-react";
import './Question-list.scss';
import { QuestionServices } from "../../Services/QuestionServices";
import { Markup } from 'interweave';
import { getQuestionList } from '../../Actions/questionAction';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { useSelector, useDispatch } from 'react-redux';
import check2 from "../../assets/img/check2.png"
import { showNotification } from "../../Actions/componentActions";
import { Paths } from "../routes/routePaths";
let questionServices = new QuestionServices();
var validateAlphabate = /^[A-Za-z ]+$/;
var validateNumbers = /^[0-9]+$/;


export default function QuestionListFirst(props) {

    const history = useHistory()

    const questionList = useSelector(state => (state.questionList))
    const [questionListNew, setQuestionListNew] = useState(questionList)
    // const [informationPage, setinformationPage] = useState(false)


    const [questionListEnd, setQuestionListEnd] = useState(questionList)

    const [isShowQuestion, setIsShowQuestion] = useState(0)
    const [isShowCategory, setIsShowCategory] = useState(0)
    const [isOptionQuestionIDMatch, setIsOptionQuestionIDMatch] = useState("")
    const [isOptionAnswerMatch, setIsOptionAnswerMatch] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [questionAnswerList, setQuestionAnswerList] = useState([])
    const [isQuestionId, setIsQuestionId] = useState("")
    const [isShowRedireactToDashboardPage, setIsShowRedireactToDashboardPage] = useState(false)
    const [timeTakenOnQuestion, setTimeTakenOnQuestion] = useState("")
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [isActive, setIsActive] = useState(false);
    const [isShowPercentProgress, setIsShowPercentProgress] = useState(0);
    const [counter, setCounter] = useState(0);
    const dispatch = useDispatch()
    const [assesmentId, setAssesmentId] = useState("");
    const [currentQue, setCurrentQue] = useState(0)
    const [queCategory1, setQueCategory1] = useState(0)
    const profileDetail = useSelector(state => (state.profileReducer.profileDetail));
    const {sidebarHoverReducer} = useSelector(state =>  state)

    // new State

    const Instuctions = [
        {
            Instructions_1: "In this section you will see a number of phrases describing people's behaviors. Please read each phrase carefully and rate it in terms of how accurately it describes you. Describe yourself as you generally are now, not as what you wish to be in the future. Describe yourself as you honestly see yourself, in relation to other people you know of the same gender as you are, and roughly your same age. Your responses will be kept confidential.",
            Instructions_2: "On a scale of 1 to 5, where 1 is 'Very Inaccurate' and 5 is 'Very Accurate' please rate each item."
        },
        {
            Instructions_1: "Please indicate how much you agree with the following statements as they apply to you over the last month. If a particular situation has not occurred recently, answer according to how you think you would have felt.",
            Instructions_2: "On a scale of 1 to 5, where 1 is 'Not true at all (left)', 2 is 'Rarely true', 3 is 'Sometimes true', 4 is 'Often true' and 5 is 'True nearly all the time (right)' please rate each item."
        },
        { Instructions_1: "", Instructions_2: "On a scale of 1-7, where 1 is 'Strongly Diasgree' and 7 is 'Strongly Agree', please rate your LEVEL OF AGREEMENT with the statements below." },
        { Instructions_1: "", Instructions_2: "On a scale of 1-4, where 1 is 'Not at all true of me' and 4 is 'very true of me, please rate your LEVEL OF AGREEMENT with the statements below." },
        {
            Instructions_1: "Compared to people of approximately your age and life experience, how creative would you rate yourself for each of the following acts? For acts that you have not specifically done, estimate your creative potential based on your performance on similar tasks.",
            Instructions_2: 'On a scale of 1 to 5, where 1 is "Much less creative", 2 is "Less creative", 3 is "Neither more or less creative", 4 is "More creative" and 5 is "Much more creative" please rate each item.'
        }
    ]
    useEffect(() => {
        // if(sessionStorage.getItem('assessment_started')=="true"){
        //     history.push(Paths.Dashboard)
        // }
        // sessionStorage.setItem('informationPage', true)
        if (sessionStorage.getItem('informationPage') === 'false') {
            history.push(Paths.Instructions)
        }
        getAllCategoryQuestion()
        setIsLoading(true)
    }, []); /* eslint-disable-line*/


    useEffect(() => {
        if (sessionStorage.getItem("lastCategoryId")) {
            setIsActive(true)
        }
    }, [])

    useEffect(() => {
        let intervalId;
        intervalId = setInterval(() => {
            const secondCounter = counter % 60;
            const minuteCounter = Math.floor(counter / 60);

            let computedSecond =
                String(secondCounter).length === 1
                    ? `0${secondCounter}`
                    : secondCounter;
            let computedMinute =
                String(minuteCounter).length === 1
                    ? `0${minuteCounter}`
                    : minuteCounter;

            setSecond(computedSecond);
            setMinute(computedMinute);

            setCounter((counter) => counter + 1);
        }, 1000);
        // }

        return () => clearInterval(intervalId);
    }, [isActive, counter]);

    const getAllCategoryQuestion = () => {
        dispatch(getQuestionList(props.location.pathname.split("/")[2]))
            .then(
                (data) => {

                    setIsLoading(false)
                    if (data && data.payload === "Signature has expired") {
                        history.push("/login")
                    }
                    if (data && data.payload !== "Signature has expired") {
                        setAssesmentId(data.payload ? data.payload.data[0].assessment_id : "")
                        setQuestionPosition(data.payload ? data.payload.data[0].categories : [])
                        setLocalQuestion(data.payload ? data.payload.data[0].categories : [])
                        getReviewQuestion(data.payload ? data.payload.data[0].categories : [])
                    }
                    let temp
                    if (data && data.payload !== "Signature has expired") {
                        temp = data.payload ? data.payload.data[0].categories : []
                        temp.push({
                            category: "Section-End",
                            category_id: data.payload.data[0].categories[data.payload.data[0].categories.length - 1].category_id + 1
                        })
                        setQuestionListEnd(temp)
                    }
                },
                (error) => {
                    setIsLoading(false)
                }
            );
    };

    const getReviewQuestion = (questionList) => {
        setIsLoading(true)
        questionServices.getReviewQuestion(props.location.pathname.split("/")[2]).then(
            (data) => {
                setIsLoading(false)
                if (data.length > 0) {
                    if (data[0].is_submit) {
                        history.push("/dashboard")
                    }
                }
                setQuestionDraftData(data, questionList)
            },
            (error) => {
                setIsLoading(false)
            }
        );
    };

    const setQuestionDraftData = (data, questionListing) => {
        if (data.question_id !== undefined && questionListing && data.next_question != null) {
            var lastQuestionId = data.last_question_data.id;
            var categoryId = data.last_question_data.category_id;
            sessionStorage.setItem('lastCategoryId', categoryId);
            sessionStorage.setItem("questionAnswerList", JSON.stringify(data))
            sessionStorage.setItem("lastQuestionId", lastQuestionId)
            setQuestionPosition(questionListing)
        }
        if (data && data.next_question === null) {
          
            setIsCompleted(true)
            setIsShowCategory(parseInt(data.category_id + 1))
            setIsShowPercentProgress(100)
        }

        if (data.next_question !== null && questionListing) {
            var NextcategoryId = data.next_question.category_id;
            setIsShowCategory(NextcategoryId)
            var NextQuestionId = data.next_question.id;
            sessionStorage.setItem("NextQuestionId", NextQuestionId)
            sessionStorage.setItem('NextcategoryId', NextcategoryId);
            // new add
         
            // setIsShowQuestion(NextQuestionId)
            const [Question] = questionListing.filter(val => val.category_id === NextcategoryId).map(value => value.questions.findIndex(val => val.id === NextQuestionId))
            
            setIsShowQuestion(parseInt(Question))

        }
    }

    const setQuestionPosition = async (data) => {
        var lastcategory = sessionStorage.getItem('lastCategoryId');
        // var lastQuestionId = sessionStorage.getItem('lastQuestionId');
        var NextcategoryId = parseInt(sessionStorage.getItem('NextcategoryId'));
        var NextQuestionId = parseInt(sessionStorage.getItem('NextQuestionId'));
        var questionlist1 = JSON.parse(sessionStorage.getItem('questionAnswerList'))
        var questionlist = questionlist1;
        if (NextcategoryId) {

            setIsShowCategory(NextcategoryId);

        }
        if (questionlist && questionlist.next_question !== null) {
            setQuestionAnswerList(questionlist)
            var NextId = parseInt(questionlist.next_question.id);
            setIsQuestionId(NextId)
            setIsActive(lastcategory > 0 ? true : false)


            if (questionlist.total_time_taken !== undefined) {
                var totalTime = questionlist.total_time_taken;
                var m = parseInt(totalTime.split(":")[0]) * 60;
                var s = parseInt(totalTime.split(":")[1])
                var cntr = m + s;
                setCounter(cntr);
                setTimeTakenOnQuestion(totalTime)
            }
            // setIsShowQuestion(parseInt(NextQuestionId))
            const [Question] = data.filter(val => val.category_id === NextcategoryId).map(value => value.questions.findIndex(val => val.id === NextQuestionId))
            setIsShowQuestion(parseInt(Question))

            
        }
    }

    useEffect(() => {
        handleProgressBar()
    }, [ queCategory1 , isShowQuestion, questionListNew]) /* eslint-disable-line*/

    const getTimeDiff = (time, cMinute, cSecond) => {
        var currMin = parseInt(cMinute);
        var currSec = parseInt(cSecond);
        var t = time.split(":");
        var minute = parseInt(t[0]);
        var second = parseInt(t[1]);
        var totalSec = minute * 60 + second;
        var totalCurrSec = currMin * 60 + currSec;
        var diffSec = totalCurrSec - totalSec;
        var min = Math.floor(diffSec / 60);
        min = min < 10 ? "0" + min : min;
        var sec = diffSec % 60;
        sec = sec < 10 ? "0" + sec : sec;
        return min + ":" + sec;
    }

    const handleClickNextFirstCategory = (type) => {

        if (questionAnswerList.question_id !== undefined) {
            questionAnswerList.assessment_id = assesmentId
            questionAnswerList.started_at = new Date()
            questionAnswerList.status = "Incomplete"
        }

        sessionStorage.setItem("questionAnswerList", JSON.stringify(questionAnswerList))
        if (type === "draft") {
            handleSaveDraft("draft")
        } else {
            setIsShowQuestion(0)
            setIsShowCategory(1)
            setIsActive(true)
            handleSaveDraft("next")
        }

    }


    const handleSaveDraft = (type) => {
        let handleSaveDraftData = JSON.parse(sessionStorage.getItem("questionAnswerList"))
        questionServices.submitQuestionAnswer(handleSaveDraftData).then(
            (data) => {
                setIsLoading(false)
            },
            (error) => {
                setIsLoading(false)
            }
        );
    }

    const handleChangeQuestionFistStep = (e, item, categoryId, type, section, type2, id, id2, categoryComplete) => {

        if (e.target.value === "") {
            var temp = questionListNew;
            temp.map((cat, i) => {
                cat.questions.map((que, j) => {
                    if (que.id === item.id) {
                       return que.value = e.target.value
                    }
                    return que
                })
                return cat
            })
            setQuestionListNew([...temp]);
            return true;
        }
        else if (item.type === "Text Question") {
            if (item.valid_type && item.valid_type === "Alphabetic" && !e.target.value.match(validateAlphabate)) {
                return true;
            } else if (item.valid_type && item.valid_type === "Integer" && !e.target.value.match(validateNumbers)) {
                return true;
            }
        }

        sessionStorage.setItem('lastCategoryId', categoryId);
        var isCorrectAns;
        if (item.options.length > 0) {
            item.options.map((val) => {
                if (e.target.value === val.option_id) {
                   return isCorrectAns = val.is_correct
                }
                return val
            })
        }
        if (type === "mcq") {
            setIsOptionQuestionIDMatch(item.id)
            setIsOptionAnswerMatch(e.target.value)
        }
        var tempArr2 = questionAnswerList
        var tempArr =
        {
            question_id: e.target.name,
            option_id: item.type === "MCQ Question" ? e.target.value : "",
            user_id: sessionStorage.getItem("uid"),
            correct: isCorrectAns,
            answertext: item.type !== "MCQ Question" ? e.target.value : "",
            time_taken: timeTakenOnQuestion ? getTimeDiff(timeTakenOnQuestion, minute, second) : `${minute}:${second}`,
            total_time_taken: `${minute}:${second}`,
            assessment_id: assesmentId,
            option_number: Number(e.target.id) + 1
        }
        setTimeTakenOnQuestion(`${minute}:${second}`)
        
        setIsQuestionId(Number(e.target.name))
        sessionStorage.setItem("assessment_started", true)
        setIsShowCategory(id2)
        setIsShowQuestion(id)

        if ((id2 - 1) === questionListNew[questionListNew.length - 1].category_id) {
            sessionStorage.setItem("isCompleteQuestion", true)
            setIsCompleted(true)
        }
        // }
        tempArr2.submitdata = tempArr

        if (section === "first") {
            sessionStorage.setItem("questionAnswerList", JSON.stringify(tempArr2))
        }

        setQuestionAnswerList(tempArr2)
        temp = questionListNew;
        temp.map((cat, i) => {
            return cat.questions.map((que, j) => {
                if (que.id === item.id) {
                    que.value = e.target.value
                }
                return que
            })
             
        })
        setQuestionListNew([...temp]);
        var tempCaluculateTime = timeTakenOnQuestion ? getTimeDiff(timeTakenOnQuestion, minute, second) : `${minute}:${second}`;
        if (questionAnswerList.submitdata.question_id !== undefined) {
            if (questionAnswerList.submitdata.question_id === isQuestionId) {
                questionAnswerList.submitdata.time_taken = tempCaluculateTime
                questionAnswerList.submitdata.total_time_taken = `${minute}:${second}`
                questionAnswerList.submitdata.assessment_id = assesmentId
            }
            sessionStorage.setItem("questionAnswerList", JSON.stringify(questionAnswerList.submitdata))
        }

        if (type === "draft") {
            handleSaveDraft("draft")
        }
        window.scrollTo(0, 0)
        handleSaveDraft("next")
        setCurrentQue(currentQue + 1)
        // setQueCategory1(queCategory1 + 1)
    }

    const setProgressByQuestion = () => {
        const lastCatId = parseInt(sessionStorage.getItem("lastCategoryId"))
        if (isQuestionId !== false && isShowCategory !== 0) {

            questionListNew && questionListNew.map((que) => {
                if (lastCatId === que.category_id) {
                    if (lastCatId < parseInt(isShowCategory)) {

                        setQueCategory1(0)

                    } else {
                        setQueCategory1(que.questions.findIndex(val => val.id === parseInt(isQuestionId)))
                    }
                }
                return que
            })
        }
    }
    const isToggle = useSelector((state) => state.componentReducer.isToggle)
    useEffect(() => {
        setProgressByQuestion()
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isQuestionId , isShowCategory , questionListNew])

    const handleProgressBar = () => {
        const indexCategory = questionListNew && questionListNew.findIndex(val => val.category_id === isShowCategory)
        var div = questionListNew && questionListNew[indexCategory] && questionListNew[indexCategory].questions.length;
        // const lastCatId = parseInt(sessionStorage.getItem("lastCategoryId"))
        const allotedPercentageToCategory = 20
        const firstCategoryId = questionListNew && questionListNew[0].category_id
        const eachQuestionPercent = allotedPercentageToCategory / div
        if (isShowCategory === firstCategoryId) {
            setIsShowPercentProgress(isShowQuestion * eachQuestionPercent)
        } else if (isShowCategory === firstCategoryId + 1) {
            setIsShowPercentProgress(20 + isShowQuestion * eachQuestionPercent)
        } else if (isShowCategory === firstCategoryId + 2) {
            setIsShowPercentProgress(40 + isShowQuestion * eachQuestionPercent)
        } else if (isShowCategory === firstCategoryId + 3) {
            setIsShowPercentProgress(60 + isShowQuestion * eachQuestionPercent)
        } else {
            setIsShowPercentProgress(80 + queCategory1 * eachQuestionPercent)
        }
    }
    const setLocalQuestion = (question_list) => {
        var data = JSON.parse(sessionStorage.getItem("questionAnswerList"));
        var temp = question_list;
        if (temp && temp.length) {
            data && data.length && data.map((item, k) => {
               return temp.map((cat, i) => {
                  return  cat.questions.map((que, j) => {
                        if (que.id === item.question_id) {
                            que.value = item.option_id ? item.option_id : item.answertext
                        }
                        return que
                    })
                })
            });
            setQuestionListNew([...temp]);
        }

    }
    const handleSubmitAnswer = () => {
        var tempQuestionList = JSON.parse(sessionStorage.getItem("questionAnswerList"))
        if (tempQuestionList) {
            tempQuestionList.status = "Completed"
            tempQuestionList.ended_at = new Date()
            tempQuestionList.assessment_id = assesmentId
            delete tempQuestionList.answertext
            delete tempQuestionList.correct
            delete tempQuestionList.question_id
            delete tempQuestionList.saved_as_draft
            delete tempQuestionList.time_taken
            delete tempQuestionList.option_id
            delete tempQuestionList.total_time_taken
            delete tempQuestionList.option_number
        }
        questionServices.submitQuestionAnswer(tempQuestionList).then(
            (data) => {
                console.log(data, "Data After Submit")
                sessionStorage.removeItem("questionAnswerList")
                sessionStorage.removeItem("lastCategoryId")
                sessionStorage.removeItem("isCompleteQuestion")
                setIsActive(false)
                setMinute("00")
                setSecond("00")

                dispatch(showNotification(true, "Assessment submitted successfully", 'success'))
                setIsShowRedireactToDashboardPage(true)
            },
            (error) => {
                dispatch(showNotification(true, error.message ? error.message : "Failure"))
            }
        );
    }

    console.log({questionListEnd:questionListEnd,Instuctions:Instuctions,questionListNew:questionListNew})

    return (
        <div className={profileDetail?.data?.user?.udc_user ? sidebarHoverReducer.isHover ? "page-small dashboard-page-udc" : "dashboard-page-udc" : "assesment-test_sec"}>
        <div className={!isToggle? "user-question-page pt-large" :  "user-question-page"}>
          
        {/* <div className={!isToggle? "user-question-page user-question-page-inner" :  "user-question-page"}> */}
            <Grid className="m-0" style={{ margin: 0 }}>

                <Grid.Row className="align-center">
                    <Grid.Column width={4} className='text-right'>
                        <div>
                            <div>
                                {
                                    !isLoading && !isCompleted &&
                                    <span style={{ marginRight: 20 }} className='btn-sm'>
                                        {
                                            questionListNew && questionListNew.filter((value) => {
                                                return value.category_id === parseInt(isShowCategory)
                                            }).map((val , index) => {
                                                return <span key={index}>{val.questions.findIndex((val, ind) => ind === parseInt(isShowQuestion)) + 1}/{val.questions.length} &nbsp; {val.category}</span>
                                            })
                                        }

                                    </span>
                                }
                            </div>

                        </div>
                    </Grid.Column>
                    <Grid.Column width={7} style={{ margin: "auto" }} className="progress-grid-ql">
                        <div className='user-question-stepper'>

                            {
                                <ProgressBar
                                    filledBackground="green"
                                    percent={isShowPercentProgress}
                                >
                                    {questionListEnd && questionListEnd.map((val, ind) => {
                                        return (<Step transition="scale" key={ind}>
                                            {({ accomplished, index }) => (
                                                <div className={`transitionStep ${isShowCategory === val.category_id ? "accomplished" : null} ${isShowCategory > val.category_id && "greenClass"}`}>
                                                    {val.category !== 'Section-End' ?
                                                        <span key={index}> {isShowCategory === val.category_id ? ind + 1 : isShowCategory < val.category_id ? ind + 1 : <img src={check2} alt="" width="15px" />}</span>
                                                        :
                                                        <span key={index}> {isShowCategory === val.category_id ? "End" : isShowCategory < val.category_id ? "End" : <img src={check2} alt="" width="15px" />}</span>
                                                    }

                                                </div>
                                            )}
                                        </Step>)
                                    })}
                                </ProgressBar>
                            }
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {
                            !isLoading && !isCompleted &&
                            questionListNew &&
                            <div className='stopwatch-card'>
                                <span className='btn-sm'>{`${minute}:${second}`}</span>
                            </div>
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <div className="main-content">
                            {
                                !isCompleted ?
                                    <div>
                                        <div className="question-list" style={{ paddingTop: 20 }}>
                                            <Grid>
                                                <Grid.Row className='p-0'>
                                                    <Grid.Column>

                                                        {
                                                            Instuctions.map((val, ind) => {
                                                                const indexQue = questionListNew && questionListNew.findIndex(val => val.category_id === isShowCategory)
                                                                return (
                                                                    ind === indexQue && <div className="text-center txt-primary" key={ind}>
                                                                        {val.Instructions_1 !== "" ?
                                                                            <>
                                                                                <p className=""><b className='txt-black'>Instructions -</b>{val.Instructions_1} </p>
                                                                                <p className='txt-14'>
                                                                                    {val.Instructions_2}
                                                                                </p>
                                                                            </>
                                                                            :
                                                                            <p className="txt-14"><b className='txt-black txt-15'>Instructions -</b>{val.Instructions_2} </p>
                                                                        }
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>

                                            <Form className="form-question" onSubmit={() => handleClickNextFirstCategory("next")}>
                                                <div>
                                                    <Dimmer active={isLoading} inverted>
                                                        <Loader size='large' inline='centered' >
                                                            Loading...
                                                        </Loader>
                                                    </Dimmer>
                                                </div>
                                                {
                                                    questionListNew && questionListNew.filter((value) => {
                                                        return value.category_id === parseInt(isShowCategory) }).map((val) => val.questions.map((item, index) => 
                                                        {
                                                        //  {
                                                        //     if (isShowQuestion === index) {
                                                                return isShowQuestion === index && <div key={index}>
                                                                    <Form.Group grouped style={{ padding: '0 7px 20px 7px' }} >
                                                                        {
                                                                            item.type === "MCQ Question" &&
                                                                            <>
                                                                                <div>
                                                                                    <Header as="h2" textAlign="center" className="" style={{ marginBottom: 15, marginTop: 15 }}>
                                                                                        <label>

                                                                                            <Markup content={item.label} className="mcq-question-label" />
                                                                                            {
                                                                                                item.image &&
                                                                                                <Image
                                                                                                    src={
                                                                                                        item.image
                                                                                                    }
                                                                                                />
                                                                                            }
                                                                                        </label>


                                                                                    </Header>

                                                                                    <Grid columns={3} style={{ width: "86%" }}>
                                                                                        <Grid.Row>
                                                                                            <Grid.Column>

                                                                                            </Grid.Column>
                                                                                            <Grid.Column style={{ textAlign: "center" }}>

                                                                                            </Grid.Column>
                                                                                            <Grid.Column style={{ textAlign: "end" }}>

                                                                                            </Grid.Column>
                                                                                        </Grid.Row>
                                                                                    </Grid>
                                                                                </div>
                                                                                {/* ${questionListNew[isShowCategory].category.split(" ")[0].toLowerCase()} */}
                                                                                <div className={`mcq-modrate-question category-${val.category.toLowerCase()}`}>
                                                                                    <span className={`txt-16 text-center first-label-category-${val.category.toLowerCase()}`}>{item.options[0].label}</span>
                                                                                    {/* ${questionListNew[isShowCategory].category.split(" ")[0].toLowerCase()} */}
                                                                                    {
                                                                                        item.options.length > 0 &&
                                                                                        item.options.map((radioVal, i) => {
                                                                                            return (

                                                                                                <div className="mcq-label-question" key={i}>

                                                                                                    <div className={
                                                                                                        (item.id === isOptionQuestionIDMatch &&
                                                                                                            radioVal.option_id === isOptionAnswerMatch) || (radioVal.option_id === item.value) ?
                                                                                                            "mcq-question select-mcq-answer"
                                                                                                            :
                                                                                                            "mcq-question"
                                                                                                    }
                                                                                                    >
                                                                                                        <label className="container-label">
                                                                                                            <input type="radio"

                                                                                                                value={radioVal.option_id}
                                                                                                                name={item.id}
                                                                                                                id={i}

                                                                                                                onChange={(value) => handleChangeQuestionFistStep(value, item, isShowCategory, "mcq", "others", "draft", val.questions.length === index + 1 ? 0 : index + 1, val.questions.length === index + 1 ? isShowCategory + 1 : isShowCategory, val.questions.length === index + 1 ? true : false)} />
                                                                                                            <span className="checkmark">{i + 1}</span>
                                                                                                        </label>
                                                                                                    </div>

                                                                                                </div>
                                                                                            )
                                                                                        
                                                                                        })
                                                                                    }
                                                                                    <span className={`txt-16 text-center last-label-category-${val.category.toLowerCase()}`}>{item.options[item.options.length - 1].label}</span>
                                                                                </div>
                                                                            </>
                                                                        }
                                                                        <div style={{ marginTop: 30 }}>

                                                                        </div>
                                                                        {
                                                                            item.type === "Text Question" &&
                                                                            <Form.Input
                                                                                width={8}
                                                                                onChange={(value) => handleChangeQuestionFistStep(value, item, isShowCategory, "text", "others")}
                                                                                name={item.id}
                                                                                value={item.value ? item.value : ''}
                                                                            />
                                                                        }
                                                                        {
                                                                            item.type === "Date Question" &&
                                                                            <Form.Input
                                                                                type="date"
                                                                                name={item.id}
                                                                                onChange={(value) => handleChangeQuestionFistStep(value, item, isShowCategory, "date", "others")}
                                                                                width={4}
                                                                                value={item.value ? item.value : ''}
                                                                            />
                                                                        }
                                                                    </Form.Group>

                                                                    <div>
                                                                    </div>
                                                                    <Header as="h3" className="text-center" style={{ color: "#979a9d", padding: "18px 0 3px 0", background: '#fff' }}>
                                                                        Do not print, store or copy this page
                                                                    </Header>
                                                                    </div>
                                                        //     }
                                                        // }
                                                    }))
                                                }

                                            </Form>

                                        </div>
                                    </div>
                                    :
                                    (!isShowRedireactToDashboardPage || sessionStorage.getItem("isCompleteQuestion")) &&
                                    <>
                                        <div className="question-list" style={{ paddingTop: 1 }}>
                                            <Progress percent={100} attached="top" className="progress-bar-question-list" />
                                            <Header as='h3' textAlign="center">
                                                Please submit your responses.<br /> Thank you.
                                            </Header>
                                            <div style={{ textAlign: "center", marginTop: 30 }}>
                                                <Button
                                                    className="next-button"
                                                    onClick={handleSubmitAnswer}
                                                >
                                                    Submit
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                            }

                            {
                                isShowRedireactToDashboardPage &&
                                <>
                                    <div className="question-list">
                                        <Header as='h2' icon textAlign="center">
                                            You did a great job!
                                            <Icon name='check circle' style={{ color: "#1e1e62cf", marginTop: 30, marginBottom: 30 }} />

                                        </Header>
                                        <div style={{ textAlign: "center", marginTop: 30 }}>
                                            <Button
                                                className="next-button"
                                                onClick={() => history.push("/upgrade-dashboard")}
                                            >
                                                Go to censio Dashboard
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
        </div>
    );
}
