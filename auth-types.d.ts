// need this file to extend the types for typescript
// kept running into errors without it - https://next-auth.js.org/getting-started/typescript

import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  // extend user type to include the role
  interface User {
    role?: string;
  }

  // extend session type to include role and id of the user
  interface Session {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession['user'];
  }
}

declare module '@auth/core/adapters' {
  // extend the adapter user type too
  interface AdapterUser {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  // extend json web token token to include role and id 
  interface JWT {
    id?: string;
    role?: string;
  }
}