import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'rth227',
  host: 'cse264.cru8ico68j35.us-east-1.rds.amazonaws.com',
  database: 'cse264',  
  password: 'rth227_lehigh',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Successfully connected to PostgreSQL');
  release();
});

// create the app
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

    const qs = `INSERT INTO bytesized_users (name, email, password) VALUES ($1, $2, $3)`
    query(qs, [body.name, body.email, body.password]).then(data => res.send(`${data.rowCount} row inserted`))

  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

// Get detailed info for a single recipe
app.get('/api/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();

    // Map the single recipe data to match your frontend
    const recipe = {
      title: data.title,
      image_url: data.image,
      prep_time: data.readyInMinutes,
      servings: data.servings,
      instructions: data.instructions,
      extendedIngredients: data.extendedIngredients
    };

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
});

app.get('/api/cookbooks/:id/recipes', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT r.* FROM bytesized_recipes r
       JOIN bytesized_cookbook_recipes cr ON r.id = cr.recipe_id
       WHERE cr.cookbook_id = $1`, // Ensure this matches your actual table name
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// get all cookbooks for the user
app.get('/api/cookbooks', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.id, c.name, COUNT(r.recipe_id) as recipe_count 
      FROM bytesized_cookbooks c 
      LEFT JOIN bytesized_cookbook_recipes r ON c.id = r.cookbook_id 
      GROUP BY c.id, c.name
    `);
    
    console.log("Cookbooks found:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json([]);
  }
});

