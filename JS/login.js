/* =====================================================
   SPENDLY LOGIN / SIGNUP JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    const goLogin = document.getElementById("goLogin");
    const goSignup = document.getElementById("goSignup");

    const loginMessage = document.getElementById("loginMessage");
    const signupMessage = document.getElementById("signupMessage");


    /* =================================================
       SHOW LOGIN
       ================================================= */

    function showLogin() {

        loginForm.classList.remove("hidden");

        signupForm.classList.add("hidden");

        loginTab.classList.add("active");

        signupTab.classList.remove("active");

        clearMessages();
    }


    /* =================================================
       SHOW SIGNUP
       ================================================= */

    function showSignup() {

        signupForm.classList.remove("hidden");

        loginForm.classList.add("hidden");

        signupTab.classList.add("active");

        loginTab.classList.remove("active");

        clearMessages();
    }


    /* =================================================
       TAB BUTTONS
       ================================================= */

    loginTab.addEventListener("click", showLogin);

    signupTab.addEventListener("click", showSignup);

    goLogin.addEventListener("click", showLogin);

    goSignup.addEventListener("click", showSignup);


    /* =================================================
       CHECK URL HASH
       ================================================= */

    if (window.location.hash === "#signup") {

        showSignup();

    } else {

        showSignup();

    }


    /* =================================================
       SIGNUP
       ================================================= */

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const mobile =
            document.getElementById("mobileNumber").value.trim();


        if (name.length < 2) {

            showMessage(
                signupMessage,
                "Please enter your full name.",
                false
            );

            return;
        }


        if (!validateEmail(email)) {

            showMessage(
                signupMessage,
                "Please enter a valid email address.",
                false
            );

            return;
        }


        if (password.length < 6) {

            showMessage(
                signupMessage,
                "Password must contain at least 6 characters.",
                false
            );

            return;
        }


        if (mobile.length < 10) {

            showMessage(
                signupMessage,
                "Please enter a valid mobile number.",
                false
            );

            return;
        }


        const existingUser =
            JSON.parse(localStorage.getItem("spendlyUser"));


        if (
            existingUser &&
            existingUser.email.toLowerCase() === email.toLowerCase()
        ) {

            showMessage(
                signupMessage,
                "An account with this email already exists.",
                false
            );

            return;
        }


        const user = {

            name: name,

            email: email,

            password: password,

            mobile: mobile

        };


        localStorage.setItem(
            "spendlyUser",
            JSON.stringify(user)
        );


        showMessage(
            signupMessage,
            "Account created successfully!",
            true
        );


        setTimeout(function () {

            showLogin();

            document.getElementById("loginEmail").value = email;

        }, 1000);

    });


    /* =================================================
       LOGIN
       ================================================= */

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        const user =
            JSON.parse(localStorage.getItem("spendlyUser"));


        if (!user) {

            showMessage(
                loginMessage,
                "No account found. Please signup first.",
                false
            );

            return;
        }


        if (
            user.email.toLowerCase() !== email.toLowerCase() ||
            user.password !== password
        ) {

            showMessage(
                loginMessage,
                "Incorrect email or password.",
                false
            );

            return;
        }


        localStorage.setItem(
            "spendlyLoggedIn",
            "true"
        );


        localStorage.setItem(
            "spendlyCurrentUser",
            JSON.stringify(user)
        );


        showMessage(
            loginMessage,
            "Login successful! Opening dashboard...",
            true
        );


        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 800);

    });


    /* =================================================
       CLEAR MESSAGES
       ================================================= */

    function clearMessages() {

        loginMessage.textContent = "";

        signupMessage.textContent = "";

    }


    /* =================================================
       EMAIL VALIDATION
       ================================================= */

    function validateEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    /* =================================================
       MESSAGE
       ================================================= */

    function showMessage(element, message, success) {

        element.textContent = message;

        element.style.color =
            success ? "#079c69" : "#d63031";

    }

});


/* =====================================================
   PASSWORD SHOW / HIDE
   ===================================================== */

function togglePassword(inputId, button) {

    const input =
        document.getElementById(inputId);


    if (input.type === "password") {

        input.type = "text";

        button.textContent = "🙈";

    } else {

        input.type = "password";

        button.textContent = "👁";

    }

}