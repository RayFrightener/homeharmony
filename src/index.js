import './styles.css';
import { fetchRoommates, fetchDuties } from './fetchData';
import { validatePhoneNumber } from './validation';
// to do: modularize eventlisteners
document.addEventListener('DOMContentLoaded', () => {
  const userForm = document.getElementById('userForm');
  const dutyForm = document.getElementById('dutyForm');
  const assignmentForm = document.getElementById('assignmentForm');
  const userSelect = document.getElementById('roommateName');
  const dutySelect = document.getElementById('dutySelected');
  const phoneError = document.getElementById('phoneError');
  const phoneInput = document.getElementById('phone');

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


// Add the error-message class to the phoneError element
// phoneError.classList.add('error-message');

validatePhoneNumber(userForm, phoneInput, phoneError);
fetchRoommates(userSelect);
fetchDuties(dutySelect);
});