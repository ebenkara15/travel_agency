// Button for ticket validation
var validateBtn = document.getElementById('validate');

// Radio buttons of seat side
var corrChoice = document.getElementById('corrRadio');
var winChoice = document.getElementById('winRadio');

// When clicked send a request for ticket validation
validateBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    // Create new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    // Get seat side value
    var seatSide = corrChoice.checked ? corrChoice.value : winChoice.value;
    // Prepare URL
    var url = window.location.pathname + '/' + seatSide;

    // Open connection and send
    xhr.open("POST", url);
    xhr.send();
    
    // Print message when received and add button to the ticket
    xhr.onload = function(ev) {
        ev.preventDefault();
        var response = JSON.parse(xhr.response)
        console.log(response)
        addMessage(response.message, response.status);
        if (response.status) {
           addRedirect(response.nextURL) 
        }
    }
});

// Utils: prints message 
function addMessage(message, status) {
    var divMessage = document.getElementById('messageDiv');
    divMessage.innerHTML = '<div>' + message + '</div>';
    if (status) {
        divMessage.classList = "alert alert-success mt-3 d-flex align-items-center";
    } else {
        divMessage.classList = "alert alert-danger mt-3";
    }

    divMessage.hidden = false;
}

// Utils: Add a button which leads to the ticket
function addRedirect(nextURL) {
    var divMessage = document.getElementById('messageDiv');
    var btnRedirect = document.createElement('a');
    btnRedirect.role = "button"
    btnRedirect.classList = "btn btn-success ml-auto";
    btnRedirect.innerHTML = "Accéder au billet";
    btnRedirect.href = nextURL;
    
    divMessage.appendChild(btnRedirect);
}