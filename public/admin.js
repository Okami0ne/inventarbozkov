
const loginBtn = document.getElementById('loginBtn');
const addItemBtn = document.getElementById('addItemBtn');
const adminActionsHeader = document.getElementById('adminActionsHeader');

loginBtn.addEventListener('click', () => {
    const password = prompt('Zadejte admin heslo:');
    if (password === 'admin123') {
        alert('Přihlášení úspěšné!');
        addItemBtn.classList.remove('d-none');
        adminActionsHeader.classList.remove('d-none');
        document.querySelectorAll('.admin-actions').forEach(el => el.classList.remove('d-none'));
    } else {
        alert('Neplatné heslo.');
    }
});
