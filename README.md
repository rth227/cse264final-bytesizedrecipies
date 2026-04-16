# cse264final-bytesizedrecipies
byte-sized recipies!

# Project Overview
Byte-Sized Recipes is a full-stack web application designed to help home cooks  organize their culinary tradition. Users can search for recipes based on the ingredients they currently have, upload their own family secrets, organize recipes into personalized digital cookbooks, and favorite recipes in their profile.

# Team Members & Roles

Kristen (Frontend Lead): UI/UX Design, React/Next.js components, Framer Motion animations, and branding consistency.

Gwenn (Backend Lead): REST API design, external API integration (Spoonacular/Edamam), and logic for recipe fetching.

Riley (Database & Auth Lead): PostgreSQL schema design, NextAuth.js implementation, and user role management.

# Application Features and Requirements

User Accounts & Roles:
Standard User: Can search recipes, upload original content, and save favorites.
Admin: Access to a custom Management Dashboard to moderate user-submitted content and manage ingredient tag normalization.
Authentication: Secured via NextAuth.js with role-based access control.

Database (PostgreSQL):
Utilizes a relational database to store user profiles, saved recipe IDs, custom cookbooks, and original recipe uploads.

Interactive UI & New Library:
New Library: Lucide-React for iconography and Framer Motion for a premium "app-like" feel.
Dynamic Elements:
Recipe Upload Stepper: A multi-step form for creating recipes with dynamic ingredient and instruction lists.
Cookbook Save Flow: An animated modal that allows users to organize recipes into collections with instant visual confirmation.

REST APIs:
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
clone the repo
git clone https://github.com/your-repo/cse264final-bytesizedrecipies.git
cd cse264final-bytesizedrecipies

install dependencies
npm install

environment variables

run the development server 
npm run dev