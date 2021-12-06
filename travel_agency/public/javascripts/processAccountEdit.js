
// Button clicked to submit edition
var btnSub = document.getElementById('edit');

btnSub.addEventListener("click", (ev) => {
    ev.preventDefault()
    // Get the values of discount and the div in which message will be printed
    var discount = document.getElementById('discount');
    var messageDiv = document.getElementById('messages');

    // Prepare URL for submission
    var url = "/users/edit/account/" + discount.value;

    // Create new XMLHttpRequest object
    xhr = new XMLHttpRequest();
    // Print message when received
    xhr.onload = function (ev) {
        ev.preventDefault();
        messageDiv.innerHTML = xhr.responseText;
        messageDiv.hidden = false;
    };
    // Open connection and send data
    xhr.open("POST", url);
    xhr.send();

})

