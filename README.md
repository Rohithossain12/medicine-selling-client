
---

# **PharmaWorld**  
![PharmaWorld Banner](https://i.ibb.co/JwbL3xYW/Capture-PNGytsfdts.png)  

**PharmaWorld** is a cutting-edge **multi-vendor e-commerce platform** dedicated to making healthcare **accessible and convenient**. We offer a wide range of medicines, healthcare products, and wellness essentials from **trusted vendors**, all in one place. Our **user-friendly interface** ensures a seamless shopping experience, while **secure payment options** and **reliable delivery services** prioritize your health and convenience.  

## **📖 Table of Contents**  
- [Technologies Used](#technologies-used)  
- [🚀 Core Features](#core-features)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Usage](#usage)  
- [Dependencies](#dependencies)  
- [Live Demo](#live-demo)  
- [Contributors](#contributors)  
- [License](#license)  

## **🛠 Technologies Used**  
PharmaWorld leverages the following technologies and tools:  
- **Frontend**: React, Tailwind CSS  
- **Backend & APIs**: Firebase, MongoDB, Axios  
- **State Management**: Context API  
- **Authentication & Security**: Firebase, JWT  
- **Payments Integration**: Stripe  
- **Other Libraries**:  
  - React Helmet (dynamic title handling)  
  - Swiper & react-responsive-carousel (carousel UI components)  
  - react-hot-toast (notifications)  
  - react-hook-form (form handling)  
  - jspdf and jspdf-autotable (PDF generation)  

---

## **🚀 Core Features**  

### **✅ User Features:**  
- 🔹 **Register and log in** to the platform  
- 🔹 **Update user profiles**  
- 🔹 **Browse and search medicines** by name or company  
- 🔹 **View order and payment history**  
- 🔹 **Download invoices for purchases**  

### **✅ Seller Features:**  
- 🏪 **Register as a seller** and list healthcare products  
- 📝 **Manage product listings** (Add, Edit, Delete products)  
- 📊 **View payment and sales history**  
- 📢 **Request product advertisements** to increase visibility  
- 📄 **Download invoices** for sales  

### **✅ Admin Features:**  
- 👤 **Manage all registered users** (Promote/Demote roles)  
- 🔎 **Monitor and approve seller products**  
- 📢 **Approve seller product advertisements**  
- 📊 **Download detailed sales reports**  
- 🛡 **Ensure platform compliance** by moderating user activities  

### **💡 Additional Functionalities:**  
- 📜 **Invoice generation for purchases and sales**  
- 🏷 **Category-based product browsing**  
- 💳 **Real-time payment updates with Stripe**  
- 🌙 **Dark and Light mode toggle**  

---

## **📌 Installation**  

To set up the project locally:  

1. **Clone the repository:**  
   ```bash
   git clone <your-repo-link>
   cd medicine-selling-client
   ```  

2. **Install dependencies:**  
   ```bash
   npm install
   ```  

3. **Run the development server:**  
   ```bash
   npm run dev
   ```  

---

## **⚙ Configuration**  

Set up environment variables by creating a `.env` file in the root directory and adding the following values:  
```env
VITE_apiKey=your-api-key
VITE_authDomain=your-auth-domain
VITE_projectId=your-project-id
VITE_storageBucket=your-storage-bucket
VITE_messagingSenderId=your-messaging-sender-id
VITE_appId=your-app-id
VITE_API_URL=http://localhost:9000
VITE_IMAGE_HOSTING_KEY=your-image-hosting-key
VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key
```  

---

## **📖 Usage**  
1️⃣ **Users:** Browse and purchase medicines easily.  
2️⃣ **Sellers:** Manage products and view sales.  
3️⃣ **Admins:** Oversee sales, approve listings, and manage users.  

---

## **📦 Dependencies**  

### **🔹 Main Dependencies:**  
- `@headlessui/react` `^2.2.0` → UI components with accessibility  
- `@stripe/react-stripe-js` `^3.1.1` → Stripe payment integration  
- `@tanstack/react-query` `^5.64.1` → Data fetching and caching  
- `axios` `^1.7.9` → HTTP client for API requests  
- `firebase` `^11.1.0` → Authentication and database  
- `html2pdf.js` `^0.10.2` → Convert HTML to PDF  
- `jspdf` `^2.5.2` → PDF generation  
- `jspdf-autotable` `^3.8.4` → Tables in PDF documents  
- `localforage` `^1.10.0` → Offline storage  
- `match-sorter` `^8.0.0` → Sorting and filtering  
- `react` `^18.3.1` → Core React library  
- `react-dom` `^18.3.1` → React DOM rendering  
- `react-helmet` `^6.1.0` → Dynamic title and metadata handling  
- `react-hook-form` `^7.54.2` → Form handling  
- `react-hot-toast` `^2.5.1` → Toast notifications  
- `react-icons` `^5.4.0` → Icon library  
- `react-lottie-player` `^2.1.0` → Lottie animations  
- `react-responsive-carousel` `^3.2.23` → Image sliders  
- `react-router-dom` `^7.1.1` → Navigation and routing  
- `sort-by` `^1.2.0` → Sorting helper  
- `swiper` `^11.2.1` → Sliders and carousels  

### **🔹 Development Dependencies:**  
- `@eslint/js` `^9.17.0` → ESLint configuration  
- `@types/react` `^18.3.18` → TypeScript support for React  
- `@types/react-dom` `^18.3.5` → TypeScript support for React DOM  
- `@vitejs/plugin-react` `^4.3.4` → React plugin for Vite  
- `autoprefixer` `^10.4.20` → CSS autoprefixing  
- `daisyui` `^4.12.23` → UI component library  
- `eslint` `^9.17.0` → Linting for JavaScript  
- `eslint-plugin-react` `^7.37.2` → ESLint rules for React  
- `eslint-plugin-react-hooks` `^5.0.0` → ESLint rules for hooks  
- `eslint-plugin-react-refresh` `^0.4.16` → ESLint support for React Fast Refresh  
- `globals` `^15.14.0` → Shared global variables  
- `postcss` `^8.4.49` → CSS transformations  
- `tailwindcss` `^3.4.17` → Utility-first CSS framework  
- `vite` `^6.0.5` → Frontend development build tool  

---

## **🌍 Live Demo**  

🔗 **Explore the live application here:** [PharmaWorld](https://endearing-fenglisu-dad95b.netlify.app)  

**🛠 Admin Credentials:**  
- ✉ **Email:** pharmaworld@gmail.com  
- 🔑 **Password:** Pharma@2025  

**🛒 Seller Credentials:**  
- ✉ **Email:** pharma2@gmail.com  
- 🔑 **Password:** Pharma@2025  

---

## **🤝 Contributors**  
- [Rohithossain12](https://github.com/Rohithossain12)  

---

## **📜 License**  
This project is licensed under the **[MIT License](./LICENSE)**.  

---

