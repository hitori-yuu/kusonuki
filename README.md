# Kusonuki

Kusonuki is a web application developed using TypeScript, aimed at helping students and users manage their schedules, assignments, and quizzes efficiently. The app fetches data based on user and student information, presenting it in a user-friendly interface.

## Features

-   **Student Schedules**: Displays a student's timetable, showing their classes and events.
-   **Assignment Management**: Lists all upcoming and completed assignments.
-   **Quizzes and Tests**: Provides a way to view and manage quizzes and tests.
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.

## Prerequisites

Before running the project, ensure you have the following software installed:

-   **Node.js**: Version 18 or above
-   **Yarn**: Version 1.x or 2.x
-   **Supabase**: Set up your own Supabase instance
-   **Prisma**: For database ORM

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/hitori-yuu/kusonuki.git
cd kusonuki
```

2. Install dependencies

```bash
yarn install
```

3. Configure environment variables

Create a .env file in the root directory and add the following variables. Replace <your_value> with the actual values from your Supabase and Prisma setup.

```bash
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
DATABASE_URL=<your_database_url>
```

4. Prisma setup

Ensure your database schema is properly set up by running the following commands:

```bash
npx prisma migrate dev
```

This command will create the necessary tables in your database.

5. Run the development server

```bash
yarn dev
```

Open http://localhost:3000 to view the app in the browser.

Deployment

The project can be deployed on platforms like Vercel. Follow these steps to deploy:

    1.	Push your project to a GitHub repository.
    2.	Create a new project on Vercel.
    3.	Link your GitHub repository.
    4.	Add the same environment variables from the .env file in Vercel’s settings.
    5.	Deploy!

Testing

To run unit tests, use:

```bash
yarn test
```

End-to-end (E2E) tests can be added with Cypress. To run E2E tests:

```bash
yarn e2e
```

Technology Stack

    •	Next.js: Frontend framework
    •	TypeScript: Type safety
    •	Prisma: Database ORM
    •	Supabase: Database and authentication
    •	Tailwind CSS: Styling
    •	Shadcn: UI components
    •	Jest: Unit testing
    •	Cypress: E2E testing

Project Structure

```bash
/kusonuki
│
├── /app                # Next.js pages and components
├── /prisma             # Prisma schema and migrations
├── /public             # Static assets
├── /styles             # Tailwind and other styles
├── /tests              # Test files (unit and E2E)
├── /lib                # Helper functions and utilities
├── prisma.schema       # Prisma ORM schema
├── next.config.js      # Next.js configuration
└── README.md           # Project documentation
```

Future Improvements

    •	Implement user role-based access control (RBAC) for admin and student roles.
    •	Add notifications for new assignments or schedule changes.
    •	Improve accessibility (ARIA roles and keyboard navigation).
    •	Optimize performance with server-side caching.

Contributing

    1.	Fork the repository.
    2.	Create a new branch (git checkout -b feature-branch).
    3.	Commit your changes (git commit -m 'Add some feature').
    4.	Push to the branch (git push origin feature-branch).
    5.	Open a pull request.

License

This project is licensed under the MIT License - see the LICENSE file for details.
