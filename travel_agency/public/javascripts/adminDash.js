// Buttons related to discount table
var crDisc = document.getElementById('crDisc'),
    upDisc = document.getElementById('upDisc'),
    delDisc = document.getElementById('delDisc'),
    btnDiscTable = document.getElementById('btnDiscTable');

// Buttons related to train table
var crTrain = document.getElementById('crTrain'),
    delTrain = document.getElementById('delTrain'),
    btnTrainTable = document.getElementById('btnTrainTable');

// Button related to client table
var btnClientTable = document.getElementById('btnClientTable');

// Button related to station table
var btnStation = document.getElementById('btnStationTable');

// Buttons related to travel table
var crTravel = document.getElementById('crTravel'),
    upTravel = document.getElementById('upTravel'),
    delTravel = document.getElementById('delTravel'),
    btnTravelTable = document.getElementById('btnTravelTable');


/***************************/
/* AJAX req: update tables */
/***************************/

// Discount table
btnDiscTable.addEventListener("click", (ev) => {
    ev.preventDefault()
    // Create new XMLHttRequest object
    xhr = new XMLHttpRequest();
    // Prepare URL 
    var url = "/admin/api/get/discount";
    // Open connection with server and send
    xhr.open("GET", url);
    xhr.send();
    // Add event listener when response comes
    xhr.onload = (ev) => {
        ev.preventDefault();
        
        var discTable = document.getElementById('discBodyTable');
        var data = JSON.parse(xhr.response);
        // Clear table
        removeNode(discTable);
        // Create new row with data received
        for (c of data) {
            var row = document.createElement('tr');

            var id = document.createElement('th')
            id.scope = "row";
            id.innerHTML = c.iddiscount;
            row.appendChild(id);

            var discDesc = document.createElement('td');
            discDesc.innerText = c.disc_desc;
            row.appendChild(discDesc);

            var percent = document.createElement('td');
            percent.innerHTML = ((c.percentage < 1) ? c.percentage * 100 : 0) + ' %';
            row.appendChild(percent);

            discTable.appendChild(row);
        }
    }
});

// Train Table
btnTrainTable.addEventListener("click", (ev) => {
    ev.preventDefault()
    xhr = new XMLHttpRequest();

    var url = "/admin/api/get/train";

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = (ev) => {
        ev.preventDefault();

        var trainTable = document.getElementById('trainBodyTable');
        var data = JSON.parse(xhr.response);

        removeNode(trainTable);

        for (c of data) {
            var row = document.createElement('tr');

            var id = document.createElement('th')
            id.scope = "row";
            id.innerHTML = c.idtrain;
            row.appendChild(id);

            for (let i=1; i<9; i++) {
                var coach = document.createElement('td');
                coach.innerHTML = c[`idcoach_${i}`];
                row.appendChild(coach);
            }

            trainTable.appendChild(row);
        }
    }
});

// Client table
btnClientTable.addEventListener("click", (ev) => {
    ev.preventDefault()
    xhr = new XMLHttpRequest();

    var url = "/admin/api/get/client";

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = (ev) => {
        ev.preventDefault();

        var clientTable = document.getElementById('clientBodyTable');
        var data = JSON.parse(xhr.response);

        removeNode(clientTable);

        for (c of data) {
            var row = document.createElement('tr');

            var id = document.createElement('th')
            id.scope = "row";
            id.innerHTML = c.idclient;
            row.appendChild(id);

            var fname = document.createElement('td');
            fname.innerText = c.first_name;
            row.appendChild(fname);

            var lname = document.createElement('td');
            lname.innerHTML = c.last_name
            row.appendChild(lname);

            var dob = document.createElement('td');
            dob.innerHTML = moment(c.date_of_birth).format('DD[/]MM[/]YY');
            row.appendChild(dob);

            var disc = document.createElement('td')
            disc.innerHTML = c.discount.toFixed().padStart(2, '0');
            row.appendChild(disc);

            clientTable.appendChild(row);
        }
    }
});

// Station table
btnStationTable.addEventListener("click", (ev) => {
    ev.preventDefault()
    xhr = new XMLHttpRequest();

    var url = "/admin/api/get/station";

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = (ev) => {
        ev.preventDefault();

        var stationTable = document.getElementById('stationBodyTable');
        var data = JSON.parse(xhr.response);

        removeNode(stationTable);

        for (c of data) {
            var row = document.createElement('tr');

            var id = document.createElement('th')
            id.scope = "row";
            id.innerHTML = c.idstation;
            row.appendChild(id);

            var city = document.createElement('td');
            city.innerText = c.station_city;
            row.appendChild(city);

            var name = document.createElement('td');
            name.innerHTML = c.station_name
            row.appendChild(name);

            stationTable.appendChild(row);
        }
    }
});

