
// AssessmentMturKFeedback
import React, { useState, useEffect } from "react";
import './_GenericFeedback.scss'
// import FeedbackQuestions from './feedbacKDummy.json'
import { Grid, Form, Button, Icon } from "semantic-ui-react";
import { showNotification } from "../../../Actions/componentActions";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Loader from '../../CommonComponent/Loader/Loader';
import { useSelector } from 'react-redux';
import { Paths } from '../../routes/routePaths'
import {submitGenericQuestionsDemographics , fetchFeedBackAndQuestionsData }  from '../../../Services/GenericSevices/GenericSevices'



const GenericFeedback = ({ isHeaderManu }) => {
  const [questionListNew, setQuestionListNew] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState("")
  const { profileReducer } = useSelector(state => state)
  const profileDetail = profileReducer?.profileDetail?.data?.user
  const [screenNo, setScreenNo] = useState(1)
  const [firstOptionLabels, setFirstOptionLabels] = useState([])
  const [textAreaQuestion, setTextAreaQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitData, setSubmitData] = useState([])
  const [isFinalQuestion, setIsFinalQuestion] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    if (questionListNew.length > 0) {
      let currentQuestionData = questionListNew.find(que => que.screen_no === screenNo)
      setCurrentQuestion(currentQuestionData)
      if (currentQuestionData?.questions && currentQuestionData?.questions.length > 0) {
        let stringObj = JSON.stringify(currentQuestionData)
        let cloneFilterOptions = JSON.parse(stringObj)

        let getFirstElemets = cloneFilterOptions?.questions.splice(0, 1)
        setIsFinalQuestion(cloneFilterOptions?.final_ques)

        if (getFirstElemets[0].ques_type && getFirstElemets[0].ques_type === 'Open') {
          setTextAreaQuestion(getFirstElemets[0]?.question_label)
          setFirstOptionLabels(getFirstElemets[0]?.options)
        } else {
          setTextAreaQuestion("")
          setFirstOptionLabels(getFirstElemets[0]?.options)
        }

      }

    }
  }, [screenNo, questionListNew])


  useEffect(() => {
    getAllMturkFeeBackQuestions()
    // eslint-disable-next-line
  }, [])

  const getAllMturkFeeBackQuestions = async () => {
    setIsLoading(true)
    const feedbackQuestionsOptions = await dispatch(fetchFeedBackAndQuestionsData("feedback"))
    if (feedbackQuestionsOptions.status === 200 && feedbackQuestionsOptions.data.status !== 422) {
      setQuestionListNew(feedbackQuestionsOptions?.data)
      setScreenNo(1)
      setIsLoading(false)
    } else {
      setIsLoading(false)
      dispatch(showNotification(true, feedbackQuestionsOptions?.data ? feedbackQuestionsOptions?.data?.message : feedbackQuestionsOptions.error.response.data.error ? feedbackQuestionsOptions?.error?.response?.data.error : "Somthing went wrong."))
    }
  }



  const handleChangeQuestionFistStep = (event, mainQuestion, optionValue) => {
    const { id,  value } = event.target
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
    let getUserId = sessionStorage.getItem('assessmentUserId' || '')
    let answerObj = {
      user_id: profileDetail ? profileDetail?.id : parseInt(getUserId),
      question_label: mainQuestion?.question_label,
      selected_response: value.length > 1 ? value : optionValue?.id,
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
  }



  const handleNextSubmitOption = async (e) => {
    e.preventDefault()
    setScreenNo((val) => val + 1)
    handleOnSubmitData()
  }

  const handleSubmitAnswers = () => {
    handleOnSubmitData()
  }

  const handleOnSubmitData = async () => {
    setIsLoading(true)
    let groupBypayload = {
      feedback_final_ques: isFinalQuestion
    }
    let submitResponse = await submitGenericQuestionsDemographics(submitData, isFinalQuestion ? groupBypayload : null)
    if (submitResponse.status === 200 && submitResponse.data.status !== 422) {
      getAllMturkFeeBackQuestions()
      if (submitResponse?.data?.message?.length > 0 && isFinalQuestion) {
        dispatch(showNotification(true, submitResponse?.data?.message, 'success'))
        history.push(Paths.GenericGamesAndSurvey)
      }
      setIsLoading(false)
      setSubmitData([])

    } else {
      setIsLoading(false)
      dispatch(showNotification(true, submitResponse?.data?.message ? submitResponse?.data?.message : submitResponse?.error?.response?.data?.message ? submitResponse?.error?.response?.data?.message : "Somthing went wrong."))
    }

  }

 
  return (
    <>

      <main
        className="talwind-dashboard max-w-xs mx-auto pt-24 pb-20 flex flex-col gap-6 w-full transition-all duration-300 sm:max-w-[420px] md:max-w-[calc(100vw-80px)] md:pl-16"
      >
        <div
          id="main_section"
          className={isHeaderManu ? "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto md:w-full lg:w-full xl:w-full 2xl:w-full 3xl:w-full"
            : "flex flex-col gap-6 transition-all duration-30 md:w-[72%] lg:w-[79%] xl:w-[84.5%] 2xl:w-[86.5%] 3xl:w-[90%] md:ml-auto"}
        >
          <Grid >
            <Grid.Row>
              <Grid.Column width={16} className='m-auto' >

                <div className="main-content">
                  <div>
                    <div className="question-list yallo-button-for-next" style={{ paddingTop: 20 }}>

                      {
                        !isLoading && currentQuestion?.questions?.length > 0 ?
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
                                      firstOptionLabels.length > 0 &&
                                      firstOptionLabels instanceof Array &&
                                      firstOptionLabels.map((optionLabels, index) => {

                                        return (<>
                                          {
                                            textAreaQuestion ?
                                              <th className="pb-4 pt-4 px-2 text-[#656575] font-semibold" colSpan="6">{textAreaQuestion}</th>
                                              :
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
                                          <tr>
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

                                                  <td className="text-center p-4 dark:text-[#F5F5F5]">
                                                    <div class="">
                                                      {
                                                        questionData?.ques_type === "Open" ?
                                                          <>

                                                            {radioValues.label === "Text" &&
                                                              <textarea
                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                                                // value={radioValues?.id}
                                                                name={questionData?.que_id}
                                                                id={redioIndex}
                                                                placeholder="Please write answer."
                                                                onChange={(value) => handleChangeQuestionFistStep(value, questionData, radioValues)} Phandle
                                                              />
                                                            }

                                                          </> :
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

                            {
                              !isFinalQuestion ?
                                <div className="pt-4 text-center">
                                  <Button type="submit" className="yellow-button" >
                                    <Icon name="arrow right" style={{ margin: '0' }} /> Next
                                  </Button>

                                </div> :
                                <>
                                  <div style={{ textAlign: "center", marginTop: 30 }}>
                                    <Button
                                      className="next-button"
                                      onClick={(e) => { handleSubmitAnswers(e) }}
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </>

                            }



                          </Form>
                          : isLoading && <Loader />

                      }

                    </div>

                  </div>

                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid >
        </div >
      </main >
    </>
  )
}

export default GenericFeedback;