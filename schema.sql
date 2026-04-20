-- Final Project - Byte Sized Recipies 
-- Riley (database), Gwenn (backend), Kristen (frontend)
 
-- Users 
-- roles - free, premium, admin
CREATE TABLE users (
    id         SERIAL PRIMARY KEY,
    name       TEXT,
    email      TEXT NOT NULL,
    password   TEXT NOT NULL,
    role       TEXT NOT NULL DEFAULT 'free',
);
 
 
-- Recipies
-- admins can edit or delete anyone recipies
CREATE TABLE recipes (
    id           SERIAL PRIMARY KEY,
    title        TEXT NOT NULL,
    description  TEXT,                -- optional
    image_url    TEXT,                -- optional
    ingredients  TEXT[] NOT NULL,     -- ingredients saved as strings
    instructions TEXT NOT NULL,
    meal_type    TEXT NOT NULL,       -- breakfast, lunch, dinner, snack
    dietary_tags TEXT[],              -- vegan, gluten-free, dairy-free, etc
    prep_time    INTEGER,             -- minutes
    cook_time    INTEGER,             -- minutes
    servings     INTEGER,
    created_by   INTEGER REFERENCES users(id),
);
 
 
-- Favorites
-- free users only have 5 favorites
CREATE TABLE favorites (
    user_id    INTEGER NOT NULL REFERENCES users(id),
    recipe_id  INTEGER NOT NULL REFERENCES recipes(id),
);
 
 
-- Cookbooks
-- premium and admin users only
CREATE TABLE cookbooks (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id),
    name        TEXT NOT NULL,
    description TEXT,
);
 
 
-- Cookbook Recipies
CREATE TABLE cookbook_recipes (
    cookbook_id INTEGER NOT NULL REFERENCES cookbooks(id),
    recipe_id   INTEGER NOT NULL REFERENCES recipes(id),
);