const button = document.getElementById("btn");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");        
button.onclick = init;


let validation =
[
    {"prefix":"Kullanıcı adınızın","length-max":15,"length-min":7},
    {"prefix":"Parolanızın","length-max":15,"length-min":7},  
]


console.log(validation[0])

function error(status,message)
{
    const alert = status.nextElementSibling;
    alert.textContent = message;
    alert.classList.add("invalid-feedback");
    status.classList.add("error","is-invalid");
    status.focus();
}
function success(status)
{
    status.classList.add("is-valid");
    status.classList.remove("error","is-invalid");
}

function checkLength()
{
    let usernameData = validation[0];
    let passwordData = validation[1];

    if(username.value.length < usernameData["length-min"])
    {
        error(username,`${usernameData["prefix"]} uzunluğu minimum ${usernameData["length-min"]} uzunluğunda olmalıdır`);
    }
    else if(username.value.length > usernameData["length-max"])
    {
        error(username,`${usernameData["prefix"]} uzunluğu maksimum ${usernameData["length-max"]} uzunluğunda olmalıdır`);
    }
    else
    {
        success(username);
    }

    if(password.value.length < passwordData["length-min"])
    {
        error(password,`${passwordData["prefix"]} uzunluğu minimum ${passwordData["length-min"]} uzunluğunda olmalıdır`);
        error(repassword)
    }
    else if(password.value.length > passwordData["length-max"])
    {
        error(password,`${passwordData["prefix"]} uzunluğu maksimum ${passwordData["length-max"]} uzunluğunda olmalıdır`);
        error(repassword)
    }
    else
    {
        success(password);
    }
}


function checkpassword()
{
    if(password.value != ""){
        if(password.value !== repassword.value)
        {
            error(password,"Şifreler eşleşmiyor");
            error(repassword,"Şifreler eşleşmiyor");
        }
        if(password.value === repassword.value)
        {
            success(password);
            success(repassword);
        }
    }
}

function isValidEmail(emailValid) {
    // Düzenli ifade kullanarak e-posta adresinin geçerliliğini kontrol ediyoruz
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValid);
}

function init()
{
    (password.value == "") ? error(password,"Lütfen parola giriniz.") : success(password);

    (email.value == "") ? error(email,"Lütfen e-mail giriniz.") : success(email);

    (username.value == "") ? error(username,"Lütfen kullanıcı adı giriniz.") : success(username);

    checkLength();

    checkpassword();

    if(email.value != ""){
        if(isValidEmail(email.value))
        {
            success(email);
        }
        else
        {
            error(email,"Lütfen geçerli bir e-mail giriniz.");
        }
    }
}