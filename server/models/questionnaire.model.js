module.exports = (sequelize, Sequelize) => {
    const Questionnaire = sequelize.define("questionnaire", {
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        user_hobbies: {
            type: Sequelize.STRING,
            allowNull: true,
            get() {
                return this.getDataValue('user_hobbies').split(';')
            },
            set(val) {
                this.setDataValue('user_hobbies',val.join(';'));
            }
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: false
        },
        accept_terms: {
            type: Sequelize.BOOLEAN,
        }
    });

    return Questionnaire;
};