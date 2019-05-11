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
