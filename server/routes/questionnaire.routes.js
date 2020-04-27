module.exports = app => {
    const questionnaires = require("../controllers/questionnaire.controller.js");

    var router = require("express").Router();

    router.post("/create",questionnaires.create);

    router.get("/list",questionnaires.findAll);

    router.get("/find/:mail",questionnaires.findOne);

    router.put("/update/:mail",questionnaires.update);

    router.delete("/delete/:mail",questionnaires.delete);

    router.delete("/delete_all",questionnaires.deleteAll);

    app.use("/api/questionnaires",router);
}