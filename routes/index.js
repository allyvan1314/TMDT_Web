module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `TEAMINFOR` ORDER BY ID ASC";
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to NA Team Manager | View Members"
                ,members: result
            });
        });
    },
};