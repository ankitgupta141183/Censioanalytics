import React, { useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Grid, Form, Header, Progress, Button, Icon } from "semantic-ui-react";
import "./AssessmentQuestionsList.scss";
import { Markup } from 'interweave';
import { useHistory} from "react-router-dom";
import check2 from "../../../assets/img/check2.png"
import { showNotification } from "../../../Actions/componentActions";
import { useSelector, useDispatch } from 'react-redux';
import questionData from './questionData.json'
import { useEffect } from "react";
import GameVideo from "../../gameVideo/GameVideo";
// import { submitEachAnswer } from '../../../Services/AssessementQuestionsServices'


const AssessmentQuestionsList = ({ isHeaderManu }) => {

	const Instuctions = [
		{
			assesment_no: 1,
			Instruction: 'Please indicate how much you agree with the following statements as they apply to you over the last month. If a particular situation has not occurred recently, answer according to how you think you would have felt.'
		},
		{
			assesment_no: 2,
			Instruction: 'On a scale of 1-4, where 1 is Not at all true of me and 4 is very true of me, please rate your LEVEL OF AGREEMENT with the statements below. '
		}
	]

	const profileDetail = useSelector(state => (state.profileReducer.profileDetail));
	const { assessmentNoReducer } = useSelector(state => state)
	const [isShowQuestion, setIsShowQuestion] = useState(0)

	// const [questionListEnd, setQuestionListEnd] = useState(questionData)
	const [questionListNew, setQuestionListNew] = useState(questionData)
	const dispatch = useDispatch()
	// const [second, setSecond] = useState("00");
	// const [minute, setMinute] = useState("00");
	// const [counter, setCounter] = useState(0);
	const history = useHistory()
	const [submitData, setSubmitData] = useState([])
	// const [scalUpdate, scaleUpdate] = useState(0)
	const [isCompleted, setIsCompleted] = useState(false)
	const [isDataSubmit, setIsDataSubmit] = useState(false)
	const [GameVideoPopUp, setGameVideoPopup] = useState(false)
	const [userProgress, setUserProgress] = useState(0)
	const [selectedOption, setSelectedOption] = useState("")
	const assessmentNoMatch = [1, 2, 3, 4, 5]

	// const [assesmentNo, setAssesmentNo] = useState(assessmentNoMatch.includes(assessmentNoReducer?.assessementNo) ? assessmentNoReducer.assessementNo : 1)
	const assesmentNo = assessmentNoMatch.includes(assessmentNoReducer?.assessementNo) ? assessmentNoReducer.assessementNo : 1

	useEffect(()=>{
		setQuestionListNew(questionData)
	},[])

	useEffect(() => {
		if (submitData.length >= 10) {
			setIsCompleted(true)
		} else {
			setIsCompleted(false)
		}
	}, [submitData])

	useEffect(() => {
		setUserProgress(10 * submitData.length)
		// eslint-disable-next-line
	}, [isShowQuestion])

	const handleSubmitAnswers = () => {
		dispatch(showNotification(true, "Assessment submitted successfully", 'success'))
		setIsDataSubmit(true)
	}

	

	const handleRedirectionHome = () => {
		history.push('/')
	}

	const handleChangeQuestionFistStep = (e, item, categoryId, optionLabel) => {

		// let isCorrectAns;
		// if (item.options.length > 0) {
		// 	item.options.map((val) => {
		// 		if (e.target.value === val.option_id) {
		// 			return isCorrectAns = val.is_correct
		// 		}
		// 		return val
		// 	})
		// }

		let getUserId = sessionStorage.getItem('assessmentUserId' || '')
		let answerObj = {
			user_id: profileDetail?.data ? profileDetail?.data?.user.id : parseInt(getUserId),
			Assessment_no: assesmentNo,
			que_label: item.label,
			que_no: parseInt(e.target.name),
			option_label: optionLabel,
			option_no: parseInt(e.target.value)
		}
		setSelectedOption(answerObj)
	}

	const handleNextSubmitOption = async (e) => {
		e.preventDefault()

		if (selectedOption) {
			handleSubmitEachAnswer(selectedOption)
			setSubmitData([...submitData, selectedOption])
			setSelectedOption("")
		} else {
			let submitObj = {
				user_id: profileDetail?.data?.user.id,
				Assessment_no: assesmentNo,
				que_label: "",
				que_no: null,
				option_label: "no response",
				option_no: 7
			}

			// const cloneQuestionListNew = [...questionListNew]
			// const last = submitData[submitData.length - 1]

			// let mainQustionListFilter = questionListNew.filter((items) => {
			// 	if (items.assessment_no == assesmentNo) {
			// 		let res = items.questions.find((el) => {
			// 			if (last == undefined) {
			// 				return el.id === 1
			// 			}
			// 			else {
			// 				return el.id === last.que_no + 1
			// 			}

			// 		})
			// 		submitObj.que_no = res.id
			// 		submitObj.que_label = res.label

			// 	}
			// })
			handleSubmitEachAnswer(submitObj)
			setSubmitData([...submitData, submitObj])
		}

		setIsShowQuestion((val) => val + 1)
	}


	const handleSubmitEachAnswer = async (payload) => {
		// let eachSubmitAnswerStatus = await submitEachAnswer(payload)
	}


	return (
		<>

			<div className="assesment-test_sec" style={{ margin: `${isHeaderManu ? 0 : ""}` }}>

				{
					!isDataSubmit ?
						<>
							<Grid className="m-0" style={{ margin: 0 }}>
								<Grid.Row className="align-center">
									{
										!isCompleted &&
										<Grid.Column width={4} className='text-right'>
											<span style={{ marginRight: 20 }} className='btn-sm'>
												<span >{isShowQuestion}/10 Section-1</span>
											</span>
										</Grid.Column>
									}

									<Grid.Column width={7} style={{ margin: "auto" }} className="progress-grid-ql">
										<div className='user-question-stepper'>
											{
												<ProgressBar
													filledBackground="green"
													percent={userProgress}
												>

													<Step transition="scale">
														{({ accomplished }) => (
															<div class={` transitionStep ${isShowQuestion > 10 ? null : 'accomplished'}  ${isShowQuestion >= 10 && 'greenClass'}`}>
																{
																	isShowQuestion < 10 ? <span> 1</span> : <span> <img src={check2} alt="" width="15px" /></span>
																}
															</div>
														)}
													</Step>

													<Step transition="scale">
														{({ accomplished }) => (
															<div class={`transitionStep ${isShowQuestion < 10 ? null : "accomplished"}  false`}>
																<span> End</span>
															</div>

														)}
													</Step>
												</ProgressBar>
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
									<Grid.Column width={13} className='m-auto' >
										{
											!isCompleted ?
												<div className="main-content">
													<div>
														<div className="question-list yallo-button-for-next" style={{ paddingTop: 20 }}>
															<Grid>
																<Grid.Row className='p-0 '>
																	<Grid.Column>
																		{
																			Instuctions.map((val, ind) => {
																				return (
																					val.assesment_no === assesmentNo &&
																					<div className="text-center txt-primary">
																						<>
																							<p><b className='txt-black'>Instructions - </b>{val.Instruction} </p>
																							<p className=''>
																								{/* {val.Instruction} */}
																							</p>
																						</>

																					</div>
																				)
																			})
																		}
																	</Grid.Column>

																</Grid.Row>
															</Grid>
															<Form className="form-question" onSubmit={(e) => { handleNextSubmitOption(e) }}  >
																{
																	questionListNew && questionListNew.filter((value) => {
																		return value.assessment_no === assesmentNo
																	}).map((val) => {
																		return val.questions.map((questionData, index) => {
																			return isShowQuestion === index && <>
																				<Form.Group grouped style={{ padding: '0 7px 20px 7px' }} >
																					<div>
																						<Header as="h2" textAlign="center" className="" style={{ marginBottom: 15, marginTop: 15 }}>
																							<label name="questionLabel">
																								<Markup content={questionData.label} className="mcq-question-label" />
																							</label>
																						</Header>
																						<div className={`mcq-modrate-question category-${val.category.toLowerCase()}`}>
																							{/* <span className={`txt-16 text-center first-label-category-${val.category.toLowerCase()}`}>{questionData.options[0].label}</span> */}
																							{questionData.options.length > 0 &&
																								questionData.options.map((radioValues, redioIndex) => {
																									return (
																										<div className="mcq-label-question" key={redioIndex}>

																											<p  >{radioValues?.label}</p>

																											<div>
																												<label className="container-label">
																													<input type="radio"
																														value={radioValues.option_No}
																														name={questionData.id}
																														id={redioIndex}
																														onChange={(value) => handleChangeQuestionFistStep(value, questionData, radioValues, radioValues?.label)}
																													/>
																													<span className="checkmark">{ }</span>
																												</label>

																											</div>

																										</div>
																									)
																								})
																							}

																						</div>
																					</div>

																				</Form.Group>
																				<div style={{ background: 'rgb(245 245 245 / 0%)' }}>
																					<div className="pt-4 text-center">
																						<Button className="yellow-button" >
																							<Icon name="arrow right" style={{ margin: '0' }} /> Next
																						</Button>
																					</div>
																					<Header as="h3" className="text-center" style={{ color: "#979a9d", backgroundColor: '#ffffff', padding: "18px 0 3px 0" }}>
																						Do not print, store or copy this page
																					</Header>
																				</div>
																			</>
																		})
																	})
																}
															</Form>

														</div>

													</div>

												</div>
												:
												<>
													<div className="question-list m-auto " style={{ paddingTop: 1 }}>
														<Progress percent={100} attached="top" className="progress-bar-question-list" />
														<Header as='h3' textAlign="center">
															Please submit your responses.<br /> Thank you.
														</Header>
														<div style={{ textAlign: "center", marginTop: 30 }}>
															<Button
																className="next-button"
																onClick={(e) => { handleSubmitAnswers(e) }}
															>
																Submit
															</Button>
														</div>
													</div>
												</>
										}

									</Grid.Column>
								</Grid.Row>
							</Grid>
						</>
						:
						<>
							<div className="question-list m-auto " style={{ paddingTop: 1 }}>
								<Progress percent={100} attached="top" className="progress-bar-question-list" />
								<Header as='h3' textAlign="center">
									Thank you. submitting<br />

								</Header>
								<div style={{ textAlign: "center", marginTop: 30 }}>
									<Button
										className="next-button"
										onClick={(e) => { handleRedirectionHome(e) }}
									>

										Go to home page.
									</Button>
								</div>
							</div>
						</>
				}

				<GameVideo
					GameVideoPopUp={GameVideoPopUp} setGameVideoPopup={setGameVideoPopup}
				/>
			</div>

		</>
	)
}

export default AssessmentQuestionsList
