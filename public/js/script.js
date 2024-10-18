function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUaff8daa31cb2238f0f911dc711b1fff19c30c4f7653febe3fd035080c0095baf77c347fa67407f7e5fec26f4117d8a73'
        },
        body: JSON.stringify({
            "UserName": username,
            "PassWord": password
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message || 'Login successful!';
        
        if (data.status) {
            showAccountInfo(data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred while processing your request.';
    });
}

// ฟังก์ชันแสดงข้อมูลบัญชีใน HTML
function showAccountInfo(data) {
    const accountInfoContainer = document.getElementById('accountInfo');

    // ตรวจสอบว่าข้อมูลจาก API มีหรือไม่
    accountInfoContainer.innerHTML = `
        <h2>Account Information</h2>
        <p><strong>Username:</strong> ${data.username || 'N/A'}</p>
        <p><strong>Display Name (TH):</strong> ${data.displayname_th || 'N/A'}</p>
        <p><strong>Display Name (EN):</strong> ${data.displayname_en || 'N/A'}</p>
        <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
        <p><strong>Department:</strong> ${data.department || 'N/A'}</p>
        <p><strong>Faculty:</strong> ${data.faculty || 'N/A'}</p>
        <p><strong>Current Status:</strong> ${data.tu_status || 'N/A'}</p>
    `;

    accountInfoContainer.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const roleSelect = document.getElementById('role');
    const loginButton = document.querySelector('button[type="button"]:nth-of-type(1)');

    function checkInputs() {
        const isUsernameFilled = usernameInput.value.trim() !== '';
        const isPasswordFilled = passwordInput.value.trim() !== '';
        const isRoleSelected = roleSelect.value !== '';

        loginButton.disabled = !(isUsernameFilled && isPasswordFilled && isRoleSelected);
    }

    usernameInput.addEventListener('input', checkInputs);
    passwordInput.addEventListener('input', checkInputs);
    roleSelect.addEventListener('change', checkInputs);

    checkInputs();
});

function togglePassword() {
    var passwordField = document.getElementById("password");
    var toggleBtn = document.querySelector(".toggle-password");
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleBtn.textContent = "Hide";
    } else {
        passwordField.type = "password";
        toggleBtn.textContent = "Show";
    }
}