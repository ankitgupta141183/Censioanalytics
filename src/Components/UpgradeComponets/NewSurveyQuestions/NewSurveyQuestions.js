import React, { useState } from "react";
import { Grid, Form, Header, Button, Icon } from "semantic-ui-react";
import "./NewSurveyQuestions.scss";
import { useHistory } from "react-router-dom";
import { fetchAllSurveyQuestions, submitDemographicsQuestions } from '../../../Services/UpgradeSurveyQuestionsServices/UpgradeSurveyQuestionsServices'
import { sessionExpired } from '../../../Actions/questionAction'
// import check2 from "../../../assets/img/check2.png"
import { showNotification } from "../../../Actions/componentActions";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import Loader from "../../CommonComponent/Loader/Loader";

const NewSurveyQuestions = () => {

  const profileDetail = useSelector(state => (state.profileReducer.profileDetail));
  const surveyReducer = useSelector(state => state.surveyQuestionsReducers.surveyData)
  // const [isShowCategory, setIsShowCategory] = useState(7)
  // const [isShowQuestion, setIsShowQuestion] = useState(0)
  const [questionListNew, setQuestionListNew] = useState(surveyReducer || [])
  const dispatch = useDispatch()
  // const [second, setSecond] = useState("00");
  // const [minute, setMinute] = useState("00");
  // const [counter, setCounter] = useState(0);
  const history = useHistory()
  const [submitData, setSubmitData] = useState([])
  const [textAreaQuestion, setTextAreaQuestion] = useState("")
  const [isCompleted, setIsCompleted] = useState(false)
  // const [userProgress, setUserProgress] = useState(0)
  // const [selectedOption, setSelectedOption] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [firstOptionLabels, setFirstOptionLabels] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [textAreaValue, setTextAreaValue] = useState({
    survey_question_id: "",
    question_label: "",
    selected_response: [null],
    user_id: profileDetail ? profileDetail?.data?.user?.id : "",
    answer_text: ""
  })
  const [optionType, setOptionType] = useState("")
  const [isOpenType, setIsOpenType] = useState(false)
  const [isFinalQuestion, setIsFinalQuestion] = useState(false)
  const [screenNo, setScreenNo] = useState(1)

  useEffect(() => {
    if (questionListNew.length > 0) {

      let currentQuestionData = questionListNew.find(que => que.screen_no === screenNo)
      setCurrentQuestion(currentQuestionData)
      if (currentQuestionData?.questions) {
        let stringObj = JSON.stringify(currentQuestionData)
        let cloneFilterOptions = JSON.parse(stringObj)
        let getFirstElemets = cloneFilterOptions?.questions.splice(0, 1)
        setIsFinalQuestion(cloneFilterOptions?.final_ques)
        if ((getFirstElemets[0]?.ques_type && getFirstElemets[0]?.ques_type === 'Open') || getFirstElemets[0]?.ques_type === 'Vertical-select') {
          setTextAreaQuestion(getFirstElemets[0]?.question_label)
          setFirstOptionLabels(getFirstElemets[0]?.options)
          getFirstElemets[0].ques_type === 'Vertical-select' ? setOptionType(getFirstElemets[0].ques_type) : setOptionType("")
        } else {
          setTextAreaQuestion("")
          setFirstOptionLabels(getFirstElemets[0]?.options)
          setOptionType("")
        }

      }

    }
  }, [screenNo, questionListNew])

  useEffect(() => {
    setQuestionListNew(surveyReducer)
  }, [surveyReducer])

  // console.log("questionListNew--", questionListNew)
  // console.log("surveyReducer--", surveyReducer)
  // console.log("profileDetail--", profileDetail?.data?.user?.id)

  // useEffect(() => {
  // 	let intervalId;
  // 	intervalId = setInterval(() => {
  // 		const secondCounter = counter % 60;
  // 		const minuteCounter = Math.floor(counter / 60);

  // 		let computedSecond =
  // 			String(secondCounter).length === 1
  // 				? `0${secondCounter}`
  // 				: secondCounter;
  // 		let computedMinute =
  // 			String(minuteCounter).length === 1
  // 				? `0${minuteCounter}`
  // 				: minuteCounter;

  // 		setSecond(computedSecond);
  // 		setMinute(computedMinute);

  // 		setCounter((counter) => counter + 1);
  // 	}, 1000);
  // 	// }

  // 	return () => clearInterval(intervalId);
  // }, [counter]);

  // const filterGamesToShow = () => {
  // 	let tempIndex;
  // 	let gameIndex = matchGamesToShow.find((items, index) => {

  // 		if (items === assessmentNoReducer?.gameToShow) {
  // 			tempIndex = index + 1
  // 		} else {
  // 			tempIndex = 1
  // 		}
  // 		// setScreenNo(tempIndex)
  // 		console.log('tempIndex--', tempIndex)
  // 	})
  // 	// setScreenNo(tempIndex)
  // 	console.log("gameIndex----------", gameIndex)
  // 	return tempIndex

  // }

  useEffect(() => {
    getAllSurveyQuestion()
    // eslint-disable-next-line
  }, [])

  const getAllSurveyQuestion = async () => {
    setIsLoading(true)
    const allSurveyQuestions = await dispatch(fetchAllSurveyQuestions())

    if (allSurveyQuestions.status === 200 && allSurveyQuestions.data.status !== 422) {
      setIsLoading(false)

    } else {
      setIsLoading(false)
      dispatch(showNotification(true, allSurveyQuestions?.data ? allSurveyQuestions?.data?.message : allSurveyQuestions.error.response.data.error ? allSurveyQuestions?.error?.response?.data.error : "Somthing went wrong."))
      if (allSurveyQuestions?.error?.response?.data?.errors === "Signature has expired") {
        dispatch(sessionExpired("Signature has expired"))
        // SignatureExpired
      }
    }
  }

  const handleOnSubmitData = async () => {
    setIsLoading(true)
    let submitResponse = await submitDemographicsQuestions(submitData, isFinalQuestion ? isFinalQuestion : null)
    if (submitResponse.status === 200 && submitResponse.data.status !== 422) {
      // history.push(Paths.upgradeSurveyQuestions)
      getAllSurveyQuestion()
      setScreenNo(1)
      if (submitResponse?.data?.message?.length > 0 && isFinalQuestion) {
        dispatch(showNotification(true, submitResponse?.data?.message, 'success'))
        history.push('/games-survey')
      }
      setIsLoading(false)
      setSubmitData([])

    } else {
      setIsLoading(false)
      dispatch(showNotification(true, submitResponse?.data?.message ? submitResponse?.data?.message : submitResponse?.error?.response?.data?.message ? submitResponse?.error?.response?.data?.message : "Somthing went wrong."))
    }

  }



  useEffect(() => { screenNo > 12 ? setIsCompleted(true) : setIsCompleted(false) }, [screenNo])

  // useEffect(() => {
  //   setUserProgress(20 * isShowQuestion)
  // }, [isShowQuestion])

  const handleSubmitAnswers = () => {
    handleOnSubmitData()
  }




  const handleChangeQuestionFistStep = (event, mainQuestion, optionValue, screenNo, type) => {
    const { id, value } = event.target
    let optionId = mainQuestion.options.filter((items) => items.label === value)
    let updatedQuestionData = currentQuestion.questions.map(question => {
      if (question.que_id === mainQuestion.que_id) {
        let opt = question.options.map(option => option.id === optionValue.id ? { ...option, checked: optionValue.label } : { ...option, checked: "" })
        return { ...question, options: opt }
      } else {

        return question
      }
    })
    setCurrentQuestion({ ...currentQuestion, questions: updatedQuestionData })
    let submitObj;
    if (type === "Open") {
      setTextAreaValue({
        survey_question_id: id,
        question_label: mainQuestion?.question_label,
        selected_response: [null],
        user_id: profileDetail ? profileDetail?.data?.user?.id : "",
        answer_text: value,
        selected_option_number:optionValue.id
      })
      setIsOpenType(true)

    }
    else {
      submitObj = {
        survey_question_id: id,
        question_label: mainQuestion?.question_label,
        selected_response: [value],
        user_id: profileDetail ? profileDetail?.data?.user?.id : "",
        answer_text: null,
        selected_option_number:optionId[0].id
      }

      if (submitData.length === 0) {
        setSubmitData([...submitData, submitObj])
      } else {
        let inInclude = submitData.filter(data => data.survey_question_id === id)
        if (inInclude.length > 0) {
          let editData = submitData.map(data => data.survey_question_id === id ? { ...submitObj } : data)
          setSubmitData(editData)
        } else {
          setSubmitData([...submitData, submitObj])
        }
      }
      setIsOpenType(false)
    }

  }


  useEffect(() => {
    if (isOpenType) {
      setSubmitData([textAreaValue])
    }
    // eslint-disable-next-line
  }, [textAreaValue])


  const handleNextSubmitOption = async (e) => {
    e.preventDefault()
    setScreenNo((val) => val + 1)
    handleOnSubmitData()
  }

  console.log("submitData-->",submitData)

  return (
    <>
      <div className="survey-questions talwind-dashboard mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[calc(100vw-80px] md:max-w-[calc(100vw-80px)] md:pl-16" >
        <div className="flex flex-col gap-6 transition-all duration-30 md:w-[82%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto">
          {
            // !isLoading && currentQuestion?.questions?.length > 0 && currentQuestion?.questions instanceof Array ?
              <>
                <Grid className="m-0" style={{ margin: 0 }}>
                  <Grid.Row className="align-center">
                    {
                      // !isCompleted &&
                      // <Grid.Column width={4} className='text-right'>
                      // 	<span style={{ marginRight: 20 }} className='btn-sm'>
                      // 		<span >{isShowQuestion < 5 ? isShowQuestion : 5}/5 Section-1</span>
                      // 	</span>
                      // </Grid.Column>
                    }

                    <Grid.Column width={7} style={{ margin: "auto" }} className="progress-grid-ql">
                      <div className='user-question-stepper'>
                        {
                          // <ProgressBar
                          // 	filledBackground="green"
                          // 	percent={userProgress}
                          // >

                          // 	<Step transition="scale">
                          // 		{({ accomplished }) => (
                          // 			<div class={` transitionStep ${isShowQuestion > 5 ? null : 'accomplished'}  ${isShowQuestion >= 5 && 'greenClass'}`}>
                          // 				{
                          // 					isShowQuestion < 5 ? <span> 1</span> : <span> <img src={check2} alt="" width="15px" /></span>
                          // 				}
                          // 			</div>
                          // 		)}
                          // 	</Step>

                          // 	<Step transition="scale">
                          // 		{({ accomplished }) => (
                          // 			<div class={`transitionStep ${isShowQuestion < 5 ? null : "accomplished"}  false`}>
                          // 				<span> 2</span>
                          // 			</div>

                          // 		)}
                          // 	</Step>
                          // </ProgressBar>
                        }
                      </div>
                    </Grid.Column>
                    {
                      !isCompleted &&
                      <Grid.Column width={4}>
                        { /*
										// !isLoading && !isCompleted &&
										// questionListNew &&
										// <div className='stopwatch-card'>
										// 	<span className='btn-sm'>{`${minute}:${second}`}</span>
											// {/* <span className='btn-sm'>{`${'00'}:${'00'}`}</span>
										// </div>
							*/ }

                      </Grid.Column>
                    }

                  </Grid.Row>
                </Grid>

                <Grid >
                  <Grid.Row>
                    <Grid.Column width={16} className='m-auto' >
                      {
                        !isLoading ?
                          <div className="main-content">
                            <div>
                              <div className="question-list_survey" style={{ paddingTop: 20 }}>


                                <Form className="form-question" onSubmit={(e) => { handleNextSubmitOption(e) }}  >

                                  <div
                                    className="p-6 w-full bg-white rounded-2xl dark:bg-[#212121] transition duration-300 overflow-x-auto"
                                  >
                                    <div className="font-rubik font-semibold text-center pb-5 text-lg text-[#1A1919] md:text-lg dark:text-[#F5F5F5] border-b">
                                      {/* How important were each of the following reasons in your decision to attend UDC? */}
                                      {
                                        currentQuestion && currentQuestion.parent_question && currentQuestion.parent_question

                                      }
                                    </div>
                                    <div className="table-responsive">
                                      <table className="w-full">
                                        <thead
                                          className="border-b-[1px] border-rgba(32,42,49,0.3) dark:border-[#656575]"
                                        >
                                          {!textAreaQuestion && <th className="pb-4 pt-4 px-2 border-r-[1px] border-rgba(32,42,49,0.3) dark:border-[#656575]" style={{ width: '15%' }}></th>
                                          }
                                          {
                                            textAreaQuestion && <th className="pb-4 pt-4 px-2 text-[#656575] font-semibold" colSpan="6">{textAreaQuestion}</th>
                                          }
                                          {
                                            firstOptionLabels?.length > 0 &&
                                            !textAreaQuestion &&
                                            firstOptionLabels instanceof Array &&
                                            firstOptionLabels.map((optionLabels, index) => {

                                              return (<>
                                                {
                                                  // textAreaQuestion ?
                                                  //   <th className="pb-4 pt-4 px-2 text-[#656575] font-semibold" colSpan="6">{textAreaQuestion}</th>
                                                  //   :
                                                  <th className="pb-4 pt-4 px-2 text-[#656575] font-semibold" style={{ width: '10%' }}>{optionLabels?.label}</th>
                                                }
                                              </>
                                              )
                                            })
                                          }
                                        </thead>
                                        <tbody className="border-b">

                                          {
                                            currentQuestion && currentQuestion.questions.length > 0 &&
                                            currentQuestion.questions.map((questionData, index) => {
                                              return (<>
                                                <tr className={`${optionType ? "d-flex flex-col" : ""}`} >
                                                  {
                                                    textAreaQuestion ?
                                                      <>
                                                        <td></td>
                                                      </>
                                                      :
                                                      <td className="text-center p-4 dark:text-[#F5F5F5] border-r-[1px] border-rgba(32,42,49,0.3) dark:border-[#656575]">
                                                        {
                                                          questionData.question_label
                                                        }
                                                      </td>

                                                  }


                                                  {
                                                    questionData.options.length > 0 &&
                                                    questionData.options.map((radioValues, redioIndex) => {
                                                      return (<>
                                                        <td className={`${optionType ? "w-full" : ""} text-center p-4 dark:text-[#F5F5F5]`}>
                                                          <div class={`${optionType ? 'flex flex-row-reverse items-center' : ''}`}>
                                                            {
                                                              questionData?.ques_type === "Open" ?
                                                                <>

                                                                  {radioValues.label === "Text" &&
                                                                    <textarea
                                                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                                                      value={textAreaValue?.answer_text}
                                                                      name={questionData?.que_id}
                                                                      id={questionData?.que_id}
                                                                      placeholder="Please write answer."
                                                                      onChange={(value) => handleChangeQuestionFistStep(value, questionData, radioValues, value.screen_no, questionData?.ques_type)}
                                                                    />
                                                                  }

                                                                </>
                                                                : questionData?.ques_type === "Vertical-select" ?
                                                                  <React.Fragment key={redioIndex}>
                                                                    <p className="flex-1 h-auto text-start pl-3">{radioValues?.label}</p>
                                                                    <input
                                                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 m-0"
                                                                      type='radio'
                                                                      value={radioValues?.label}
                                                                      name={'question' + questionData.que_id + screenNo}
                                                                      id={questionData?.que_id}
                                                                      checked={radioValues.checked === radioValues?.label}
                                                                      onChange={(value) => handleChangeQuestionFistStep(value, questionData, radioValues)}
                                                                    />
                                                                  </React.Fragment>
                                                                  :
                                                                  <React.Fragment key={redioIndex}>
                                                                    <input
                                                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                                                      type='radio'
                                                                      value={radioValues?.label}
                                                                      name={'question' + questionData.que_id + screenNo}
                                                                      id={questionData?.que_id}
                                                                      checked={radioValues.checked === radioValues?.label}
                                                                      onChange={(value) => handleChangeQuestionFistStep(value, questionData, radioValues)}
                                                                    />

                                                                  </React.Fragment>
                                                            }

                                                          </div>
                                                        </td>


                                                      </>)

                                                    })
                                                  }

                                                </tr>
                                              </>)
                                            })
                                          }



                                        </tbody>
                                      </table>
                                    </div>
                                  </div>

                                  <div className="pt-4 text-center">
                                    {
                                      !isFinalQuestion ?
                                        <Button type="submit" className="yellow-button" >
                                          <Icon name="arrow right" style={{ margin: '0' }} /> Next
                                        </Button> :
                                        <div style={{ textAlign: "center", marginTop: 30 }}>
                                          <Button
                                            className="next-button"
                                            onClick={(e) => { handleSubmitAnswers(e) }}
                                          >
                                            Submit
                                          </Button>
                                        </div>
                                    }



                                  </div>
                                  <div style={{ background: 'rgb(245 245 245 / 0%)' }}>

                                    <Header as="h3" className="text-center" style={{ color: "#979a9d", backgroundColor: '#ffffff', padding: "18px 0 3px 0" }}>
                                      Do not print, store or copy this page
                                    </Header>
                                  </div>
                                </Form>

                              </div>

                            </div>

                          </div>
                          : <Loader />
                        // <>
                        //   <div className="question-list m-auto " style={{ paddingTop: 1, backgroundColor: '#ffffff', padding: '3%' }}>
                        //     <Progress percent={100} attached="top" className="progress-bar-question-list" />
                        //     <Header as='h3' textAlign="center">
                        //       Please submit your responses.<br /> Thank you.
                        //     </Header>
                        //     <div style={{ textAlign: "center", marginTop: 30 }}>
                        //       <Button
                        //         className="next-button"
                        //         onClick={(e) => { handleSubmitAnswers(e) }}
                        //       >
                        //         Submit
                        //       </Button>
                        //     </div>
                        //   </div>
                        // </>
                      }

                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </>
          }
        </div>

      </div>

    </>
  )
}

export default NewSurveyQuestions
