'use server'

import { cookies } from 'next/headers'

export async function setHomepagePreference() {
  cookies().set('homepage', 'true', { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 10 // 10 minutes
  });
}