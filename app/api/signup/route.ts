// signing up on the platform 

import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // get name email password from users 
  const { name, email, password } = body;

  // make sure email and password were sent
  if (!email || !password) {
    // if not given, return error 
    return NextResponse.json(
      { error: 'email and password are required' },
      { status: 400 }
    );
  }

  // hash password for protection
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert the new user into the database
  try {
    // insert database into user 
    const result = await pool.query(`INSERT INTO bytesized_users (name, email, password, role) VALUES ($1, $2, $3, 'free') RETURNING id, name, email, role`, [name, email, hashedPassword]);
    return NextResponse.json({ user: result.rows[0] });
  } catch (error: any) {
    // return error if account cannot be made or already taken
    return NextResponse.json(
      { error: 'cannot make account - retry again with another email if already used' },
      { status: 400 }
    );
  }
}