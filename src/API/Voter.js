import Parse from "parse";

export async function addVoter(ID, password, RandomID) {
  if (!ID || !password) {
    throw new Error("ID and password are required");
  }
  await Parse.User.logOut();
  let user = new Parse.User();
  user.set("username", ID);
  user.set("password", password);
  user.set("Candidate", "");
  user.set("BallotSelection", "");
  user.set("TrackingID", RandomID)
  try {
    await user.signUp();
  } catch (err) {
    console.error("addVoter error:", err, err.name, err.message, err.code);
    if (err.xhr) console.error("err.xhr:", err.xhr);
    if (err.rawResponse) console.error("rawResponse:", err.rawResponse);
    throw err;
  }
}

export async function loginVoter(ID, password) {
  await Parse.User.logOut();
  await Parse.User.logIn(ID, password);
}

export async function logoutVoter(){
    await Parse.User.logOut();
}

export default function getCurrentUser() {
  let currentUser = Parse.User.current();
  return currentUser;
}


export async function saveVote(vote) {
  const Voter = getCurrentUser();
  Voter.set("Candidate", vote);
  try {
    await Voter.save();
  } catch (error) {
    console.log("Error saving vote: " + error);
  }
}

export async function saveVisuaRepresentation(visualRepresentation) {
  const Voter = getCurrentUser();
  Voter.set("Visual_represenation", visualRepresentation);
  try {
    await Voter.save();
  } catch (error) {
    console.log("Error saving ballot representation: " + error);
  }
}

export async function getVisualRepresentation() {
  const Voter = getCurrentUser();
  try {
    const visualRepresentation = Voter.get("Visual_represenation");
    return visualRepresentation;
  } catch (error) {
    console.log("Error retrieving visual representation: " + error);
    return null;
  }
}


export async function saveBallotSelections(ballotSelections) {
  const Voter = getCurrentUser();
  Voter.set("Ballot_Selections", ballotSelections);
  try {
    await Voter.save();
  } catch (error) {
    console.log("Error saving ballot selections: " + error);
  }
}

export async function saveCorrectSelections(correctSelections) {
  const Voter = getCurrentUser();
  Voter.set("Correct_selections", Boolean(correctSelections)); // Ensure boolean
  try {
    await Voter.save();
  } catch (error) {
    console.log("Error saving correct selections: " + error);
  }
}

export async function getTrackingID() {
  const Voter = getCurrentUser();
  try {
    const trackingID = Voter.get("TrackingID");
    return trackingID;
  } catch (error) {
    console.log("Error retrieving tracking ID: " + error);
    return null;
  }
}

export async function getUserID() {
  const Voter = getCurrentUser();
  try {
    const userID = Voter.get("username");
    return userID;
  } catch (error) {
    console.log("Error retrieving user ID: " + error);
    return null;
  }
}

export async function getCandidate() {
  const Voter = getCurrentUser();
  try {
    const candidate = Voter.get("Candidate");
    return candidate;
  } catch (error) {
    console.log("Error retrieving candidate: " + error);
    return null;
  }
}

export async function getBooleanSelection() {
  const Voter = getCurrentUser();
  try {
    const correctSelection = Voter.get("Correct_selections");
    return correctSelection;
  } catch (error) {
    console.log("Error retrieving correct selections: " + error);
    return null;
  }
}
