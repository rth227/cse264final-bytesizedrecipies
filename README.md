# cse264final-bytesizedrecipies
byte-sized recipies!

# Project Overview
Byte-Sized Recipes is a full-stack web application designed to help home cooks  organize their culinary tradition. Users can search for recipes based on the ingredients they currently have, upload their own family secrets, organize recipes into personalized digital cookbooks, and favorite recipes in their profile.

# Team Members & Roles

Kristen (Frontend Lead): UI/UX Design, React/Next.js components, Framer Motion animations, and branding consistency.

Gwenn (Backend Lead): REST API design, external API integration (Spoonacular/Edamam), and logic for recipe fetching.

Riley (Database & Auth Lead): PostgreSQL schema design, NextAuth.js implementation, and user role management.

# Application Features and Requirements

1. User Accounts & Roles:
Standard User: Can search recipes, upload original content, and save favorites to up to 5 cookbooks.
Premium: Can create unlimited number of cookbooks. 
Authentication: Secured via NextAuth.js with role-based access control.

2. Database (PostgreSQL):
Utilizes a relational database to store user profiles, saved recipe IDs, custom cookbooks, and original recipe uploads.

3. Interactive UI & New Library:
New Library: Lucide-React for iconography and Framer Motion for a premium "app-like" feel.
Dynamic Elements:
Recipe Upload Stepper: A multi-step form for creating recipes with dynamic ingredient and instruction lists.
Cookbook Save Flow: An animated modal that allows users to organize recipes into collections with instant visual confirmation.

4. REST APIs:
External API: Integration with the Spoonacular API to find recipes by ingredients.
Internal API: Custom Next.js API routes to handle "favoriting" logic, user data, and original recipe submissions.

# Tech Stack
Framework: Next.js

Styling: Tailwind CSS

Components: Shadcn/UI

Animations: Framer Motion

Database: PostgreSQL

Icons: Lucide-React

Auth: NextAuth.js

# Installation and Setup
1. Clone the repo with 'git clone https://github.com/your-repo/cse264final-bytesizedrecipies.git' and then go into the folder with 'cd cse264final-bytesizedrecipies'
2. Install dependencies with 'npm install'
3. Set environment variables
4. Run the development server with 'npm run dev'

# Database
Github contains schema.sql (all of the tables) and seed.sql (sample data for tables). Set up .env.local and then connect to db on DBeaver. Run seed.sql to populate test data.

Tables are include users (id, name, password, email, role), recipies (title, ingredients, instructions, meal type, etc), favorites, cookbook, cookbook recipies. 

# Auth Setup
Make sure that .env.local is made and run 'npm install' and 'npm run dev'. If running locally, go to http://localhost:3000/signup to sign up on platform. 

You can make yourself an admin by running 'UPDATE bytesized_users SET role = 'admin' WHERE email = 'your-email@lehigh.edu';' in the DBeaver.

Important to note: passwords are hashed for security. Seed data in seed.sql has fake passwords - so they may not work. Session information is stored with cookies rather than in a new table. 