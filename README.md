# 🫀 CardiAI - Patient Management System

CardiAI is a modern, high-performance web application designed for cardiology clinics to manage patient data and medical records efficiently and securely.

![CardiAI Banner](https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200&h=400)

## 🚀 Features

- **🔐 Secure Authentication**: Robust login and signup system with encrypted token storage.
- **📋 Patient Dashboard**: Comprehensive overview of all patients with real-time search and pagination.
- **📁 Record Management**: Detailed tracking of patient medical records and history.
- **🎨 Modern UI/UX**: Built with Shadcn UI and Framer Motion for smooth, accessible, and responsive interactions.
- **⚡ High Performance**: Powered by Vite and React Query for lightning-fast data fetching and state management.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [React Query](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **API Client**: [Axios](https://axios-http.com/)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/CardiAI-Frontend.git
   cd CardiAI-Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following (see `.env.example` for reference):
   ```env
   VITE_API_URL=https://cardiai-112e49359ba9.herokuapp.com/api
   VITE_TOKEN_SECRET=your_secure_random_secret
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## 📦 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run preview`: Previews the production build locally.

## 🛡️ Security

CardiAI takes data security seriously. All sensitive tokens stored in `localStorage` are encrypted using AES-256 via `crypto-js` to prevent unauthorized access.

---

Built with ❤️ for the healthcare community.
