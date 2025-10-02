# Deathkiller Backend API

A clean, modern backend API built with Node.js, TypeScript, and Express.

## Features

- **TypeScript** - Type-safe development
- **Express.js** - Fast, unopinionated web framework
- **PostgreSQL** - Robust relational database
- **JWT Authentication** - Secure token-based auth
- **Input Validation** - Request validation with express-validator
- **Error Handling** - Centralized error management
- **Security** - Helmet, CORS, rate limiting
- **Clean Architecture** - Organized folder structure

## Project Structure

```
backend/
├── src/
│   ├── config/          # Database and app configuration
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Custom middleware
│   ├── routes/          # API routes
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   └── server.ts        # Application entry point
├── database/            # Database schema and migrations
├── dist/                # Compiled JavaScript (auto-generated)
└── package.json
```

## Setup

1. **Install dependencies**
   ```bash
   yarn install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb deathkiller_db
   
   # Run schema
   psql deathkiller_db < database/schema.sql
   ```

4. **Start development server**
   ```bash
   yarn dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Health Check
- `GET /api/health` - API health status

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `deathkiller_db` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `password` |
| `JWT_SECRET` | JWT secret key | Required |
| `CORS_ORIGIN` | Allowed origins | `http://localhost:3000` |

## Scripts

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues

## Default Admin User

Email: `admin@deathkiller.com`  
Password: `admin123`

## Development

The API follows RESTful conventions and includes:

- Input validation
- Error handling
- Type safety
- Security middleware
- Clean code architecture

Perfect for both React Native and React web applications!
