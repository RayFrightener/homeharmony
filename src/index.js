import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('userForm');
  const dutyForm = document.getElementById('dutyForm');
  const assignmentForm = document.getElementById('assignmentForm');
  const userSelect = document.getElementById('roommateName');
  const dutySelect = document.getElementById('dutySelected');

  // Fetch and populate roommates
  async function fetchRoommates() {
    const response = await fetch('/api/roommates');
    const roommates = await response.json();
    roommates.forEach(roommate => {
      userSelect.append(new Option(roommate.roommateName, roommate.id));
    });
  }

  // Fetch and populate duties
  async function fetchDuties() {
    const response = await fetch('/api/duties');
    const duties = await response.json();
    duties.forEach(duty => {
      dutySelect.append(new Option(duty.duty, duty.id));
    });
  }

  fetchRoommates();
  fetchDuties();

  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const roommateName = document.getElementById('name').value;
    const roommatePhone = document.getElementById('phone').value;
    const response = await fetch('/api/roommates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roommateName, roommatePhone })
    });
    const roommate = await response.json();
    userSelect.append(new Option(roommate.roommateName, roommate.id));
  });

  dutyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const duty = document.getElementById('duty').value;
    const response = await fetch('/api/duties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duty })
    });
    const newDuty = await response.json();
    dutySelect.append(new Option(newDuty.duty, newDuty.id));
  });

  assignmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const roommateName = userSelect.value;
    const duty = dutySelect.value;
    const dutyDay = document.getElementById('chosenDay').value;
    const time = document.getElementById('chosenTime').value;
    const dutyCycle = document.getElementById('chosenCycle').value;
    await fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roommateName, duty, dutyDay, time, dutyCycle })
    });
  });
});