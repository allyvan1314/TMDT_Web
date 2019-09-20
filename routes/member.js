const fs = require('fs');

module.exports = {
    addMemberPage: (req, res) => {
        res.render('add-member.ejs', {
            title: "Welcome to NA Team Manager | Add a new member"
            ,message: ''
        });
    },
    addMember: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let phonenumber = req.body.phonenumber;
        let email = req.body.email;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = email + '.' + fileExtension;

        let emailQuery = "SELECT * FROM `TEAMINFOR` WHERE EMAIL = '" + email + "'";

        db.query(emailQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Email already exists';
                res.render('add-member.ejs', {
                    message,
                    title: "Welcome to NA Team Manager | Add a new member"
                });
            } else {
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        let query = "INSERT INTO `TEAMINFOR` (FIRSTNAME, LASTNAME, POS, PHONE, IMG, EMAIL) VALUES ('" +
                            first_name + "', '" + last_name + "', '" + position + "', '" + phonenumber + "', '" + image_name + "', '" + email + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-member.ejs', {
                        message,
                        title: "Welcome to NA Team Manager | Add a new member"
                    });
                }
            }
        });
    },
    editMemberPage: (req, res) => {
        let memberId = req.params.id;
        let query = "SELECT * FROM `TEAMINFOR` WHERE ID = '" + memberId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-member.ejs', {
                title: "Edit Member"
                ,member: result[0]
                ,message: ''
            });
        });
    },
    editMember: (req, res) => {
        let memberId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let phonenumber = req.body.phonenumber;

        let query = "UPDATE `TEAMINFOR` SET `FIRSTNAME` = '" + first_name + "', `LASTNAME` = '" + last_name + "', `POS` = '" + position + "', `PHONE` = '" + number + "' WHERE `TEAMINFOR`.`ID` = '" + memberId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteMember: (req, res) => {
        let memberId = req.params.id;
        let getImageQuery = 'SELECT IMG from `TEAMINFOR` WHERE ID = "' + memberId + '"';
        let deleteUserQuery = 'DELETE FROM TEAMINFOR WHERE ID = "' + memberId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].IMG;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};