// Travel table
btnTravelTable.addEventListener("click", (ev) => {
    ev.preventDefault()
    xhr = new XMLHttpRequest();

    var url = "/admin/api/get/travel";

    xhr.open("GET", url);
    xhr.send();

    xhr.onload = (ev) => {
        ev.preventDefault();

        var travelTable = document.getElementById('travelBodyTable');
        var data = JSON.parse(xhr.response);

        removeNode(travelTable);

        for (c of data) {
            var row = document.createElement('tr');

            var id = document.createElement('th')
            id.scope = "row";
            id.innerHTML = c.idtravel;
            row.appendChild(id);

            var dep = document.createElement('td');
            dep.innerText = c.station_from.station_city;
            row.appendChild(dep);

            var arr = document.createElement('td');
            arr.innerHTML = c.station_to.station_city
            row.appendChild(arr);

            var hdepp = document.createElement('td');
            hdepp.innerHTML = moment(c.datetime_from).format('DD[/]MM[/]YY, HH[h]mm');
            row.appendChild(hdepp);

            var harr = document.createElement('td');
            harr.innerHTML = moment(c.datetime_to).format('DD[/]MM[/]YY, HH[h]mm');
            row.appendChild(harr);

            var price = document.createElement('td');
            price.innerHTML = c.price + '&euro;';
            row.appendChild(price);

            var train = document.createElement('td');
            train.innerHTML = c.idtrain.toFixed().padStart(3, '0');
            row.appendChild(train);

            var nbCorr = document.createElement('td');
            nbCorr.innerHTML = c.nb_seats_corr.toFixed().padStart(3, '0');
            row.appendChild(nbCorr);

            var nbWin = document.createElement('td');
            nbWin.innerHTML = c.nb_seats_win.toFixed().padStart(3, '0');
            row.appendChild(nbWin);

            travelTable.appendChild(row);
        }
    }
});

// Utils: Removes current row of a table
function removeNode(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}

/**************************/
/* AJAX req: send form    */
/**************************/

/**
 * Discount form (create, update, delete)
 */
// Create new discount card
crDisc.addEventListener("submit", (ev) => {
    ev.preventDefault();
    sendData(ev.target, 'create', 'discount');
});

//Update discount card
upDisc.addEventListener("submit", (ev) => {
    ev.preventDefault();
    sendData(ev.target, 'update', 'discount');
});

//Delete discount card
delDisc.addEventListener("submit", (ev) => {
    ev.preventDefault();
    sendData(ev.target, 'delete', 'discount');
});


/**
 * Train form (create, delete)
 */
// Create new discount card
crTrain.addEventListener("submit", (ev) => {
    ev.preventDefault();
    sendData(ev.target, 'create', 'train');
});

//Delete discount card
delTrain.addEventListener("submit", (ev) => {
    ev.preventDefault();
    sendData(ev.target, 'delete', 'train');
});


/**
 * Travel form (create, update, delete)
 */
// Create new travel
crTravel.addEventListener("submit", (ev) => {
    ev.preventDefault();
    sendData(ev.target, 'create', 'travel');
});

//Update travel
upTravel.addEventListener("submit", (ev) => {
    ev.preventDefault();
    sendData(ev.target, 'update', 'travel');
});

//Delete travel
delTravel.addEventListener("submit", (ev) => {
    ev.preventDefault();
    sendData(ev.target, 'delete', 'travel');
});

// Utils: sends the data from a form
function sendData(form, action, table) {
    // Create new FormData and XMLHttpRequest objects
    var xhr = new XMLHttpRequest();
    var fd = new FormData(form);
    
    // Prepare URL
    var url = '/admin/api/' + action + '/' + table;
    var data = new URLSearchParams(fd).toString();

    // Open connection and send encoded data
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);

    // Print message when received
    xhr.onload = (ev) => {
        console.log(xhr.response);
        var resp = JSON.parse(xhr.response);
        var messagesDiv = document.getElementById('messages');
        messagesDiv.classList = (resp.type == 'done') ? "alert alert-success mt-5" : "alert alert-danger mt-5";
        messagesDiv.innerHTML = resp.message;
        messagesDiv.hidden = false;
    };
}