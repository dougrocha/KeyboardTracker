# Keyboard Tracker

This project is store/tracker for your favorite keyboards. Meka serves as a central place to find, track, discuss, and sell your favorite keyboards.
Meka gives you the ability to track your favorite keyboards and learn more about them.

## Features

- Track your favorite keyboards
- Learn more about your favorite keyboards

- Sell keyboards
- Manage all your keyboards with an interactive dashboard
- Gain user interest with interest checks

## Live Demo

Since this site has a lot of features, it is not live. I am working on a demo version of the site that will be live soon.

## Screenshots

Here are some screenshots of the site:

### Home Page

This is the home page of the site.

![image](/images/home_page.png)

### Main Keyboard (Product) Page

In this page, you can search all the products, and see some basic details of the keyboards.

![image](/images/keyboard_page.png)

### User Profile Page

Here you can see all the keyboards you favorited, the designs you created, and the keyboard vendor you have access to.

![image](/images/user_profile_page.png)

### User Dashboard Page

In this page, you can see all the vendors you are a part of, along with some quick action buttons.

![image](/images/user_dashboard_page.png)

### Dashboard Table

This is the table that shows all the keyboards currently in your inventory. You are able to edit the information, delete the keyboard, or view the keyboard.

![image](/images/dashboard_table.png)

## Tech Stack

- TypeScript
- Turborepo
- Next.js/React
- NestJS
- PostgreSQL
- Prisma
- Tailwind

## Getting Started

1. Clone the repository

```bash
git clone
```

2\. Install dependencies

This step will also require setting up a PostgreSQL database and a Redis instance, and setting up the .env file following the .env.example file.

```bash
pnpm install
```

After setting up the .env file, you can run the following command to create the database and run the migrations:

```bash
cd packages/database
pnpm prisma seed
pnpm prisma db:generate
pnpm build
```

Do not forget to run these commands:

```bash
cd apps/api
pnpm generate
```

3\. Start the development server

```bash
pnpm dev
```

or start the production server

```bash
pnpm build && pnpm start
```

4\. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
