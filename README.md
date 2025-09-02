# Mystery Message Application

A modern anonymous messaging platform built with Next.js that allows users to send and receive mystery messages with AI-powered content generation.

## Features

- 🔐 **Secure Authentication** - User registration and login with NextAuth.js
- 📧 **Email Verification** - Account verification via email using Resend
- 🤖 **AI-Powered Messages** - Generate random messages using OpenAI integration
- 🎭 **Anonymous Messaging** - Send and receive messages anonymously
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🛡️ **Data Validation** - Input validation with Zod schemas
- 🗄️ **Database Integration** - MongoDB with Mongoose ODM

## Tech Stack

### Core Framework

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development

### Authentication & Security

- **NextAuth.js** - Authentication solution
- **bcrypt/bcryptjs** - Password hashing and encryption
- **Zod** - Schema validation

### Database & Email

- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Resend** - Email delivery service
- **React Email** - Email template components

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library
- **clsx** - Conditional CSS classes

### AI Integration

- **OpenAI** - AI-powered message generation
- **AI SDK** - AI integration utilities

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── api/               # API endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── context/              # React context providers
│   └── AuthProvider.tsx  # Authentication context
├── helpers/              # Utility functions
│   └── sendVerificationEmail.ts
├── hooks/                # Custom React hooks
│   └── use-toast.ts      # Toast notifications
├── lib/                  # Third-party integrations
│   ├── dbConnect.ts      # Database connection
│   ├── resend.ts         # Email service setup
│   └── utils.ts          # Utility functions
├── model/                # Database models
│   └── User.ts           # User schema
├── schemas/              # Zod validation schemas
│   ├── acceptMessageSchema.ts
│   ├── messageSchema.ts
│   ├── signUpSchema.ts
│   ├── signInSchema.ts
│   └── verifySchema.ts
├── types/                # TypeScript type definitions
└── middleware.ts         # Next.js middleware
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mystery-message-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with your configuration:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   RESEND_API_KEY=your_resend_api_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Concepts & Definitions

### React Patterns

**React Context Providers**

- Components that provide shared state and functionality across the component tree
- Example: `AuthProvider.tsx` manages authentication state globally
- Eliminates prop drilling by making data accessible to any child component

**Custom React Hooks**

- Reusable functions that encapsulate stateful logic and side effects
- Example: `use-toast.ts` provides toast notification functionality
- Follow the "use" naming convention and can use other hooks internally

**Higher-Order Components (HOCs)**

- Functions that take a component and return a new component with enhanced functionality
- Used for cross-cutting concerns like authentication, logging, or data fetching

### Utility Functions

**Helper Functions**

- Pure functions that perform specific tasks without side effects
- Example: `sendVerificationEmail.ts` handles email sending logic
- Located in `/src/helpers/` for business logic utilities

**Utility Functions**

- General-purpose functions for common operations
- Example: `utils.ts` contains class name merging, formatting, and validation helpers
- Located in `/src/lib/` for framework-agnostic utilities

### Architecture Patterns

**Schema Validation**

- Using Zod schemas to validate and type-check data at runtime
- Ensures data integrity between client and server
- Example: `signUpSchema.ts` validates user registration data

**Database Models**

- Mongoose schemas that define the structure and validation rules for MongoDB documents
- Example: `User.ts` defines user data structure and methods
- Provides type safety and data consistency

**API Route Handlers**

- Next.js API routes that handle HTTP requests
- Located in `/src/app/api/` following the App Router convention
- Handle server-side logic, database operations, and external API calls

**Middleware**

- Functions that run before requests are completed
- Example: `middleware.ts` handles authentication checks and route protection
- Can modify requests, responses, or redirect users

### Development Concepts

**TypeScript Types**

- Custom type definitions for better development experience
- Provides compile-time type checking and IntelliSense
- Located in `/src/types/` for reusable type definitions

**Environment Configuration**

- Secure storage of API keys, database URLs, and other sensitive data
- Uses `.env.local` files that are excluded from version control
- Accessed via `process.env` in the application

**Component Libraries**

- Pre-built, accessible UI components from Radix UI
- Styled with Tailwind CSS for consistent design
- Located in `/src/components/ui/` for reusable interface elements
