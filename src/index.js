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
      console.log('Failed to create roommate');
    }
  });
});