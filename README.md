# Food App Web

This is the web version of a Fast Food application that allows users to manage orders, products, and more. This project is part of a complete ecosystem that includes mobile and backend applications.

## Related Projects

- 📱 Mobile App: [Food App Mobile](https://github.com/jonathanleivag/foodapp)
- 🖥️ Backend: [Food App Backend](https://github.com/jonathanleivag/food-app-backend)

## Prerequisites

- Node.js
- npm or yarn
- Git

## Installation

1. Clone the repository

```bash
git clone https://github.com/jonathanleivag/food_app_web.git
cd food_app_web
cp .env.example .env

NEXT_PUBLIC_API_URL="your_api_url"
NEXT_PUBLIC_KEY_PUSHER="your_pusher_key"
NEXT_PUBLIC_CLUSTER_PUSHER="your_pusher_cluster"

# server
CLOUDINARY_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_key"
CLOUDINARY_API_SECRET="your_cloudinary_secret"

# open IA
OPENAI_API_KEY="your_openai_key"
OPEN_IA_MODEL="your_openai_model"

npm install

# Development mode
npm run dev

# Build the project
npm run build

# Production mode
npm start

# Run linting
npm run lint
```
