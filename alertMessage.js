const alertBox = document.querySelector('.alert-box');
const alertBoxContent = document.querySelector('.alert-box-content');
const alertType = document.querySelector('.alert-type');
const alertMessage = document.querySelector('.alert-message');

const effectAlert = () => {
    const response = JSON.parse(localStorage.getItem('alert') || null);

    if (response) {
        alertType.textContent = response.type === 'success' ? 'Uğurlu' : 'Xətalı';
        alertMessage.textContent = response.message;
        if (response.type === 'success') {
            alertBoxContent.classList.add('success');
            alertMessage.classList.add('success');
            alertType.classList.add('success');

            alertMessage.classList.remove('error');
            alertType.classList.remove('error');
            alertBoxContent.classList.remove('error');
        }
        else {
            alertBoxContent.classList.add('error');
            alertMessage.classList.add('error');
            alertType.classList.add('error');

            alertMessage.classList.remove('success');
            alertType.classList.remove('success');
            alertBoxContent.classList.remove('success');
        }
    }
}

const closeAlert = () => {
    alertBox.style.display = 'none';
    localStorage.removeItem('alert');
}