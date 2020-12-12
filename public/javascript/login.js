/* 14.2.4 Now where can we put the script tag for this JavaScript file? 
If we put it in main.handlebars, then every page will load this script. 
We want to avoid this if possible because the homepage doesn't need 
login.js. Instead, we can add it to the login.handlebars file. This 
file doesn't have a header, so we can just add the tag to the bottom 
of the file. */

//14.2.4 async function set up login
async function loginFormHandler(event) {
    event.preventDefault;
    const email    = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "post",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {"Content-Type": "application/json"}
        });
        
        if (response.ok) {
            document.location.replace("/");
        }
        else {
            alert(response.statusText);
        }
    }
}

//14.2.4 async function set up signup
async function signupFormHandler(event) {
    event.preventDefault;
    const username = document.querySelector("#username-signup").value.trim();
    const email    = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (username && email && password) {
        const response = await fetch("/api/users", {
            method: "post",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {"Content-Type": "application/json"}
        });        
        //check the response status
        if (response.ok) {
            console.log("success");
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);