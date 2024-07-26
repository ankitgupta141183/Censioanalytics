import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Cable from './Cable';
// import UserBadge from '../../Components/UserBadge/UserBadge';
import { ActionCable } from 'react-actioncable-provider';


export default ({  }) => {
    const dispatch = useDispatch()
    const [isOpenChatBox, setIsOpenChatBox] = useState(false)
    const userConversations = useSelector(state => state)
    const [conversations, setConversations] = useState(userConversations);
    const [activeChatBox, setActiveChatBox] = useState([]);
    const [searchVal, setContactSearchVal] = useState('');

    const [openDotMenu, setOpenDotMenu] = useState("");

    const currentUser = "";



    const container = useRef()

    // const deactivate = event => {
    //     if (!trigger) {
    //         return
    //     }

    //     const notificationsContainer = event.target.closest('.notification-list')

    //     if (
    //         event.target !== trigger.current &&
    //         (trigger.current && !trigger.current.contains(event.target)) &&
    //         event.target !== container.current &&
    //         !notificationsContainer
    //     ) {
    //         stateHandler(false)
    //     }
    // }

    useEffect(() => {
        (async () => {
            // await fetchConversations()
        })();
    }, []);

    const updateScroll = (id) => {
        // if (typeof window !== 'undefined') {
        //     var element = window.document.getElementById(`msg-container__${id}`);
        //     if (element) {
        //         element.scrollIntoView();
        //     }
        // }
    }

    const handleReceivedMessage = response => {
        // const { message } = response;
        // let newState = Object.assign([], conversations)
        // let conversation = newState.find(
        //   conversation => conversation.id === message.conversation_id
        // )

        // if(conversation.messages.find(a => a.id === message.id)) {
        // } else {
        //   conversation.messages = [...conversation.messages, message];      
        // }

        // if(response.message.user_id !== currentUser.id){
        //     var audio = document.getElementById('msg-tune')
        //     if(audio) {
        //         audio.play();
        //     }
        // }

        // if(activeChatBox.indexOf(response.message.conversation_id) > -1 && response.message.user_id !== currentUser.id && response.message.conversation_uuid) {
        //     updateConversation(response.message.conversation_uuid)
        // }
        // setConversations(newState)
        // dispatch(setConversationsData(newState))
        // setTimeout(updateScroll(conversation.uuid), 2000);
    }

    const updateConversation = async (conversationId = '') => {
        // const response = await API.updateConversation({token, conversationId})
        // if(response.succes) {
        //     // await fetchConversations()
        // }
    }

    const handleClickMeg = async (val) => {
        // var tempArr = Object.assign([], activeChatBox)
        // if(tempArr.indexOf(val.id) < 0) {
        //     if((tempArr.length > 1)){
        //         tempArr.reverse().pop()
        //         tempArr.push(val.id)
        //     } else if(tempArr.length < 2){
        //         tempArr.push(val.id)
        //     }
        // }
        // // await updateConversation(val.uuid)
        // setActiveChatBox(tempArr);
        // setIsOpenChatBox(true)
    }

    const getActiveChat = (id) => {
        // return conversations.find(convo => convo.id === id) || {}
    }

    const createConversations = () => {
        // const response = await API.createConversations({ token, id })
        // closeModal();
        // fetchConversations()
    }

    // const fetchConversations =  async () => {
    //     const response = await API.fetchConversations({'token': token})
    //     if(response) {
    //         setConversations(response)
    //         dispatch(setConversationsData(response))
    //     }
    // }

    const handleReceivedConversation = (response) => {
        debugger
        // const { conversation } = response;
        // if(conversation.receiver.id === currentUser.id || conversation.sender.id === currentUser.id) {
        //     let newState = Object.assign([], conversations);
        //     const hasConv = newState.find(a => a.id === conversation.id)
        //     if(!hasConv) {
        //         newState.push(conversation)
        //         setIsOpenChatBox(!isOpenChatBox)
        //         setConversations(newState)
        //         dispatch(setConversationsData(newState))
        //         activeChatBox.push(conversation.id)
        //         setActiveChatBox(activeChatBox)
        //     }
        // }
    }

    const handleCreateMessage =  (e) => {
        e.preventDefault()
        // const response = await API.createMessage({'token': token, 'text': message, 'conversation_id': conversationID, "user_id": currentUser.id})
        // if(response){
        //     fetchConversations()
        //     setTimeout(updateScroll(conversationID), 2000);
        // }
    }

    const handleClickClose =(index) => {
        // var tempArr = activeChatBox
        // tempArr.splice(index, 1)
        // setActiveChatBox([...tempArr])
    }


    /**
     * Closes the modal.
     */
    const closeModal = () => {
        // setModalState({ visible: false });
        // fetchConversations()
    }

    /**
     * Adds the modal content and shows the modal.
     */
    const newConversation = () => {
        // const donor_contact = await API.fetchContacts({ token, accountId: sfid })
        // setModalState({
        //     visible: true,
        //     id: 'user-conversation__new',
        //     content: <Form token={token} handleClose={closeModal} handleSubmit={createConversations} />
        // });
    }

    const filteredConversations = conversations.length > 0 && conversations.filter((conversation) => {
        // if(!conversation.receiver) {
        //     return false;
        // }
        // const { first_name, last_name, email } = conversation.receiver;
        // var name = first_name +" "+ last_name
        // return (first_name.toLowerCase() || '').includes(searchVal.toLowerCase()) || (last_name.toLowerCase() || '').includes(searchVal.toLowerCase()) || (email.toLowerCase() || '').includes(searchVal.toLowerCase()) || name.toLowerCase().includes(searchVal.toLowerCase())
    })

    return (
        <>
                <div
                    id={id}
                    className={`notification-list`}
                >
                    <div className="msg-overlay-list-bubble ml4">


                        {/* <header className="msg-overlay-bubble-header">
                            <section className="msg-overlay-bubble-header__details flex-row align-items-center ml1">
                                <div className="presence-entity presence-entity--size-1">
                                    <UserBadge
                                        firstName={currentUser.first_name}
                                        lastName={currentUser.last_name}
                                        profileImage={currentUser.avatar}
                                    />
                                </div>
                                <div className="msg-overlay-bubble-header__button truncate ml2">
                                    <h4 className="truncate t-14 t-bold t-black"><span>Messaging</span></h4>
                                </div>
                            </section>
                            <section className="msg-overlay-bubble-header__controls display-flex">
                                <button>
                                    <DotMenu setOpenMenu={setOpenDotMenu} openMenu={openDotMenu} />
                                </button>
                                <button onClick={(e) => newConversation(e)} className="msg-overlay-bubble-header__control msg-overlay-bubble-header__control--new-convo-btn artdeco-button artdeco-button--circle artdeco-button--muted artdeco-button--1 artdeco-button--tertiary ember-view">
                                    <PlusButton width="25" height="25"/>
                                </button>


                            </section>

                        </header> */}

                        <div className="msg-overlay-list-bubble-search ember-view">
                            <div className="msg-overlay-list-bubble-search__input-container">
                                <input onChange={(e) => setContactSearchVal(e.target.value)} className="ember-text-field ember-view msg-overlay-list-bubble-search__search-typeahead-input" type="text" placeholder="Search User" value={searchVal}/>
                            </div>
                        </div>

                        <ActionCable
                            channel={{channel: 'ConversationsChannel'}}
                            onReceived={handleReceivedConversation}
                        />

                        {(conversations.length > 0) ? (
                          <Cable
                            conversations={conversations}
                            handleReceivedMessage={(response) => handleReceivedMessage(response)}
                          />
                        ) : null}

                        <section className="scrollable msg-overlay-list-bubble__content msg-overlay-list-bubble__content--scrollable">
                            <div className="msg-overlay-list-bubble__default-conversation-container">
                                <div className="msg-conversations-container__conversations-list msg-overlay-list-bubble__conversations-list">
                                    {
                                        filteredConversations.length>0 &&
                                        filteredConversations.map((item, i) => {
                                            const receiverUser = currentUser.id === item.sender.id ? item.receiver : item.sender
                                            return <div key={i} className="msg-conversation-listitem__link msg-overlay-list-bubble__convo-item" onClick={() => handleClickMeg(item)}>
                                                    <div className="msg-conversation-card msg-overlay-list-bubble__convo-card display-flex">
                                                        <div className="msg-selectable-entity  msg-selectable-entity--3">
                                                            <div className="presence-entity presence-entity--size-3 msg-selectable-entity__entity">
                                                                <UserBadge
                                                                    firstName={receiverUser.first_name}
                                                                    lastName={receiverUser.last_name}
                                                                    profileImage={receiverUser.avatar_data}
                                                                />
                                                                <div className="presence-entity__indicator  presence-entity__indicator--size-3 presence-indicator presence-indicator--is-online presence-indicator--size-3"></div>
                                                            </div>
                                                        </div>
                                                        <div className="msg-overlay-list-bubble__convo-card-content overflow-hidden pl2">
                                                            <div className="msg-overlay-list-bubble__convo-card-content-wrapper fl">
                                                                <div className="msg-conversation-card__row">
                                                                    <h4 className="msg-conversation-listitem__participant-names msg-conversation-card__participant-names truncate t-14 t-black t-bold">
                                                                        {receiverUser.first_name} {receiverUser.last_name}
                                                                    </h4>
                                                                    <time className="msg-overlay-list-bubble-item__time-stamp t-12 t-bold t-black">
                                                                        {DateTime.fromISO(item.updated_at).toFormat('MMM d HH:MM')}
                                                                    </time>
                                                                </div>
                                                                <div className="msg-conversation-card__row">
                                                                    <div className="msg-overlay-list-bubble__message-snippet-container">
                                                                        <p className="msg-overlay-list-bubble__message-snippet--v2 m0 t-black t-12 t-bold">
                                                                            <span>
                                                                                <span className="msg-conversation-card__message-snippet-body">
                                                                                {
                                                                                    item.messages &&
                                                                                    item.messages.length>0 &&
                                                                                    
                                                                                    item.messages[item.messages.length -1].text
                                                                                }
                                                                                </span>
                                                                            </span>
                                                                        </p>
                                                                    </div>

                                                                    <div className="msg-conversation-card__conversation-status align-items-center flex-grow-1">
                                                                        {
                                                                            item.messages.filter(msg => msg.user_id !== currentUser.id && !msg.read_at).length > 0 ? (
                                                                                <mark className="msg-conversation-card__unread-count">
                                                                                    <abbr>{item.messages.filter(msg => msg.user_id !== currentUser.id && !msg.read_at).length}</abbr>
                                                                                </mark>
                                                                            ) : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                
                                                        </div>
                                                    </div>
                                                </div>
                                        })
                                    }

                                </div>
                            </div>
                        </section>
                    
                    </div>
                   
                </div>
                {/* {
                    isOpenChatBox &&
                    activeChatBox && activeChatBox.map((w,i)=>{
                        return  getActiveChat(w).id ? <ChatBox
                                    updateScroll={updateScroll}
                                    isOpenChatBox={isOpenChatBox} 
                                    index={i+1} 
                                    userParticularChat={getActiveChat(w)} 
                                    setIsOpenChatBox={setIsOpenChatBox} 
                                    showChatBox={showChatBox}
                                    currentUser={currentUser} 
                                    handleCreateMessage={handleCreateMessage} 
                                    handleClickClose={handleClickClose} /> : null
                    })
                } */}
        </>
    );
};
