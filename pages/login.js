const renderLoginPage = (params) => {
    $('#container').append(`<div id="logInForm" class="col-md-4 col-sm-4">
    <form onsubmit="return false;" >
        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" class="form-control" id="logInEmail" placeholder="Example 123Ab@gmail.com">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="logInPwd">
            <small id="pwdHelp" class="form-text text-muted">Password should contain minimum 6 characters.</small>
        </div>
        <button id="logInSubmit" class="btn btn-primary">Login</button>
    </form>`);	 
}

$(document).on('click', '#logInSubmit', function() {
    const email = $('#loginEmail').val();
    const pwd = $('#loginPwd').val();
    loginCheck(email, pwd);
});

const loginCheck = (email, pwd) => {
    const logInEmail = $('#logInEmail').val();
    const logInPwd = $('#logInPwd').val();
    
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []; 

    if (storedUsers.length === 0) {
        alert('Please register');
        return;
    }

    const user = storedUsers.find(user => user.email === logInEmail);

    if (user === undefined) {
        alert('It seems like you dont exists');
        return;
    }

    if (user.password === logInPwd) {
        alert('You are loged in');
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('home');
    } else {
        alert('Incorrect password');
    }  
}