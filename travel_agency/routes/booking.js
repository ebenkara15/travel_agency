var express = require('express');
var con = require('../service/db');

// Params from DB hard coded here
const maxSeat = 800;
const maxCoach = 8;
const seatPerCoach = maxSeat / maxCoach;

/***************************/
/* DB Connection           */
/***************************/
con.connect((err) => {
    if (err) throw err;
})


/***************************/
/* Utils                   */
/***************************/

// Retrive all stations
var mapper = {};
con.query("SELECT * FROM station", (err, data) => {
    if (err) throw err;
    setMapperValues(data);
});

// Utils for set values from a query
function setMapperValues(data) {
    for (station of data) {
        mapper[station.idstation] = {
            station_city: station.station_city, 
            station_name: station.station_name
        };
    }
}

// Options for datetime printing
var dateOpts = {weekday:'short', day:'numeric', month: 'short', hour:'numeric', minute:'2-digit'};


// Utils for deciding which place to give
// Given a side for a sear, the number of corridor seats
// and the number of window seats, returns the correct coach
// and the correct seat. The train is filled started with 
// coach 0 and seat 0, then in ascending order
function getCorrectSeat(seatCorr, seatWin, side) {
    var seatID, coachId;

    if (side === 'corr') {
        coachId = Math.floor(
            ((maxSeat/2) - seatCorr) / (seatPerCoach / 2)
        ) + 1;
        seatID = (coachId-1) * seatPerCoach + seatPerCoach - (seatCorr % seatPerCoach) + 1;

    } else {
        coachId = Math.floor(
            ((maxSeat/2) - seatWin) / (seatPerCoach / 2)
        ) + 1;
        seatID = (coachId-1) * seatPerCoach + (seatWin % seatPerCoach) + 1;
    }
    
    return { seatID: (seatID <= maxSeat) ? seatID : 0, coachId: (coachId <= maxCoach) ? coachId : 0 }
}



/***************************/
/* Routing                 */
/***************************/

/* Setting up booking router */
var router = express.Router();

/* GET booking page. */
router.get('/', function(req, res, next){
    res.render('booking', {
        title: 'SNCF Voyage',
        user: req.cookies.user
    });
});

/* POST Result of a search */
router.post('/search', function(req, res, next){
    var params = req.body;
    var depStation = params.from,
        arrStation = params.to,
        depDay = params.date,
        depTime = params.time;

    var stmt = "SELECT * FROM travel WHERE station_from in (SELECT idstation FROM station WHERE station_city=?) " +
    "AND station_to in (SELECT idstation FROM station WHERE station_city=?) " +
    "AND DATE(datetime_from) = DATE(?) AND TIME(datetime_from) >= TIME(?)";
    
    con.query(stmt, [depStation, arrStation, depDay.toString(), depTime.toString()], (err, data) => {
        if (err) throw err;
        
        if (data[0]){
            for (travel of data) {
                travel.station_from = mapper[travel.station_from];
                travel.station_to = mapper[travel.station_to];
            }
            console.log("Resultat de la recherche: \n", data)
            res.render('result', {
                title: 'SNCF Voyage',
                result : data,
                dateOpts : dateOpts,
                user: req.cookies.user ? req.cookies.user : null
            });
        } else {
            res.render('result', {
                title: 'SNCF Voyage',
                result: null,
                user: req.cookies.user ? req.cookies.user : null
            })
        }
    });
});

/* GET Detail of a given travel */
router.get('/travel/:id', function(req, res, next) {
    var travelID = req.params['id'];

    var stmt = "SELECT * FROM travel WHERE idtravel = ?"

    con.query(stmt, [travelID], (err, data) => {
        if (err) throw err;
        if (data[0]) {
            for (travel of data) {
                travel.station_from = mapper[travel.station_from];
                travel.station_to = mapper[travel.station_to];
            }
            console.log(data[0]);
            
            if (req.cookies.user) {
                res.render('detailTravel', {
                    title: 'SNCF Voyage',
                    travel: data[0],
                    user: req.cookies.user ? req.cookies.user : null
                });
            } else {
                res.render('login', {
                    title: 'SNCF Voyage',
                    message: "Vous devez être connecté pour réserver un billet"
                });
            }

            
        }
    });
    
})


/* POST process validation on a travel with seat side */
router.post('/travel/:id/:side', function(req, res, next) {
    var travelID = req.params['id'],
        seatSide = req.params['side'];

    var user = req.cookies.user

    console.log(`Seat ${seatSide} for travel n°${travelID} and user ${user.firstName + ' ' + user.lastName}`);

    var stmt = "SELECT nb_seats_corr, nb_seats_win FROM travel WHERE idtravel = ?"

    con.query(stmt, [travelID], (err, data) => {
        if (err) throw err;
        if (data[0]) {
            console.log("Place restantes: ", data[0]);
            var seatSel = getCorrectSeat(data[0].nb_seats_corr, data[0].nb_seats_win, seatSide);
            console.log(seatSel);

            // Coach = 0 means there is no place left for the side selected
            if (seatSel.coachId > 0) {
                var stmtInsert = "INSERT INTO ticket (idclient, idtravel, num_seat, num_coach, side) " + 
                "VALUES (?, ?, ?, ?, ?)"
                con.query(stmtInsert, [user.userID, travelID, seatSel.seatID, seatSel.coachId, seatSide], (err, data) => {
                    if (err) throw err;

                    response = {
                        status: 1,
                        message: `Réservation confirmée. Poursuivez en consultant votre billet`,
                        nextURL: `/booking/travel/${travelID}/confirm`
                    }
                    res.send(response);

                });

            } else {
                response = {
                    status: 0,
                    message: "Plus de place pour la préférence choisie. Sélectionnez-en une autre ou consulter un autre trajet.",
                    nextURL: ''
                };

                res.send(response);
            }
        }
    });
})

/* GET Confirm and add a ticket for a given user */
router.get('/travel/:id/confirm', function(req, res, next) {
    var travelID = parseInt(req.params['id']);
    var user = req.cookies.user;

    var stmt = "SELECT * FROM travel, ticket WHERE ticket.idclient = ? AND travel.idtravel = ?";

    con.query(stmt, [user.userID, travelID], (err, data) => {
        if (err) throw err;
        if (data[0]) {
            for (travel of data) {
                travel.station_from = mapper[travel.station_from];
                travel.station_to = mapper[travel.station_to];
            }
            console.log(travel)
            res.render('confirmation', {
                title: 'SNCF Voyage',
                travel: data[0],
                user: req.cookies.user
            })
        } else {
            res.render('confirmation', {
                title: 'SNCF Voyage',
                travel: null
            })
        }
    });
})

module.exports = router;