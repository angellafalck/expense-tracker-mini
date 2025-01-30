# Expense Tracker Project

## 🚀 Getting Started

### 1️⃣ **Install Dependencies**
Ensure you have **Node.js** installed, then run:
```sh
npm install
```

### 2️⃣ **Setup Environment Variables**
Create a `.env.local` file in the root directory and add your database credentials:
```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

### 3️⃣ **Run the Development Server**
Start the Next.js development server:
```sh
npm run dev
```
Then, open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure
```
my-app/
│── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── transactions/
│   │   │   │   └── route.ts  # GET & POST API routes for transactions
│   │   │   ├── categories/
│   │   │   │   └── route.ts  # API routes for categories
│   ├── components/
│   │   ├── modalTransaction.tsx  # Modal for adding transactions
│   │   ├── modalCategory.tsx  # Modal for adding categories
│   ├── lib/
│   │   ├── db.ts  # Database connection setup
│   ├── pages/
│   │   ├── index.tsx  # Main application page
│   │   ├── _app.tsx  # Root Next.js component
│   │   ├── _document.tsx  # Document customization
│   ├── styles/
│   │   ├── globals.css  # Global CSS styles
│── .next/  # Next.js build output
│── public/  # Static assets (e.g., images, icons)
│── tests/
│   ├── api/
│   │   ├── transactions.test.ts  # Unit tests for transactions API
│── jest.config.js  # Jest configuration
│── package.json  # Project dependencies & scripts
│── README.md  # Project documentation
```

---

## 🌍 Live Project URL
🚀 **Deployed Application:** [Insert Live URL Here]

