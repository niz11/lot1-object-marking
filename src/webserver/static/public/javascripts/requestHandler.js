function register(e)
{
    const request = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    };
    if(request.email && request.password && request.name)
    {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                displayResults(xhr.responseText);
            }
            else
            {
                document.querySelector("#error").innerHTML = xhr.responseText;
            }
        };
        xhr.open("POST", "https://localhost:3000/users/register");
        xhr.setRequestHeader("Content-type", "application/json; encoding=UTF-8");
        xhr.send(JSON.stringify(request));
        console.log(request);
    }
    return false
}

function handleRequest(e)
{
    const request = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    };
    if(request.email && request.password)
    {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                displayResults(xhr.responseText);
            }
        };
        xhr.open("POST", "https://localhost:3000/users/login");
        xhr.setRequestHeader("Content-type", "application/json; encoding=UTF-8");
        xhr.send(JSON.stringify(request));
        console.log(request);
    }
    return false
}
function displayResults(data)
{
    window.location.search = `userId=${data}`
    window.location.href ="client/client_homepage.html?" + `userId=${data}`
}

function handleUrl(data)
{
    var params = new URLSearchParams(window.location.search);
    var userId = params.get('userId')
    window.location.href =`/${data}.html?` + `userId=${userId}`
}