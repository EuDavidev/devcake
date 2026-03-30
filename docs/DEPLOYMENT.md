# Deployment Guide

## Stack

- Frontend and API: Next.js on Vercel
- Database: MongoDB Atlas

## Prerequisites

- Vercel account
- MongoDB Atlas cluster
- Node.js 20.19.0 or newer

## Environment Variables

Configure these variables in Vercel project settings:

- MONGODB_URI
- ADMIN_SEED_EMAIL
- ADMIN_SEED_PASSWORD

## First Admin Setup

The login route expects an admin document in collection admins with:

- email (normalized lowercase)
- passwordHash (bcrypt hash)
- name

Example shell snippet to generate hash locally:

npm exec node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('SUA_SENHA_FORTE',10).then(console.log)"

## Deploy Steps

1. Push the main branch to GitHub.
2. Import repository on Vercel.
3. Set all environment variables.
4. Trigger production deployment.
5. Validate routes:
   - /
   - /admin/login
   - /admin/pedidos (after login)

## Production Smoke Checklist

- Public page loads and products render.
- POST /api/orders creates order successfully.
- Admin login works with valid credentials.
- GET /api/admin/orders returns 401 without session.
- After login, dashboard loads and status updates work.

## Security Notes

- Admin cookie is HttpOnly and secure in production.
- Login has in-memory rate limiting baseline.
- For horizontal scaling, replace in-memory rate limiting with shared store.
- Consider periodic cleanup of expired admin_sessions documents.
