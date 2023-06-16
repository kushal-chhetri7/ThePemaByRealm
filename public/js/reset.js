function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var eyeIcon = document.querySelector(".eye-icon ion-icon");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.setAttribute("name", "eye-off");
    } else {
        passwordInput.type = "password";
        eyeIcon.setAttribute("name", "eye");
    }
}
function contogglePasswordVisibility() {
    var passwordInput = document.getElementById("conpassword");
    var eyeIcon = document.querySelector(".eye-icon ion-icon");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.setAttribute("name", "eye-off");
    } else {
        passwordInput.type = "password";
        eyeIcon.setAttribute("name", "eye");
    }
}

function validatePassword(event) {
    var passwordInput = document.getElementById("password");
    var confirmPasswordInput = document.getElementById("conpassword");
    if (passwordInput.value !== confirmPasswordInput.value) {
        alert("Passwords do not match.");
        event.preventDefault();
    }
}