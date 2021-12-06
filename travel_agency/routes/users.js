var express = require('express');
var con = require('../service/db');
var crypto = require('crypto');
var moment = require('moment');

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

// Returns true if a discount card is available given an age
function discountAvailable(discNum, date) {
	var now = moment();
	var age = moment.duration(now.diff(date)).asYears();
	age = Math.floor(age);

	if (discNum === '1') {
		return ((18 <= age && age <= 27) ? true : false);
	} else if (discNum === '2') {
		return true;
	} else if (discNum === '3') {
		return ((55 <= age && age <= 75) ? true : false);
	} else {
		return true;
	}

};

/***************************/
/* Routing                 */
/***************************/

var router = express.Router();

/* GET logout a user */
router.get('/logout', function(req, res, next) {
	res.clearCookie('user');
	res.render('index', {
		title: 'Agence SNCF'
	});
});

/* GET (redirect) login page from home page /users */
router.get('/', function(req, res, next) {
  	res.redirect('/login')
});

/* GET login page */
router.get('/login', function(req, res, next) {
	if (!req.cookies.user) {
		res.render('login', {
			title: 'SNCF Voyage'
		});
	} else {
		res.render('index', {
			title: 'Agence SNCF',
			user: req.cookies.user
		});
	}
	
});

/* POST login request */
router.post('/login', function(req, res, next) {
	var firstName = req.body.first_name,
		lastName = req.body.last_name,
		pass = req.body.password;
	var passHash = crypto.createHash('sha256').update(pass).digest('base64');

	var stmt = "SELECT * FROM client JOIN discount ON client.discount = discount.iddiscount WHERE first_name=? AND last_name=? AND pass_hash=?"
	con.query(stmt, [firstName, lastName, passHash], (err, data, fields) => {
		if (err) throw err;
		console.log(data)
		if (data[0]) {
			if (req.cookies.user) {
				res.clearCookie('user')
			}

			var userCookie = {
				userID: data[0].idclient,
				firstName: data[0].first_name,
				lastName: data[0].last_name,
				dateOfBirth: data[0].date_of_birth,
				discountPercent: data[0].percentage,
				discountDesc: data[0].disc_desc
			};
			
			res.cookie('user', userCookie, { httpOnly: true });
			res.render('booking', {
				title: 'SNCF Voyage',
				user: userCookie
			});
		} else {
			res.render('login', {
				title: 'SNCF Voyage',
				message: "L'dentifiant ou le mot de passe est incorrect"
			});
		}

	});

	
});


/* GET register page */
router.get('/register', function(req, res, next) {
	if (!req.cookies.user) {
		res.render('register', {
			title: "SNCF Voyage"
		});
	} else {
		res.render('index', {
			title: "SNCF Voyage",
			user: req.cookies.user
		})
	}
  	
});


/* POST register request */
router.post('/register', function(req, res, next) {
	console.log(req.body);
	var firstName = req.body.first_name,
		lastName = req.body.last_name,
		dateOfBirth = req.body.dateOfBirth,
		discount = req.body.discount,
		pass = req.body.password,
		passCheck = req.body.passwordCheck;

	if (pass != passCheck) {
		res.render('register', { 
		title: "Créer un compte",
		message: "Les mots de passe sont différents"
		});
	}
	else if (!discountAvailable(discount, dateOfBirth)) {
		res.render('register', { 
			title: "SNCF Voyage",
			message: "Votre age ne vous permet pas d'avoir cette carte de réduction"
		});
	}
	else {
		var now = moment();
		var age = moment.duration(now.diff(dateOfBirth)).asYears();
		age = Math.floor(age);
		var passHash = crypto.createHash('sha256').update(pass).digest('base64');
		
		var stmt = "INSERT INTO client (first_name, last_name, date_of_birth, discount, pass_hash) VALUES (?, ?, ?, ?, ?);"
		con.query(stmt, [firstName, lastName, dateOfBirth, discount, passHash], (err, data, fields) => {
			if (err) throw err;
			if (data[0]) {
				console.log("Nouvelle utilisateur crée");
			}

			res.render('login', {
				title: 'SNCF Voyage'
			});
		});
	}
});

/* GET Retrieve an user acount */
router.get('/account', function(req, res, next){
	var user = req.cookies.user

	if (!user) {

		res.redirect('/users/login');

	} else {

		var stmtTicket = "SELECT * FROM ticket WHERE idclient = ?";
		con.query(stmtTicket, [user.userID], (err, data) => {
			if (err) throw err;
			console.log("Tickets:\n", data);
			if (data[0]) {

				
				var tickets = data;
				var ticketList = [];
				for (let ticket of tickets) {
					ticketList.push(ticket.idtravel)
				}

				var stmtTravel = "SELECT * FROM travel WHERE idtravel IN (?)";
				con.query(stmtTravel, [ticketList], (err, data) => {
					if (err) throw err;
					console.log("Travels:\n", data)

					if (data[0]) {
						for (travel of data) {
							travel.station_from = mapper[travel.station_from];
							travel.station_to = mapper[travel.station_to];
						}

						res.render('account', {
							title: 'SNCF Voyage',
							user: user,
							travels: data,
							tickets: tickets
						})
					}
				})
			} else {
				res.render('account', {
					title: 'SNCF Voyage',
					user: user,
					travel: null
				})
				
			}
		})
	}
});

/* POST Update user account */
router.post('/edit/account/:discount', function(req, res, next) {
	var userID = req.cookies.user.userID,
		discount = parseInt(req.params.discount);
	console.log(typeof(discount), req.cookies.user)
	if (!discountAvailable(discount.toString(), req.cookies.user.dateOfBirth)) {
		res.send("Vous ne pouvez pas choisir cette carte de réduction en raison de votre age");
	} else {
		var stmtUp = "UPDATE client SET discount = ? WHERE idclient = ?";
		con.query(stmtUp, [discount, userID], (err, data) => {
			if (err) throw err;
			console.log(data);
			res.send("Votre modification a bien été enregistrée et sera active à votre prochaine connexion.")
		});
	}

	
});

module.exports = router;
