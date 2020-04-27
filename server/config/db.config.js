module.exports = {
    HOST: "localhost",
    USER: "root",
    PORT: 3306,
    PASSWORD: "",
    DB: "pweb",
    schema: "pweb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}