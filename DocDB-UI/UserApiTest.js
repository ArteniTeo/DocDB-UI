const test_id = document.getElementById('id');
// const password_test = document.getElementById('password_test');
const test_btn = document.getElementById('test_btn');
const error_display_test = document.getElementById('error_display_test');

test_btn.addEventListener('click', test);

function test() {
    // if (username_test.value == "" && password_test.value == "") {
    //     error_display_test.innerHTML = "please enter username and password";
    // } else {
    error_display_test.innerHTML = "";
    fetch(`http://localhost:1234/user?id=${test_id.value}`, {
        method: 'GET',
    }).then(res => res.json()).then(data => {
        if (data.id > 0) {
                
            localStorage.setItem("loggedInUserUsername", data.username);
            localStorage.setItem("loggedInUserID", data.id);
            localStorage.setItem("loggedInUserPassword", data.password);
            localStorage.setItem("loggedInUserStatus", data.status);
                
            location.href='http://127.0.0.1:5500/successful.html';
        } else {
            error_display_test.innerHTML = "incorect username or password";
        }
    });
    // }
}