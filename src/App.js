import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ConsentForm from './Components/ConsentForm';
import StudyInfo1 from './Components/StudyInfo1';
import Welcome from './Components/Welcome';
import Login from './Components/Login';
import LoginPanicPassword from './Components/Login_Panic_Password';
import VotedBefore from './Components/VotedBefore';
import Voting from './Components/Voting';
import BallotConfirmation from './Components/BallotConfirmation_Card';
import BallotConfirmationSimple from './Components/BallotConfirmation_PanicPasswords';
import StudyInfo2 from './Components/StudyInfo2';
import VisualSelection from './Components/VisualSelection_Card';
import Navbar from './Components/Navbar';
import './App.css';
import VoteContext from "./Contexts/VoteContext";
import PrivateModeWarning from './Components/PrivateModeWarning';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const hideNavbarOn = ["/", "/studyinfo1", "/studyinfo2"];
  const [userSelectedYes, setUserSelectedYes] = useState(false);

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      )}

      <VoteContext.Provider value={{ userSelectedYes, setUserSelectedYes }}>
        <Routes>
          <Route path="/" element={<ConsentForm />} />
          <Route path="/studyinfo1" element={<StudyInfo1 />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login2" element={<LoginPanicPassword setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/votedbefore" element={<VotedBefore />} />
          <Route path="/voting" element={<Voting  />} />
          <Route path="/confirmation" element={<BallotConfirmation setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/confirmation2" element={<BallotConfirmationSimple />} />
          <Route path="/studyinfo2" element={<StudyInfo2 />} />
          <Route path="/selection" element={<VisualSelection />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/private-mode" element={<PrivateModeWarning />} />
        </Routes>
      </VoteContext.Provider>
    </>
  );
}

export default App;
