import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
// capture roommate name and phone number, store phone number for later user
// add roommate name to assignment form to the user select, 
  const userForm = document.getElementById('userForm');
  userForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    const response = await fetch('/submit-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone}),
    });

    if (response.ok) {
      console.log('Roommate created successfully');
    } else {
      console.error('Failed to create roommate');
    }
  });

// capture duty form inputs
  const dutyForm = document.getElementById('dutyForm');
  dutyForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const duty = document.getElementById('duty').value;
    
    const response = await fetch('/submit-duty', {
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

  // capture assignment form inputs

  const assignmentForm = document.getElementById('assignmentForm');
  assignmentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const roommateName = document.getElementById('roommateName').value;
    const dutyDay = document.getElementById('chosenDay').value;
    const dutyCycle = document.getElementById('chosenCycle').value;

    const response = await fetch('/submit-assignment',{
      method: 'POST',
      headers: {
        'Content-Type': 'applicaton/json',
      }, 
      body: JSON.stringify({roommateName, dutyDay, dutyCycle}),
    });
    if(response.ok) {
      console.log('Assignment created successfully');
    } else {
      console.error('Failed to create assignment');
    }
  });
});