if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const dbConnection = require('./config/dbconnection');

const PORT = process.env["PORT"] || 5000;
const app = require('./app')
  // db connection function call
  dbConnection()

const listener = app.listen(PORT, () => {
  console.log("App listerning to port", "http://localhost:" + listener.address().port)
})

