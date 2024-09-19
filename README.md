# Todo App Frontend

This is the frontend for a Todo List application built with Next.js and React DnD.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   NEXT_PUBLIC_API_URL=your_backend_api_url
   ```
4. Replace `your_backend_api_url` with the URL of your deployed backend.

## Running the Application

To start the development server:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

## Features

- Add new tasks
- Drag and drop tasks between To Do, In Progress, and Done columns
- Delete tasks from the Done column
- Responsive design

## Deployment

This frontend is deployed on Vercel. To deploy your own instance:

1. Push your code to a GitHub repository
2. Create a new project on Vercel
3. Connect your GitHub repository
4. Set the environment variables in the Vercel dashboard
5. Deploy the project