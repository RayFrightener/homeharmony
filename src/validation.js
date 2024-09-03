export function validatePhoneNumber(userForm, phone, phoneError) {
  userForm.addEventListener('submit', function(event) {
    const phoneNumber = phone.value.trim();
    const phoneRegex = /^\+1\d{10}$/;

    if (!phoneRegex.test(phoneNumber)) {
      phoneError.style.display = 'block';
      
      event.preventDefault(); //prevent form submission
    } else {
      phone.Error.style.display = 'none';
    }
  });
}