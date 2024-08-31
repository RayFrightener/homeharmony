import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
// capture roommate name and phone number, store phone number for later user
// add roommate name to assignment form to the user select, 
  const userForm = document.getElementById('userForm');
  userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const roommateName = document.getElementById('name').value;
    const roommatePhone = document.getElementById('phone').value;

    const response = await fetch('/api/roommates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roommateName, roommatePhone}),
    });

    if (response.ok) {
      console.log('Roommate created successfully');
    } else {
      console.error('Failed to create roommate');
    }
  });

// capture duty form inputs
// save them into database and populate the selectDuty field in assignment form.
  const dutyForm = document.getElementById('dutyForm');
  dutyForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const duty = document.getElementById('duty').value;
    
    const response = await fetch('/api/duties', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({duty}),
    });
    if (response.ok) {
      console.log('Duty created successfully');
    } else {
      console.error('Failed to create duty');
    }
  });

  // capture assignment form inputs(roommateName, dutySelected, chosenDay, chosenCycle)
 // push it to server and save in database
 // reflect it in a div for users to edit and remove. 
  const assignmentForm = document.getElementById('assignmentForm');
  assignmentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const roommateName = document.getElementById('roommateName').value;
    const duty = document.getElementById('dutySelected').value;
    const dutyDay = document.getElementById('chosenDay').value;
    const time = document.getElementById('chosenTime').value;
    const dutyCycle = document.getElementById('chosenCycle').value;

    const response = await fetch('/api/assignments',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({roommateName, duty, dutyDay, time, dutyCycle}),
    });
    if(response.ok) {
      console.log('Assignment created successfully');
    } else {
      console.error('Failed to create assignment');
    }
  });
});