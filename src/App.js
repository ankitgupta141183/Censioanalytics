
import React from "react";
import "./App.scss";
import Routes from "../src/Components/routes";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "./Actions/componentActions";

function App() {


  const dispatch = useDispatch()

  const isSHowNotification = useSelector(state => state.componentReducer)
  const renderModal = () => {
    if (isSHowNotification.showNotification) {
      setTimeout(() => {
        dispatch(showNotification(false, "", ""))
      }, 3000)
    }
    return <div className={`notificationModal bg-message${isSHowNotification.type === "success" ? "-success" : "-error"}`}>
      <div className="dialog">
        <div className="sub-modal">
          <h2>{isSHowNotification.message} </h2>
        </div>
      </div>
    </div>
  }
  return (
    <div className="page-sec login-bg-new">
      {isSHowNotification.showNotification && renderModal()}
      <Routes />
    </div>
  );
}

export default App;

