# 🎟️ Ticket Support App

A modern, secure, and scalable **Fullstack Ticket Support System**.

Built with:

- **Next.js** – React framework for hybrid rendering & API routes
- **TailwindCSS** – Utility-first CSS for rapid UI design
- **Prisma ORM** – Type-safe, elegant database access
- **PostgreSQL (Neon)** – Serverless, scalable SQL database
- **Sentry** – Real-time error monitoring
- **jose** – Secure JWT-based authentication
- **react-icons** – Icon library for consistent UI
- **sonner** – Sleek, toast-style notifications

---

## ⚠️ Security Notice

> 🛑 **Never commit sensitive data (like API keys, secrets, or credentials)** to your repository.

**How to keep your project secure:**

- Use `.env.example` to define required environment variables (with placeholders only)
- Store actual secrets securely (e.g., in Vercel’s dashboard)
- `.env` is already in `.gitignore` (do not commit it)
- Review your code for accidental hardcoded credentials before pushing

---

## ✨ Features

| Feature              | Description                                      |
|----------------------|--------------------------------------------------|
| ⚡ **Next.js**        | Hybrid frontend + backend with API routes        |
| 🎨 **TailwindCSS**    | Modern, responsive UI styling                    |
| 📦 **Prisma ORM**     | Elegant & type-safe database access              |
| 🐘 **PostgreSQL**     | Hosted serverless DB with Neon                   |
| 🔐 **JWT Auth**       | Secure login via `jose`                          |
| 🐛 **Sentry**         | Production-ready error tracking                  |
| 🔔 **Sonner**         | Toast notifications for smooth UX                |
| 🎯 **react-icons**    | Flexible icon usage across the app               |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ticket-support-app.git
cd ticket-support-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

- Copy `.env.example` to `.env`:

  ```bash
  cp .env.example .env
  ```

- Fill in your actual secrets locally (do **not** commit them).

### 4. Set up the database

- Push the Prisma schema to your database:

  ```bash
  npx prisma db push
  ```

- (Optional) Generate Prisma client:

  ```bash
  npx prisma generate
  ```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🛠️ Deployment

This project is ready for **Vercel** deployment.

1. **Connect your repo to Vercel**.
2. **Set environment variables** in the Vercel dashboard:
   - `DATABASE_URL`
   - `DATABASE_URL_UNPOOLED` (if needed)
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_SENTRY_DSN`
   - `SENTRY_AUTH_TOKEN`
3. **Deploy!**

---

## 🧩 Environment Variables

See `.env.example` for all required variables.

| Name                    | Description                        |
|-------------------------|------------------------------------|
| `DATABASE_URL`          | PostgreSQL connection string       |
| `DATABASE_URL_UNPOOLED` | (Optional) Unpooled DB connection  |
| `AUTH_SECRET`           | JWT secret for authentication      |
| `NEXT_PUBLIC_SENTRY_DSN`| Sentry DSN for error monitoring    |
| `SENTRY_AUTH_TOKEN`     | Sentry auth token                  |

---

## 🛡️ Security Best Practices

- **Never commit real secrets** to the repository.
- Use `.env.example` for placeholders only.
- Add `.env` to `.gitignore` (already included).
- Set secrets in the Vercel dashboard for production.
- Rotate credentials regularly and monitor for leaks.

---

## 🏗️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL (Neon)](https://neon.tech/)
- [Sentry](https://sentry.io/)
- [jose](https://github.com/panva/jose)
- [react-icons](https://react-icons.github.io/react-icons/)
- [sonner](https://sonner.emilkowal.ski/)

---

---

## 👤 Author

- [AleeyuDev](https://github.com/aleeyudev)
