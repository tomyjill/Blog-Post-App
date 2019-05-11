// https://jsonplaceholder.typicode.com/posts/{{ postId }}
// https://jsonplaceholder.typicode.com/users/{{ userId }}
// https://jsonplaceholder.typicode.com/comments?postId={{ postId }}

let currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log(currentUser);
$(document).ready(function(){
    
    navigate('home');

    $(document).on('click', '.goToPost', function() {
        const postId = $(this).parent().attr('postId');
        navigate('post', { postId });
    });

    $(document).on('click', '.goHome', function() {
        navigate('home');
    });

    $(document).on('click', '#register', function() {
        $('#container').children().remove();
        $('#container').append(
            `<div id="registerForm" class="col-md-4 col-sm-4">
            <form onsubmit="return false;" >
                <div class="form-group">
                    <label for="firstName">First name:</label>
                    <input type="text" class="form-control" id="firstName">
                    <span id="error_firstName" class="invalid-feedback"></span>
                </div>
                <div class="form-group">
                    <label for="lastName">Last name:</label>
                    <input type="text" class="form-control" id="lastName">
                    <span id="error_lastName" class="invalid-feedback"></span>
                </div>
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" id="email" placeholder="Example 123Ab@gmail.com">
                    <span id="error_email" class="invalid-feedback"></span>
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" id="pwd">
                    <span id="error_pwd" class="invalid-feedback"></span>
                    <small id="pwdHelp" class="form-text text-muted">Password should contain minimum 6 characters.</small>
                </div>
                <button id="submit" class="btn btn-primary">Submit</button>
			</form>`	  
        );
        $('#submit').attr('disabled', true);
        $("#firstName").focusout(function(){
            const firstNameInputValue = $(this).val();
            const hasNumber = /\d/;
            if(firstNameInputValue ==''){
                $(this).addClass('is-invalid');
                $("#error_firstName").text("* Enter your first name!");
            } else if(firstNameInputValue.length < 3){
                $(this).addClass('is-invalid');   
                $("#error_firstName").text("* First name should contain at least 3 characters!");
            } else if(hasNumber.test(firstNameInputValue) == true){
                $(this).addClass('is-invalid');    
                $("#error_firstName").text("* First name should not contain numbers!");
            } else {
                $(this).addClass('is-valid');
                $(this).removeClass('is-invalid');
                $('#submit').attr('disabled',false);
                $("#error_firstName").text("");
            }
        });
        $("#lastName").focusout(function(){
            const lastNameInputValue = $(this).val();
            const hasNumber = /\d/;
            if(lastNameInputValue =='') {
                $(this).addClass('is-invalid');        
                $("#error_lastName").text("* Enter your last name!");
            } else if(lastNameInputValue.length < 3 ){
                $(this).addClass('is-invalid');
                $("#error_lastName").text("* Last name should contain at least 3 characters!");
            } else if(hasNumber.test(lastNameInputValue) == true){
                $(this).addClass('is-invalid');
                $("#error_lastName").text("* Last name should not contain numbers!");
            } else {
                $(this).addClass('is-valid');
                $(this).removeClass('is-invalid');
                $('#submit').attr('disabled',false);
                $("#error_lastName").text("");
            }
        });
        $("#email").focusout(function(){
           //console.log('working'); 
            const emailInputValue = $(this).val();
            const emailIsValid = /\S+@\S+\.\S+/.test(emailInputValue)
            if (emailInputValue == '') {
                $(this).addClass('is-invalid');
                $("#error_email").text("* Enter your email!");
            } else if(emailInputValue.length < 5) {
                $(this).addClass('is-invalid');
                $("#error_email").text("* Email should contain at least 5 characters!");
            } else if(emailIsValid == false) {
                $(this).addClass('is-invalid');
                $("#error_email").text("* Enter a valid email!");
            } else {
                $(this).addClass('is-valid');
                $(this).removeClass('is-invalid');
                $('#submit').attr('disabled',false);
                $("#error_email").text("");
            }
        });
        $("#pwd").focusout(function(){
            const pwdInputValue = $(this).val();
            const hasNumber = /\d/;
            //console.log('working');
            if(pwdInputValue =='') {
                $(this).addClass('is-invalid');
                $("#error_pwd").text("* Enter your password!");
            } else if(pwdInputValue.length < 6) {   
                $(this).addClass('is-invalid');
                $("#pwdHelp").removeClass('text-muted');
                $("#pwdHelp").addClass('text-danger');
            } else if(hasNumber.test(pwdInputValue) == false) {
                $(this).addClass('is-invalid');
                $("#error_pwd").text("* Password should include numbers!");  
            } else {
                $(this).addClass('is-valid');
                $(this).removeClass('is-invalid');
                $("#pwdHelp").removeClass('text-danger');
                $('#submit').attr('disabled',false);
                $("#error_pwd").text("");
            }
        });
        $("#submit").on('click', function() {
            const isValidClasses = $(document).find('.is-valid');
            const isInvalidClasses = $(document).find('.is-invalid');
            const firstName = $('#firstName').val();
            const lastName = $("#lastName").val();
            const email = $('#email').val();
            const pwd = $('#pwd').val();
            console.log(isInvalidClasses.length);
         if (isValidClasses.length < 4 || isInvalidClasses.length !== 0 ) {
             alert('Please fill in the form correctly!');   
         } else if (isValidClasses.length == 4 && isInvalidClasses.length == 0) {
             $('#submit').attr('disabled', false);
             alert("Thank you " + firstName + ' ' + lastName);
             storeRegisterForm(firstName, lastName, email, pwd);
             navigate('home'); 
         }
        });
    });

    $(document).on('click', '#logIn', function() {
        navigate('login');
    });

    $(document).on('click', '#logOff', function() {
        deleteStoredCurrentUser();
        navigate('home');   
    });
});

const storeRegisterForm = () => {
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const email = $('#email').val();
    const pwd = $('#pwd').val();

    addUserToStorage(firstName, lastName, email, pwd);
}

const addUserToStorage = (firstName, lastName, email, pwd) => {
    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: pwd,
    };
          // array
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers)); 
}

const deleteStoredCurrentUser = () => {
    localStorage.removeItem('currentUser');
    currentUser = null; 
}


			