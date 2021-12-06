var express = require('express');
var con = require('../service/db');

/***************************/
/* DB Connection           */
/***************************/
con.connect((err) => {
    if (err) throw err;
})


/***************************/
/* Utils                   */
/***************************/

// Retrieve all stations
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


/***************************/
/* Routing                 */
/***************************/

/* Setting up admin router */
var router = express.Router();

/* GET admin page */
router.get('/', function(req, res, next) {
    res.render('admin', { title: 'SNCF Voyage' });
});

 /* GET return rows for given table */
router.get('/api/get/:table', function(req, res, next) {
    var table = req.params.table;

    var stmtGet = `SELECT * FROM ${table} LIMIT 100`;
    con.query(stmtGet, (err, data) => {
        if (err) throw err;
        
        if (data[0]) {
            if (table === 'travel') {
                for (travel of data) {
                    travel.station_from = mapper[travel.station_from];
                    travel.station_to = mapper[travel.station_to];
                }
            }

            res.send(JSON.stringify(data));
        }
    })
});

/* POST create new row for given table */
router.post('/api/create/:table', function(req, res, ext) {
    console.log(req.params, req.body);
    var queryParams = req.body;
    var table = req.params.table;

    // Simple case selection
    if (table === 'travel') {
        var idDep = queryParams.depStation,
            idArr = queryParams.arrStation,
            dtDep = queryParams.dDep + ' ' + queryParams.tDep,
            dtArr = queryParams.dArr + ' ' + queryParams.tArr,
            price = queryParams.prix,
            idTrain = queryParams.idTrain,
            nbCorr = queryParams.nbCorr,
            nbWin = queryParams.nbWin;
        
        var stmt = "INSERT INTO travel (station_from, station_to, datetime_from, datetime_to, price, idtrain, nb_seats_corr, nb_seats_win)" + 
                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        con.query(stmt, [idDep, idArr, dtDep, dtArr, price, idTrain, nbCorr, nbWin], (err, data) => {
            if (err) {
                throw err;
            } else {
                res.send({ type: "done", message: "Valeurs insérées avec succès" });
            }
        })

    } else if (table === 'train') {
        stmt = "INSERT INTO train (idcoach_1, idcoach_2, idcoach_3, idcoach_4, idcoach_5, idcoach_6, idcoach_7, idcoach_8)" + 
                " VALUES (1, 1, 1, 1 ,1 ,1, 1, 1)";
        con.query(stmt, (err, data) => {
            if (err) {
                throw err;
            } else {
                res.send({ type: "done", message: "Valeurs insérées avec succès" });
            }
        });

    } else if (table === 'discount') {
        var discDesc = queryParams.discDesc,
            discPercent = queryParams.discPercent;

        var stmt = "INSERT INTO discount (disc_desc, percentage) VALUES (?, ?)";
        con.query(stmt, [discDesc, discPercent], (err, data) => {
            if (err) {
                throw err;
            } else {
                res.send({ type: "done", message: "Valeurs insérées avec succès" });
            }
        });
    }
});

/* POST update row for a given table */
router.post('/api/update/:table', function(req, res, next) {
    console.log(req.params, req.body)
    var table = req.params.table;

    // Simple case selection
    if (table === 'travel') {
        queryParams = req.body.split(',');

        var idTravel = parseInt(queryParams[0]), 
            idDep = parseInt(queryParams[1]),
            idArr = parseInt(queryParams[2]),
            dtDep = new Date(queryParams[3]),
            dtArr = new Date(queryParams[4]),
            price = parseFloat(queryParams[5]),
            idTrain = parseInt(queryParams[6]),
            nbCorr = parseInt(queryParams[7]),
            nbWin = parseInt(queryParams[8]);

        var stmt = "UPDATE travel SET station_from = ?, station_to = ?, " + 
                    "datetime_from = ?, datetime_to = ?, price = ?, idtrain = ?, nb_seats_corr = ?, nb_seats_win = ? WHERE idtravel = ?";
        con.query(stmt, [idDep, idArr, dtDep, dtArr, price, idTrain, nbCorr, nbWin, idTravel], (err, data) => {
            if (err) throw err;
            else {
                res.send({ type: "done", message: "Ligne modifiée avec succès" });
            }
        })
    } else if (table === 'discount') {
        var discID = queryParams.discDesc,
            discPercent = queryParams.discPercent;
        
        var stmt = "UPDATE discount SET percentage = ? WHERE iddiscount = ?";
        con.query(stmt, [discID, discPercent], (err, data) => {
            if (err) throw err;
            else {
                res.send({ type: "done", message: "Ligne modifée avec succès" });
            }
        });
    } 
});

/* POST delete row for a given table */
router.post('/api/delete/:table', function(req, res, next) {
    console.log(req.params, req.body)
    var table = req.params.table;

    // Simple case selection
    if (table === 'travel') {
        var travelID = req.body.idTravel;

        var stmt = "DELETE FROM travel WHERE idtravel = ?";
        con.query(stmt, [travelID], (err, data) => {
            if (err) throw err;
            else{
                res.send({ type: "done", message: "Ligne supprimée avec succès" });
            }
        });
    } else if (table === 'train') {
        var trainID = req.body.idTrain;
        
        var stmt = "DELETE FROM train WHERE idtrain = ?";
        con.query(stmt, [trainID], (err, data) => {
            if (err) throw err;
            else {
                res.send({ type: "done", message: "Ligne supprimée avec succès" });
            }
        })
    } else if (table === 'discount') {
        var discountID = req.body.discID;

        var stmt = "DELETE FROM discount WHERE iddiscount = ?";
        con.query(stmt, [discountID], (err, data) => {
            if (err) throw err;
            else {
                res.send({ type: "done", message: "Ligne supprimée avec succès" });
            }
        })
    }
});


module.exports = router;