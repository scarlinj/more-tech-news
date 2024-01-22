async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

if (email && password) {
    const response = await fetch('/api/users/login', {
    method: 'post',
    body: JSON.stringify({
        email,
        password
    }),
    headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
        console.log('You are now logged in.');
    } else {
        alert(response.statusText);
    }
}
};

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
            username,
            email,
            password
    }),
        headers: { 'Content-Type': 'application/json' }
        });

        // check the response status
        // reaches this - see "user created" in console, but error after loading, program crashes
        if (response.ok) {
            document.location.replace('/dashboard/');
            console.log('User created.');
        } else {
            alert(response.statusText);
        }
    }
};



// below cannot be read - already called these above within consts and in .hbs file
// as of 10/8/2023, removing these prevented log-in from redirecting to homepage.  Added back the below and was able to get it working.
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);