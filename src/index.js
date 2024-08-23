import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const dutyForm = document.getElementById('dutyForm');
    const assignmentForm = document.getElementById('assignmentForm');
    const userList = document.getElementById('userList');
    const dutyList = document.getElementById('dutyList');
    const userSelect = document.getElementById('userSelect');
    const dutySelect = document.getElementById('dutySelect');

    let users = [];
    let duties = [];

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;
        const userPhone = document.getElementById('userPhone').value;
        const user = { name: userName, email: userEmail, phone: userPhone };
        users.push(user);
        updateUserList();
        updateUserSelect();
        userForm.reset();
    });

    dutyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const dutyName = document.getElementById('dutyName');
        updateDutyList();
        updateDutySelect();
        
    });
});