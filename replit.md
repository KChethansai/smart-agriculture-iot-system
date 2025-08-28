# Smart Agricultural Farming Platform

## Overview

Smart Agricultural Farming is a comprehensive AI-powered agricultural technology platform that combines modern web technologies with intelligent farming solutions. The platform provides farmers with tools for crop health monitoring, irrigation planning, AI-powered assistance, and direct market access through blockchain technology. Built as a full-stack application, it features a React frontend with a Node.js/Express backend, utilizing PostgreSQL for data persistence and integrating various AI services for agricultural insights.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom agricultural theme (green/eco-friendly color palette)
- **State Management**: TanStack Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful endpoints with structured error handling
- **File Handling**: Multer for image upload processing (crop health analysis)
- **Session Management**: Express sessions with PostgreSQL storage

### Authentication System
- **Provider**: Replit Auth integration with OpenID Connect
- **Strategy**: Passport.js with session-based authentication
- **User Management**: Automatic user creation and profile management
- **Security**: Secure session cookies with CSRF protection

### Data Storage
- **Primary Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema evolution
- **Connection**: Connection pooling with WebSocket support for serverless environments

### Core Features Architecture
- **Crop Health Analysis**: Image upload and AI-powered plant disease detection
- **Irrigation Planning**: Smart water recommendation system based on soil and crop data
- **AI Chatbot**: Farming assistance with natural language processing
- **3D Field Layout**: Visual field planning and optimization tools
- **Plant Scanner**: Comprehensive plant identification and health assessment
- **Market Integration**: Blockchain-based direct selling platform with real-time pricing

### File Upload System
- **Storage**: Local filesystem with organized directory structure
- **Validation**: Image type and size restrictions (10MB limit)
- **Processing**: Automatic image optimization and metadata extraction

## External Dependencies

### Database Services
- **Neon PostgreSQL**: Serverless PostgreSQL database with WebSocket connections
- **Connection Pooling**: @neondatabase/serverless for optimized database access

### AI and Machine Learning
- **Computer Vision APIs**: For crop health analysis and plant identification
- **Natural Language Processing**: AI chatbot for farming assistance
- **Market Data APIs**: Real-time crop pricing and market information

### Authentication Provider
- **Replit Auth**: OpenID Connect integration for user authentication
- **Session Storage**: PostgreSQL-backed session management

### Development Tools
- **Replit Integration**: Development environment with cartographer plugin
- **Build Pipeline**: Vite with React plugin and TypeScript support
- **Runtime Error Handling**: Replit runtime error overlay for development

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Modern icon library for agricultural and technical icons
- **Class Variance Authority**: Type-safe component variant management

### Data Validation
- **Zod**: Runtime type validation and schema generation
- **Drizzle Zod**: Integration between database schema and validation

The architecture emphasizes modularity, type safety, and scalability while maintaining a focus on agricultural use cases and farmer-friendly interfaces.