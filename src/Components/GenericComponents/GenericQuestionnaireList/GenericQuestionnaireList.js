import './_GenericQuestionnaireList.scss'
import React, { useState } from "react";
import { Grid, Form, Header, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { submitGenericQuestionsDemographics, fetchFeedBackAndQuestionsData } from '../../../Services/GenericSevices/GenericSevices'

import { sessionExpired } from '../../../Actions/questionAction'
// import check2 from "../../../assets/img/check2.png"
import { showNotification } from "../../../Actions/componentActions";
import { useSelector, useDispatch } from 'react-redux';
// import questionData from './questionData.json'
import { useEffect } from "react";
// import backEndresponse from './backEndresponse.json'
import Loader from "../../CommonComponent/Loader/Loader";
import { Paths } from '../../routes/routePaths';

const GenericQuestionnaireList = ({ isHeaderManu }) => {
  const profileDetail = useSelector(state => (state.profileReducer.profileDetail));
  const mturkSurveyReducer = useSelector(state => state.assessmentMturkQuestionsReducers.mturkData)
  // const { assessmentNoReducer } = useSelector(state => state)
  // const [isShowCategory, setIsShowCategory] = useState(7)
  // const [isShowQuestion, setIsShowQuestion] = useState(0)


  // const [questionListNew, setQuestionListNew] = useState(questionData)
  const [questionListNew, setQuestionListNew] = useState([])
  // const [questionListNew, setQuestionListNew] = useState(backEndresponse || [])
  const dispatch = useDispatch()
  // const [second, setSecond] = useState("00");
  // const [minute, setMinute] = useState("00");
  // const [counter, setCounter] = useState(0);
  const history = useHistory()
  const [submitData, setSubmitData] = useState([])
  const [textAreaQuestion, setTextAreaQuestion] = useState("")
  // const [isDataSubmit, setIsDataSubmit] = useState(false)
  // const [userProgress, setUserProgress] = useState(0)
  // const [selectedOption, setSelectedOption] = useState("")
  // const assessmentNoMatch = [1, 2, 3, 4, 5]
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
  const [isFinalQuestion, setIsFinalQuestion] = useState(true)


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
    // setQuestionListNew(mturkSurveyReducer)
    // setQuestionListNew(backEndresponse)
  }, [mturkSurveyReducer])

  useEffect(() => {
    getAllMturkSurveyQuestion()
    // eslint-disable-next-line
  }, [])

  const getAllMturkSurveyQuestion = async () => {
    setIsLoading(true)
    const allSurveyQuestions = await dispatch(fetchFeedBackAndQuestionsData("questionnaire"))

    if (allSurveyQuestions.status === 200 && allSurveyQuestions.data.status !== 422) {
      setIsLoading(false)
      setQuestionListNew(allSurveyQuestions.data)
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
    let groupBypayload = {
      questionnaire_final_ques: isFinalQuestion
    }
    let submitResponse = await submitGenericQuestionsDemographics(submitData, isFinalQuestion ? groupBypayload : null)
    if (submitResponse.status === 200 && submitResponse.data.status !== 422) {
      getAllMturkSurveyQuestion()
      setScreenNo(1)
      if (submitResponse?.data?.message?.length > 0 && isFinalQuestion) {
        dispatch(showNotification(true, submitResponse?.data?.message, 'success'))
        history.push(Paths.GenericDashBoard)
      }
      setIsLoading(false)
      setSubmitData([])

    } else {
      setIsLoading(false)
      dispatch(showNotification(true, submitResponse?.data?.message ? submitResponse?.data?.message : submitResponse?.error?.response?.data?.message ? submitResponse?.error?.response?.data?.message : "Somthing went wrong."))
    }

  }



  // useEffect(() => {
  //   setUserProgress(20 * isShowQuestion)
  // }, [isShowQuestion])

  const handleSubmitAnswers = () => {
    handleOnSubmitData() // submit data

  }




  const handleChangeQuestionFistStep = (event, mainQuestion, optionValue, screenNoParam, type) => {
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

    if (type === "Open") {
      setTextAreaValue({
        survey_question_id: id,
        question_label: mainQuestion?.question_label,
        selected_response: [null],
        user_id: profileDetail ? profileDetail?.data?.user?.id : "",
        answer_text: value,
        selected_option_number: optionId[0].id
      })
      setIsOpenType(true)

    }
    else {
      let getUserId = sessionStorage.getItem('assessmentUserId' || '')
      let answerObj = {
        user_id: profileDetail ? profileDetail?.data?.user?.id : parseInt(getUserId),
        question_label: mainQuestion?.question_label,
        selected_response: [value],
        answer_text: null,
        generic_question_id: parseInt(id),
        selected_option_number: optionId[0].id
      }

      if (submitData.length === 0) {
        setSubmitData([...submitData, answerObj])
      } else {
        let inInclude = submitData.filter(data => data.generic_question_id === parseInt(id))
        if (inInclude.length > 0) {
          let editData = submitData.map(data => data.generic_question_id === parseInt(id) ? { ...answerObj } : data)
          setSubmitData(editData)
        } else {
          setSubmitData([...submitData, answerObj])
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
    handleOnSubmitData()   // function who submit the data
  }

  

  return (
    <>
      <div className="survey-questions talwind-dashboard mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[calc(100vw-80px] md:max-w-[calc(100vw-80px)]" >
        <div
          className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto md:w-full lg:w-full xl:w-full 2xl:w-full 3xl:w-full"
            : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"}
        >
          {
            // !isLoading && currentQuestion?.questions?.length > 0 && currentQuestion?.questions instanceof Array ?
            <>
              <Grid className="m-0" style={{ margin: 0 }}>
                <Grid.Row className="align-center">

                  {
                    <Grid.Column width={4}>
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
                                      </Button>
                                      :
                                      <div style={{ textAlign: "center", marginTop: 30 }}>
                                        <div className=" text-[#656575] font-semibold pb-3">
                                          Please submit your responses to this survey by clicking SUBMIT below.
                                          Thank you!
                                        </div>
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

export default GenericQuestionnaireList
