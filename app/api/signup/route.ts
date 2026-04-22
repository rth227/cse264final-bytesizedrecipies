// signing up on the platform 

import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  // make sure email and password were sent
  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  // hash the password so real one never stored
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert the new user into the database
  try {
    const result = await pool.query(`INSERT INTO bytesized_users (name, email, password, role)VALUES ($1, $2, $3, 'free') RETURNING id, name, email, role`, [name, email, hashedPassword]);
    return NextResponse.json({ user: result.rows[0] });
  } catch (error: any) {
    // print the real error to the terminal so we can see what went wrong
    console.error('Signup error:', error);

    return NextResponse.json(
      { error: 'Could not create user' },
      { status: 500 }
    );
  }
}