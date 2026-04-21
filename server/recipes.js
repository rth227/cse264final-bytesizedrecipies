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

/* USERS -------------------------------------------------- */

/* route POST api/auth/signup creates a new user (signing up, defaults to free ) */
app.post('/api/auth/signup', (req, res) => {
  try {
    //get content of body
    let body = req.body

    //validate data before adding it
    if (!body.name || !body.email || !body.password){
     return res.status(400).send('Missing required fields')
    }

    const qs = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`
    query(qs, [body.name, body.email, body.password]).then(data => res.send(`${data.rowCount} row inserted`))

  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* route POST api/auth/login cerigies credientaials */
app.post('/api/auth/signup', (req, res) => {
  try {
    //get content of body
    let body = req.body

    //validate data before adding it
    if (!body.email || !body.password){
      return res.status(400).send('Missing required fields')
    }

    //get the user's  email
    const result = query(`SELECT * FROM users WHERE email = $1`, [body.email]);
    const email = result.rows[0];

    //verify user has an account
    if (!email){
      return res.status(400).send('User not found')
    }
    //ensure correct password
    if (email.password !== body.password){
      return res.status(400).send('Invalid password')
    }

    res.send(email)
  } catch (error){
    console.log(error)
    res.send(error)
  }
})
/* RECIPES ------------------------------------------------ */

/* GET /api/recipes for all recipes */
app.get('/api/recipes', (req, res) => {
  try {
    const qs = `SELECT * FROM bytesized_recipes`
    query(qs).then(data => {res.json(data.rows)})
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* GET /api/recipes/:id for specific recipe by id */
app.get('/api/recipes/:id', (req, res) => {
  try {
    const qs = `SELECT * FROM bytesized_recipes WHERE id = $1`
    query(qs, [req.params.id]).then(data => {res.json(data.rows)})
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})


/* route POST /api/recipes adds an order to the database of orders */
app.post('/api/recipes', (req,res) => {
  try {
    //get content of body
    let body = req.body

    //validate data before adding it
    if (!body.title || !body.ingredients || !body.instructions || !body.meal_type || !body.dietary_tags || !body.prep_time || !body.cook_time || !body.servings || !body.created_by){
      return res.status(400).send('Missing required fields')
    }

    //inserting fields into database
    let qs = `INSERT INTO bytesized_recipes (title, description, image_url, ingredients, instructions, meal_type, dietary_tags, prep_time, cook_time, servings, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`
    query(qs, [body.title, body.description, body.image_url, body.ingredients, body.instructions, body.meal_type, body.dietary_tags, body.prep_time, body.cook_time, body.servings, body.created_by]).then(data => res.send(`${data.rowCount} row inserted`))
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* route PUT /api/recipes - owner or admin can do this */
app.put('/api/recipes/:id', (req,res) => {
  try {
    //get content of body
    let body = req.body

    //validate data before adding it
    if (!body.title || !body.ingredients || !body.instructions || !body.meal_type || !body.dietary_tags || !body.prep_time || !body.cook_time || !body.servings || !body.created_by){
      return res.status(400).send('Missing required fields')
    }

    //inserting fields into database
    let qs = `UPDATE bytesized_recipes SET title=$1, description=$2, ingredients=$3, instructions=$4, meal_type=$5, dietary_tags=$6, prep_time=$7, cook_time=$8, servings=$9 WHERE id=$10`
    query(qs, [body.title, body.description, body.ingredients, body.instructions, body.meal_type, body.dietary_tags, body.prep_time, body.cook_time, body.servings, req.params.id]).then(data => res.send(`${data.rowCount} row inserted`))
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* routes DELETE /api/recipes/:id to delete a specific recipe by id */
app.delete('/api/recipes/:id', (req,res) => {
  try {
    const qs = `DELETE from bytesized_recipes WHERE id = $1`
    query(qs, [req.params.id]).then(data => res.send(`${data.rowCount} row inserted`))
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* FAVORITES ------------------------------------------------ */


/* COOKBOOKS ------------------------------------------------ */

app.listen(app.get('port'), () =>{
  console.log('Server running at http://localhost:%d', app.get('port'))
})