app.get('/api/cookbooks/all', async (req, res) => {
  try {
    // FIX: Use 'bytesized_cookbooks' instead of 'cookbooks'
    const result = await pool.query(`
      SELECT bc.*, COUNT(bcr.recipe_id) as recipe_count
      FROM bytesized_cookbooks bc
      LEFT JOIN bytesized_cookbook_recipes bcr ON bc.id = bcr.cookbook_id
      GROUP BY bc.id
      ORDER BY bc.id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Failed to fetch cookbooks" });
  }
});

app.post('/api/cookbooks/create', async (req, res) => {
  const { name, user_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO bytesized_cookbooks (name, user_id) VALUES ($1, $2) RETURNING *',
      [name, user_id || 1]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Could not create cookbook" });
  }
});

app.post('/api/cookbooks/add', async (req, res) => {
  const { recipeId, cookbookId, recipeTitle, ingredients, instructions, image_url, meal_type } = req.body;

  try {
    // STEP 1: Ensure the recipe exists in bytesized_recipes
    // We use "ON CONFLICT" so it updates if the recipe was already there
    await pool.query(
      `INSERT INTO bytesized_recipes (id, title, ingredients, instructions, image_url, meal_type, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, 1) 
       ON CONFLICT (id) DO UPDATE SET 
         title = EXCLUDED.title,
         ingredients = EXCLUDED.ingredients,
         instructions = EXCLUDED.instructions,
         image_url = EXCLUDED.image_url`,
      [recipeId, recipeTitle, ingredients, instructions, image_url, meal_type || 'recipe']
    );

    // STEP 2: Now that Step 1 is DONE, create the link
    // This will no longer fail the foreign key check because the recipe ID now exists
    await pool.query(
      `INSERT INTO bytesized_cookbook_recipes (cookbook_id, recipe_id) 
       VALUES ($1, $2) 
       ON CONFLICT DO NOTHING`,
      [cookbookId, recipeId]
    );

    res.json({ success: true, message: "Recipe saved and linked!" });

  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/cookbooks/:id/recipes', async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Fetch cookbook name
    const cookbookResult = await pool.query('SELECT name FROM cookbooks WHERE id = $1', [id]);
    const result = await pool.query(
      `SELECT r.* FROM bytesized_recipes r
       JOIN cookbook_recipes cr ON r.id = cr.recipe_id
       WHERE cr.cookbook_id = $1`,
      [id]
    );
    res.json(result.rows);
    // 2. Fetch recipes with ALL necessary columns
    const recipeResult = await pool.query(
      `SELECT r.id, r.title, r.image_url, r.instructions, r.ingredients, r.meal_type 
       FROM bytesized_recipes r
       JOIN cookbook_recipes cr ON r.id = cr.recipe_id
       WHERE cr.cookbook_id = $1`,
      [id]
    );

    res.json({
      name: cookbookResult.rows[0]?.name || "My Cookbook",
      recipes: recipeResult.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

/* route POST api/auth/login cerigies credientaials */
app.post('/api/auth/login', async (req, res) => {
  try {
    //get content of body
    let body = req.body

    //validate data before adding it
    if (!body.email || !body.password){
      return res.status(400).send('Missing required fields')
    }

    //get the user's  email
    const result = await query(`SELECT * FROM bytesized_users WHERE email = $1`, [body.email]);
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

/* use PUT /api/users/:id/role to update user's status (from free to admin or vise versa) */
app.put('/api/users/:id/role', (req, res) => {
  //get content of body
  const body = req.body;

  //updating field 
  let qs = `UPDATE bytesized_users SET role = $1 WHERE id = $2`
  query(qs, [body.role, req.params.id] ).then(data => res.send(`${data.rowCount} row inserted`))
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
/* route GET /api/favorites/:userID gets all the favorites for a user */
app.get('/api/favorites/:userId', (req, res) => {
  try {
    /* gets all recipes a user has favorited by connecting recipe id from favorites and recipes */
    const qs = `SELECT bytesized_recipes.* FROM bytesized_favorites 
                JOIN bytesized_recipes ON bytesized_favorites.recipe_id = bytesized_recipes.id
                WHERE bytesized_favorites.user_id = $1`
    query(qs, [req.params.userId]).then(data => {res.json(data.rows)})
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* routes POST /api/favorites/:userID adds a favorite to a user's favorites */
app.post('/api/favorites', async (req, res) => {
  try {
    //get content of body
    let body = req.body

    //validate data before adding it
    if (!body.user_id || !body.recipe_id){
      return res.status(400).send('Missing required fields')
    }

    /* get number of favorites by counting the count of favorites by user id, and parse it as an int */
    const num = await query(`SELECT COUNT(*) FROM bytesized_favorites WHERE user_id = $1`, [body.user_id])
    const count = parseInt(num.rows[0].count)
    if (count > 4 ) {
      return res.status(400).send('You can only have 5 favorites')
    }

    /* add favorites */
    const qs = `INSERT INTO bytesized_favorites (user_id, recipe_id) VALUES ($1, $2)`
    query(qs, [body.user_id, body.recipe_id]).then((data => res.send(`${data.rowCount} favorite added`)))
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* route DELETE /api/favorites remove a recipe from favorites */
app.delete('/api/favorites', (req, res) => {
  try { 
    //get content of body
    let body = req.body

    //validate data before removing it
     if (!body.user_id || !body.recipe_id){
      return res.status(400).send('Missing required fields')
    }

    //delete it 
    const qs = `DELETE FROM bytesized_favorites WHERE user_id = $1 AND recipe_id = $2`
    query(qs, [body.user_id, body.recipe_id]).then(data => res.send(`${data.rowCount} favorite removed`))

  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* COOKBOOKS ------------------------------------------------ */

/* route GET /api/cookbooks/:userID gets all the cook books for a user */
app.get('/api/cookbooks/:userId', (req, res) => {
  try {
    /* gets all cookbooks from a user */
    const qs = `SELECT * FROM bytesized_cookbooks WHERE user_id = $1`
    query(qs, [req.params.userId]).then(data => {res.json(data.rows)})
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* POST route /api/cookbooks creates a new cookbook */
app.post('/api/cookbooks', async (req, res) => {
  try {
    //get content of body
    let body = req.body

    //validate data before adding it
    if (!body.user_id || !body.name){
      return res.status(400).send('Missing required fields')
    }

    //validate that the user is premium user
    if (body.user_role === 'free'){
      return res.status(400).send("Cookbooks are only for premium users")
    }

    /* create cookbook */
    const qs = `INSERT INTO bytesized_cookbooks (user_id, name, description ) VALUES ($1, $2, $3)`
    query(qs, [body.user_id, body.name, body.description]).then((data => res.send(`${data.rowCount} cookbook added`)))
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* GET route /api/cookbooks/:id/recipes gets recipes in a cookbook */
app.get('/api/cookbooks/:id/recipes', (req, res) => {
  try {
    /* gets all recipes in a cookbook by connecting recipe id from favorites and recipes */
    const qs = `SELECT bytesized_recipes.* FROM bytesized_cookbook_recipes
                JOIN bytesized_recipes ON bytesized_cookbook_recipes.recipe_id = bytesized_recipes.id
                WHERE bytesized_cookbook_recipes.cookbook_id = $1`
    query(qs, [req.params.id]).then(data => {res.json(data.rows)})
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})


/* POST route /api/cookbooks/:id/recipes adds a recipe to an existing cookbook */
app.post('/api/cookbooks/:id/recipes', (req, res) => {
  try {
    //get content of body
    let body = req.body

    //validate data before adding it
    if (!body.recipe_id){
     return res.status(400).send('Missing required fields')
    }

    //insert the recipe into the cookbook 
    const qs = `INSERT INTO bytesized_cookbook_recipes (cookbook_id, recipe_id) VALUES ($1, $2)`
    query(qs, [req.params.id, body.recipe_id]).then(data => res.send(`${data.rowCount} recipe inserted`))

  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* route DELETE /api/cookbooks/:id/recipes:recipeId will remove a recipe by an id */
app.delete('/api/cookbooks/:id/recipes/:recipeId', (req, res) => {
  try {
    //delete 
    const qs = `DELETE FROM bytesized_cookbook_recipes WHERE cookbook_id = $1 AND recipe_id = $2`
    query(qs, [req.params.id, req.params.recipeId]).then(data => res.send(`${data.rowCount} recipe deleted`))
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})

/* API - Spoonacular ------------------------------------------------ */
/* route GET /api/search - you can search recipes from Spoonacular API */
app.get('/api/search', async (req, res) => {
  try {
    const searchItem = req.query.q 

    if (!searchItem){
      return res.status(400).send('Missing required fields')
    }

    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchItem}&fillIngredients=true&addRecipeInformation=true&apiKey=${process.env.SPOONACULAR_API_KEY}`;    
    const response = await fetch(url)
    const data = await response.json()

    // --- CRITICAL SAFETY GATE ---
    // If Spoonacular returns an error or no results, data.results will be undefined.
    // This check prevents the .map() crash!
    if (!data || !data.results) {
      console.error("Spoonacular API Error or No Results:", data);
      return res.json([]); // Send an empty array so the frontend doesn't break
    }

    // Now it is safe to map
    const recipes = data.results.map(r => ({
      id: r.id,
      title: r.title,
      image_url: r.image,
      prep_time: r.readyInMinutes, // Spoonacular uses readyInMinutes
      servings: r.servings,
      extendedIngredients: r.extendedIngredients, 
      source_url: r.sourceUrl
    }));

    res.json(recipes)
  } catch (error) {
    console.error("Internal Server Error:", error)
    res.status(500).send("Internal Server Error")
  }
})

app.listen(app.get('port'), () =>{
  console.log('Server running at http://localhost:%d', app.get('port'))
})