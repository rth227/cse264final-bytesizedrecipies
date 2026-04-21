import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import { query } from './db/postgres.js';

// create the app
const app = express()
// it's nice to set the port number so it's always the same
app.set('port', process.env.PORT || 8080);
// set up some middleware to handle processing body requests
app.use(express.json())
// set up some midlleware to handle cors
app.use(cors())

// base route
app.get('/', (_req, res) => {
    res.send("Welcome to Byte Sized Recipes!!!")
})

app.get('/up', (_req, res) => {
  res.json({status: 'up'})
})

/* RECIPES ------------------------------------------------ */


/* FAVORITES ------------------------------------------------ */

/* COOKBOOKS ------------------------------------------------ */

app.listen(app.get('port'), () =>{
  console.log('Server running at http://localhost:%d', app.get('port'))
})