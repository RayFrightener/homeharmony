import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('userForm');
  const dutyForm = document.getElementById('dutyForm');
  const assignmentForm = document.getElementById('assignmentForm');
  const userSelect = document.getElementById('roommateName');
  const dutySelect = document.getElementById('dutySelected');

  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const roommateName = document.getElementById('name').value;
    const roommatePhone = document.getElementById('phone').value;
    // database receiving the correct names from #name
    const response = await fetch('/api/roommates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roommateName, roommatePhone })
    });

    const roommate = await response.json();
    userSelect.append(new Option(roommate.roommatename, roommate.id));
  });

  dutyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const duty = document.getElementById('duty').value;
    // database receving correct duties from #duty
    const response = await fetch('/api/duties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duty })
    });
    // #duty is being poppulated correctly
    const newDuty = await response.json();
    dutySelect.append(new Option(newDuty.duty, newDuty.duty));
  });

  assignmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const roommateName = userSelect.value;
    const duty = document.getElementById('dutySelected').value;
    const dutyDay = document.getElementById('chosenDay').value;
    const time = document.getElementById('chosenTime').value;
    const dutyCycle = document.getElementById('chosenCycle').value;
    await fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roommateName, duty, dutyDay, time, dutyCycle })
    });
  });

  async function fetchRoommates() {
    try {
      const response = await fetch('/api/roommates');
      const roommates = await response.json();
      // Clear existing options
      userSelect.innerHTML = '';
      // Populate the select element with new options
      roommates.forEach(roommate => {
        userSelect.append(new Option(roommate.roommatename, roommate.id));
      });
    } catch (err) {
      console.error('Error fetching roommates:', err);
    }
  }

  // Fetch and populate duties
  async function fetchDuties() {
    try {
      const response = await fetch('/api/duties');
      const duties = await response.json();
      // Clear existing options
      dutySelect.innerHTML = '';
      // Populate the select element with new options
      duties.forEach(duty => {
        dutySelect.append(new Option(duty.duty, duty.duty));
      });
    } catch (err) {
      console.error('Error fetching duties:', err);
    }
  }

  fetchRoommates();
  fetchDuties();
});