const db = require("../models")
const Questionnaire = db.questionnaires;
const Op = db.Sequelize.Op;

exports.create = async (req,res) => {
    if(!req.body.first_name || !req.body.last_name || !req.body.mail) {
        res.status(400).send({
            message: "First name/Last name/email/gender are mandatory!"
        });
        return;
    }

    var exists = false;
    await Questionnaire.count({where: {
        mail: req.body.mail
    }}).then(count => {
        console.log(count);
        if (count != 0) {
            exists = true;
        }
    });

    console.log(exists);

    if(exists == true) {
        res.status(500).send({
            message: "Data for this email already exists!"
        });
        return;
    }

    const questionnnaire = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mail: req.body.mail,
        user_hobbies: req.body.user_hobbies,
        gender: req.body.gender,
        accept_terms: req.body.accept_terms
    }

    console.log(questionnnaire);
    try {
        Questionnaire.create(questionnnaire)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occured while creating the Questionnaire."
                });
            });
    } catch(err) {
        res.status(500).send({
            message:
                err.message || "Some error occured while creating the Questionnaire."
        });
    }
};

exports.findAll = (req,res) => {
    Questionnaire.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrievieng questionnaires."
            });
        });
};

exports.findOne = (req,res) => {
    const mail = req.params.mail;
    var condition =  mail ? { mail: { [Op.like]: `%${mail}%` } } : null;

    Questionnaire.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrievieng questionnaires."
            });
        });
};

exports.update = (req, res) => {
  const mail = req.params.mail;

  Questionnaire.update(req.body, {
      where: {mail: mail}
  }).then(num => {
    if (num == 1) {
        res.send({
            message: "Questionnaire was updated successfully."
        });
    } else {
        res.send({
            message: `Cannot update Questionnaire of email=${mail}. Maybe Questionnaire was not found or the request body is empty!`
        });
    }
  })
  .catch(err => {
      res.status(500).send({
          message: "Error updating Questionnaire of email=" + mail
      });
  });
};

exports.delete = (req, res) => {
    const mail = req.params.mail;

    Questionnaire.destroy({
       where: {mail: mail} 
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Questionnaire was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Questionnaire of email=${mail}. Maybe the Questionnaire was not found`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Tutorial of email=" + mail
        });
    });
};

exports.deleteAll = (req, res) => {
    Questionnaire.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({message: `${nums} Questionnaires were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while removing all tutrials"
        });
    });
};

