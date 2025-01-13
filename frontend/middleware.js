import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('secret');


export async function middleware(request) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        // Verifica el token
        const {payload} = await jwtVerify(token, SECRET_KEY);
        console.log('Token válido:', payload);
        return NextResponse.next();
    } catch (err) {
        console.error('Invalid token:', err.message);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/'], // Protege solo la página index
};
