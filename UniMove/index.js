(function()
{
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var submit = document.getElementById('submit');
    var form = document.getElementsByTagName('form')[0];
    var userCheck = document.getElementById('userCheck');
    var passCheck = document.getElementById('passCheck');
    var userValid = false;
    var pssValid = false;
    var formValid = false;
    
    var checkIfValid = function(input, output)
    {
        if (input.value === '')
        {
            output.innerHTML = 'Campo obbligatorio!';
            return false;
        }
        else
        {
            output.innerHTML = '';
            return true;
        }
    }

    submit.onclick = function()
    {
        formValid = false;
        userValid = checkIfValid(username, userCheck);
        passValid = checkIfValid(password, passCheck);
        if (!(userValid && passValid))
        {
            submit.disabled = true;
        }
    }

    username.onclick = function()
    {
        submit.disabled = false;
    }

    password.onclick = function()
    {
        submit.disabled = false;
    }
})();