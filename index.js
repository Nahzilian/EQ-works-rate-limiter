// Set up
const express = require('express')
const app = express();
const cors = require('cors')
const leaky = require('./leaky-bucket/leaky')

const dataRoute = require('./api/data');

// Import Leaky bucket and Cors
app.use(leaky);
app.use(cors())

app.get('/', (req, res) => {
  res.send('Welcome to EQ Works 😎')
})

// Include dataRoute
app.use('/',dataRoute)

app.listen(process.env.PORT || 5555, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Running on ${process.env.PORT || 5555}`)
  }
})

// last resorts
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
  process.exit(1)
})
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
  process.exit(1)
})
