const username_log_in = document.getElementById('username_log_in');
const password_log_in = document.getElementById('password_log_in');
const log_in_btn = document.getElementById('log_in_btn');
const error_display_log_in = document.getElementById('error_display_log_in');

log_in_btn.addEventListener('click', logIn);

function logIn() {
    if (username_log_in.value == "" && password_log_in.value == "") {
        error_display_log_in.innerHTML = "please enter username and password";
    } else {
        error_display_log_in.innerHTML = "";
        fetch(`http://localhost:1234/login?identifier=${username_log_in.value}&password=${password_log_in.value}`, {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            if (data.id > 0) {
                
                localStorage.setItem("loggedInUserId", data.id);
                localStorage.setItem("loggedInUserEmail", data.email);
                localStorage.setItem("loggedInUserUsername", data.username);
                localStorage.setItem("loggedInUserStatus", data.status);
                localStorage.setItem("loggedInUserType", data.accountType);
                
                if(localStorage.getItem("loggedInUserType") == "PATIENT"){
                    location.href='http://127.0.0.1:5500/PatientMainPage.html';
                } else { 
                    location.href='http://127.0.0.1:5500/DocMainPage.html';
                }
            } else {
                error_display_log_in.innerHTML = "incorect username or password";
            }
        });
    }
}