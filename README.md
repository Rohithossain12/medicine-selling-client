Here’s the updated README with the expanded Admin and Seller features:  

---

# **PharmaWorld**  

A cutting-edge multi-vendor e-commerce platform dedicated to making healthcare accessible and convenient. PharmaWorld offers a wide range of medicines, healthcare products, and wellness essentials from trusted vendors, all in one place. The platform prioritizes user experience through a seamless interface, secure payments, and reliable delivery services.  

## **Table of Contents**  
- [Technologies Used](#technologies-used)  
- [Features](#features)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Usage](#usage)  
- [Live Demo](#live-demo)  
- [Contributors](#contributors)  
- [License](#license)  

## **Technologies Used**  
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

## **Features**  

### **User Features:**  
- Register and log in to the platform  
- Update user profiles  
- Browse and search medicines by name or company  
- View payment history and download invoices  

### **Seller Features:**  
- Register as a seller and list healthcare products  
- Manage product listings (add, edit, delete products)  
- View payment and sales history  
- Request product advertisements to increase visibility  
- Download individual invoices for payments  

### **Admin Features:**  
- View all registered users and manage their roles  
- Promote a user to a seller or demote a seller back to a regular user  
- Approve seller product advertisements  
- Download detailed sales reports  
- Manage and monitor product listings from sellers  
- Ensure platform compliance by moderating user activities  

### **Additional Functionalities:**  
- Invoice generation  
- Category-based product viewing  
- Real-time payment updates  

## **Installation**  

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

## **Configuration**  

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

## **Usage**  
1. Access the user dashboard to browse and purchase products.  
2. Sellers can log in to manage products and view payment history.  
3. Admins can monitor sales and promote/demote users.  

## **Live Demo**  
Explore the live application here: [PharmaWorld](https://endearing-fenglisu-dad95b.netlify.app)  

**Admin Credentials:**  
- Email: pharmaworld@gmail.com  
- Password: Pharma@2025  

**Seller Credentials:**  
- Email: pharma2@gmail.com  
- Password: Pharma@2025  

## **Contributors**  
- [Rohithossain12](https://github.com/Rohithossain12)  

## **License**  
This project is licensed under [MIT License](./LICENSE).  

---

Does this version look good to you? 
