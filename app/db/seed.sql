-- Seed data for website 
 
 
-- Sample users - plain just for testing
INSERT INTO bytesized_users (name, email, password, role) VALUES
    ('Admin User',   'admin@test.com',   'password123', 'admin'),
    ('Premium User', 'premium@test.com', 'password123', 'premium'),
    ('Free User',    'free@test.com',    'password123', 'free');
 
 
-- Sample recipies 
INSERT INTO bytesized_recipes
    (title, description, image_url, ingredients, instructions, meal_type, dietary_tags, prep_time, cook_time, servings, created_by)
VALUES
    (
        'Classic Scrambled Eggs',
        'Fluffy scrambled eggs, ready in 5 minutes.',
        NULL,
        ARRAY['eggs', 'butter', 'salt', 'pepper', 'milk'],
        'Whisk eggs with milk, salt, and pepper. Melt butter in a pan over medium-low heat. Pour in eggs and stir gently until just set.',
        'breakfast',
        ARRAY['vegetarian', 'gluten-free'],
        2, 5, 2,
        (SELECT id FROM bytesized_users WHERE email = 'admin@test.com')
    ),
    (
        'Avocado Toast',
        'Simple and trendy breakfast.',
        NULL,
        ARRAY['bread', 'avocado', 'salt', 'pepper', 'lemon'],
        'Toast the bread. Mash avocado with lemon juice, salt, and pepper. Spread on toast.',
        'breakfast',
        ARRAY['vegan', 'vegetarian'],
        5, 3, 1,
        (SELECT id FROM bytesized_users WHERE email = 'premium@test.com')
    ),
    (
        'Chicken Fried Rice',
        'Quick weeknight dinner using leftover rice.',
        NULL,
        ARRAY['chicken', 'rice', 'eggs', 'soy sauce', 'garlic', 'onion', 'peas', 'carrots'],
        'Cook chicken in a hot pan until browned. Push to the side, scramble eggs. Add vegetables, rice, and soy sauce. Stir-fry until hot.',
        'dinner',
        ARRAY['dairy-free'],
        15, 15, 4,
        (SELECT id FROM bytesized_users WHERE email = 'admin@test.com')
    ),
    (
        'Caprese Salad',
        'Fresh Italian-style salad.',
        NULL,
        ARRAY['tomato', 'mozzarella', 'basil', 'olive oil', 'salt', 'pepper', 'balsamic vinegar'],
        'Slice tomatoes and mozzarella. Arrange with basil leaves. Drizzle with olive oil and balsamic, season with salt and pepper.',
        'lunch',
        ARRAY['vegetarian', 'gluten-free'],
        10, 0, 2,
        (SELECT id FROM bytesized_users WHERE email = 'premium@test.com')
    ),
    (
        'Peanut Butter Banana Smoothie',
        'Quick post-workout snack.',
        NULL,
        ARRAY['banana', 'peanut butter', 'milk', 'honey', 'ice'],
        'Blend all ingredients until smooth. Serve immediately.',
        'snack',
        ARRAY['vegetarian', 'gluten-free'],
        3, 0, 1,
        (SELECT id FROM bytesized_users WHERE email = 'free@test.com')
    ),
    (
        'Garlic Butter Pasta',
        'Minimal ingredients, maximum flavor.',
        NULL,
        ARRAY['pasta', 'garlic', 'butter', 'olive oil', 'parmesan', 'parsley', 'salt', 'pepper'],
        'Boil pasta until al dente. Melt butter with olive oil, cook garlic until fragrant. Toss pasta with garlic butter and parmesan. Top with parsley.',
        'dinner',
        ARRAY['vegetarian'],
        5, 15, 4,
        (SELECT id FROM bytesized_users WHERE email = 'premium@test.com')
    ),
    (
        'Veggie Black Bean Tacos',
        'Hearty plant-based tacos.',
        NULL,
        ARRAY['tortilla', 'black beans', 'corn', 'avocado', 'lime', 'cilantro', 'onion', 'salt'],
        'Warm tortillas. Heat black beans with salt. Fill tortillas with beans, corn, avocado, and onion. Top with cilantro and a squeeze of lime.',
        'lunch',
        ARRAY['vegan', 'vegetarian', 'dairy-free'],
        10, 10, 3,
        (SELECT id FROM bytesized_users WHERE email = 'free@test.com')
    );
 
 
-- Sample favorites
INSERT INTO bytesized_favorites (user_id, recipe_id) VALUES
    (
        (SELECT id FROM bytesized_users WHERE email = 'free@test.com'),
        (SELECT id FROM bytesized_recipes WHERE title = 'Classic Scrambled Eggs')
    ),
    (
        (SELECT id FROM bytesized_users WHERE email = 'free@test.com'),
        (SELECT id FROM bytesized_recipes WHERE title = 'Peanut Butter Banana Smoothie')
    ),
    (
        (SELECT id FROM bytesized_users WHERE email = 'premium@test.com'),
        (SELECT id FROM bytesized_recipes WHERE title = 'Chicken Fried Rice')
    ),
    (
        (SELECT id FROM bytesized_users WHERE email = 'premium@test.com'),
        (SELECT id FROM bytesized_recipes WHERE title = 'Garlic Butter Pasta')
    ),
    (
        (SELECT id FROM bytesized_users WHERE email = 'premium@test.com'),
        (SELECT id FROM bytesized_recipes WHERE title = 'Caprese Salad')
    );
 
 
-- Sample cookbooks
INSERT INTO bytesized_cookbooks (user_id, name, description) VALUES
    (
        (SELECT id FROM bytesized_users WHERE email = 'premium@test.com'),
        'Weeknight Dinners',
        'Quick dinners for busy nights.'
    ),
    (
        (SELECT id FROM bytesized_users WHERE email = 'admin@test.com'),
        'Breakfast Favorites',
        'Tried-and-true morning recipes.'
    );
 
 
-- Recipies in cookbooks
INSERT INTO bytesized_cookbook_recipes (cookbook_id, recipe_id) VALUES
    (
        (SELECT id FROM bytesized_cookbooks WHERE name = 'Weeknight Dinners'),
        (SELECT id FROM bytesized_recipes WHERE title = 'Chicken Fried Rice')
    ),
    (
        (SELECT id FROM bytesized_cookbooks WHERE name = 'Weeknight Dinners'),
        (SELECT id FROM bytesized_recipes WHERE title = 'Garlic Butter Pasta')
    ),
    (
        (SELECT id FROM bytesized_cookbooks WHERE name = 'Breakfast Favorites'),
        (SELECT id FROM bytesized_recipes WHERE title = 'Classic Scrambled Eggs')
    ),
    (
        (SELECT id FROM bytesized_cookbooks WHERE name = 'Breakfast Favorites'),
        (SELECT id FROM bytesized_recipes WHERE title = 'Avocado Toast')
    );
 