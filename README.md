# FlipWise 2.0

## Overview

FlipWise 2.0 is a web application built with Next.js that is an intuitive platform designed for effective learning and memorisation through the use of digital flashcards. It allows users to create, manage, and study flashcards efficiently, fostering better retention of information through interactive and engaging methods.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Prerequisites

- Node.js installed on your system
- npm package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/Silver-SEO/capstone-flip-wise-app.git
```

2. Install dependencies

```bash
npm i
```

3. Register at cloudinary and create a .env.local file

```
CLOUDINARY_CLOUD_NAME=YOUR_CLOUD
CLOUDINARY_API_KEY=YOUR_APIKEY
CLOUDINARY_SECRET=YOUR_SECRET
```

4. Register at mongodb and insert into .env.local file

```
MONGODB_URI=mongodb+srv://{username}:{password}@{clustername}.tibib.mongodb.net/{foldername}?retryWrites=true&w=majority

```

5. Register a "New OAuth App" at github and insert into .env.local file

```
CLIENT_ID=YOUR_CLIENT_ID
CLIENT_SECRET=YOUR_SECRET
```

6. Register a "New OAuth App" at github and insert into .env.local file

```
NEXTAUTH_URL=this should be the URL of your application or localhost
NEXTAUTH_SECRET=a random string
```

7. run dev server

```bash
npm run dev
```

## Learn More about next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
  You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Environment Variables

1. Add the key (MONGODB_URI) and the value (mongodb+srv...)
2. Add the key (NEXTAUTH_SECRET) and the value (...)
3. Add the key (CLOUDINARY_API_KEY) and the value (...)
4. Add the key (OPENAI_API_KEY) and the value (...)
5. Add the key (GITHUB_ID) and the value (...)
6. Add the key (GITHUB_SECRET) and the value (...)
