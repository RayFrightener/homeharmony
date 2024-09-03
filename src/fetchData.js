// function below fetches roommateNames and 
// populates the name field in the #assignmentForm
export async function fetchRoommates(userSelect) {
  try {
    const response = await (fetch('api/roommates'));
    const roommates = await response.json();
    //clear existing options
    userSelect.innerHTML = '';
    // populate the select element with new option
    roommates.forEach(roommate => {
      userSelect.append(new Option(roommate.roommatename, roommate.id));
    });
  } catch (err) {
    console.error('Error fetching roommates:', err);
  }
}

//function below fetches duties and populates the 
//#dutySelected field
export async function fetchDuties(dutySelect) {
  try {
    const response = await (fetch('api/duties'));
    const duties = await response.json();
    //clear existing options in #dutySelected
    dutySelect.innerHTML = '';
    // populate the options with duties
    duties.forEach(duty => {
      dutySelect.append(new Option(duty.duty, duty.duty));
    })
  } catch (err) {
    console.error('Error fetching duties:', err);
  }
}