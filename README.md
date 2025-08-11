# 💰 FinTrack - Personal Finance Management

> Modern web application untuk mengelola keuangan pribadi dengan interface yang clean dan user-friendly

**🌐 Live Demo:** [fin-track-sepia-six.vercel.app](https://fin-track-sepia-six.vercel.app/)  
**📂 Repository:** [GitHub - FinTrack](https://github.com/1412240028/FinTrack)

---

## 🎯 **About Project**

FinTrack adalah aplikasi web modern yang dirancang untuk membantu pengguna mengelola keuangan pribadi secara digital. Aplikasi ini menyediakan dashboard yang intuitif untuk melacak pemasukan, pengeluaran, dan saldo dengan real-time synchronization.

Dibangun dengan fokus pada **user experience** yang minimalist dan **modern design principles**, FinTrack cocok untuk mahasiswa, fresh graduate, atau siapa saja yang ingin memulai journey financial literacy mereka.

---

## ✨ **Key Features**

### 🔐 **Secure Authentication System**
- User registration dan login dengan Firebase Authentication
- Secure session management
- Protected routes untuk user privacy

### 📊 **Interactive Dashboard**
- Real-time summary cards (Total Balance, Income, Expenses)
- Visual financial overview
- Quick transaction insights

### 💳 **Transaction Management**
- Add new income/expense transactions
- Edit existing transaction data
- Delete unwanted records
- Comprehensive transaction history

### 📱 **Modern User Interface**
- Clean, minimalist design with glassmorphism effects
- Fully responsive (Desktop, Tablet, Mobile)
- Smooth animations and micro-interactions
- Intuitive navigation system

### ⚡ **Real-time Data Sync**
- Instant updates using Firebase Firestore
- Cross-device synchronization
- Offline-first approach

---

## 🛠 **Tech Stack**

| **Category** | **Technology** | **Purpose** |
|--------------|----------------|-------------|
| **Frontend** | React.js | UI Component Framework |
| **Styling** | Custom CSS | Modern styling with variables |
| **Backend** | Firebase | Authentication & Database |
| **Database** | Firestore | NoSQL real-time database |
| **Hosting** | Vercel | Frontend deployment platform |
| **Icons** | Lucide React | Consistent icon library |

---

## 🏗 **Architecture Overview**

```
📁 FinTrack/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── Auth/           # Login, Register components
│   │   ├── Dashboard/      # Dashboard, Summary cards
│   │   ├── Transactions/   # Transaction table & forms
│   │   └── Layout/         # Navigation, Layout components
│   ├── 📁 context/
│   │   └── AuthContext.js  # Authentication state management
│   ├── 📁 hooks/
│   │   └── useTransactions.js # Custom hooks for data
│   ├── 📁 styles/
│   │   ├── globals.css     # CSS variables & reset
│   │   └── components/     # Component-specific styles
│   ├── 📁 utils/
│   │   └── firebase.js     # Firebase configuration
│   └── App.js              # Main application component
└── 📁 public/              # Static assets
```

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v14.0.0 or higher)
- npm atau yarn package manager
- Firebase project dengan Authentication & Firestore

### **Installation Steps**

1. **Clone Repository**
   ```bash
   git clone https://github.com/1412240028/FinTrack.git
   cd FinTrack
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Firebase Configuration**
   
   Buat file `.env.local` di root directory:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Start Development Server**
   ```bash
   npm start
   # atau
   yarn start
   ```

5. **Open Application**
   
   Browser akan otomatis membuka [http://localhost:3000](http://localhost:3000)

---

## 🔧 **Firebase Setup Guide**

### **1. Create Firebase Project**
- Kunjungi [Firebase Console](https://console.firebase.google.com)
- Create new project atau pilih existing project
- Enable Google Analytics (optional)

### **2. Setup Authentication**
- Navigation: Authentication → Sign-in method
- Enable **Email/Password** provider
- Configure authorized domains jika diperlukan

### **3. Setup Firestore Database**
- Navigation: Firestore Database → Create database
- Start in **production mode**
- Choose database location (pilih yang terdekat)

### **4. Security Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own transaction data
    match /users/{userId}/transactions/{document=**} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == userId;
    }
    
    // Users can access their own profile data
    match /users/{userId} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == userId;
    }
  }
}
```

---

## 📱 **User Guide**

### **First Time Setup**
1. **Register Account** - Buat akun baru dengan email dan password
2. **Login** - Masuk ke aplikasi dengan kredensial yang telah dibuat
3. **Dashboard Overview** - Familiarisasi dengan layout dashboard

### **Managing Transactions**
1. **Add Transaction**
   - Klik tombol "Add Transaction" di dashboard
   - Pilih type (Income/Expense)
   - Input amount, description, dan category
   - Save transaction

2. **View Transaction History**
   - Semua transaksi ditampilkan di tabel history
   - Data ter-sort berdasarkan tanggal terbaru

3. **Edit/Delete Transaction**
   - Klik icon edit atau delete di tabel
   - Confirm action untuk menghindari accidental deletion

### **Dashboard Insights**
- **Total Balance**: Selisih antara total income dan expenses
- **Total Income**: Jumlah keseluruhan pemasukan
- **Total Expenses**: Jumlah keseluruhan pengeluaran

---

## 🎨 **Design System**

### **Color Palette**
```css
:root {
  --primary-color: #6366F1;      /* Modern Indigo */
  --accent-color: #EC4899;       /* Vibrant Pink */
  --success-color: #10B981;      /* Income Green */
  --warning-color: #F59E0B;      /* Expense Amber */
  --background: #FAFAFA;         /* Light Background */
  --surface: #FFFFFF;            /* Card Background */
  --text-primary: #1F2937;       /* Main Text */
  --text-secondary: #6B7280;     /* Secondary Text */
}
```

### **Typography**
- **Primary Font**: Inter (Clean, modern sans-serif)
- **Display Font**: Plus Jakarta Sans (Headings dengan personality)
- **Font Sizes**: Consistent scale dari 12px sampai 48px

### **Layout Principles**
- **Mobile-first** responsive design
- **8px grid system** untuk consistent spacing
- **Card-based** layout dengan subtle shadows
- **Glassmorphism** effects untuk modern appeal

---

## 🔮 **Future Roadmap**

### **Phase 2 - Enhanced Analytics**
- 📊 Interactive charts dan graphs
- 📈 Monthly/yearly spending trends  
- 📋 Category-based expense breakdown

### **Phase 3 - Advanced Features**
- 🎯 Budget goals dan notifications
- 🏷 Custom transaction categories
- 📤 Export data (CSV, PDF)
- 🔔 Spending alerts system

### **Phase 4 - User Experience**
- 🌙 Dark/Light theme toggle
- 📱 Progressive Web App (PWA) support
- 🔄 Bulk transaction import
- 👥 Family/shared budget features

---

## 🤝 **Contributing**

Contributions are welcome! Jika ingin berkontribusi:

1. Fork repository ini
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 **License**

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 👨‍💻 **Developer**

**Project Author:** [Your Name]  
**Study Program:** Teknik Informatika  
**Academic Level:** Semester 2  

**Connect with me:**
- 📧 Email: [your.email@example.com]
- 💼 LinkedIn: [your-linkedin-profile]
- 🐙 GitHub: [your-github-username]

---

## 🙏 **Acknowledgments**

- [Firebase](https://firebase.google.com/) untuk backend infrastructure
- [React](https://reactjs.org/) untuk frontend framework
- [Lucide React](https://lucide.dev/) untuk icon library
- [Vercel](https://vercel.com/) untuk hosting platform
- Inspiration dari modern fintech applications

---

## 📊 **Project Stats**

![GitHub stars](https://img.shields.io/github/stars/1412240028/FinTrack?style=social)
![GitHub forks](https://img.shields.io/github/forks/1412240028/FinTrack?style=social)
![GitHub issues](https://img.shields.io/github/issues/1412240028/FinTrack)
![GitHub license](https://img.shields.io/github/license/1412240028/FinTrack)

---

⭐ **Jika project ini bermanfaat, jangan lupa berikan star di repository!**

**Made with ❤️ for learning and portfolio development**
