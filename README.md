# Workshop Feedback and Certificate Distribution Web App

## Theme: How to Use AI Tools to Increase Your Productivity

This open-source web application was developed during a live solution-building exercise. It enables workshop organizers to gather feedback and distribute certificates seamlessly while providing attendees with a simple way to redeem their certificates.

---

## Features

### **Organizer Login**
- **Create a New Workshop**:
  - Title of the workshop
  - Unique code (auto-generated)
  - Upload certificates (stored in a Google Drive shared folder, named after the redeemer's email)
- **Manage Workshops**:
  - View a table of all workshops:
    - Title
    - Created date
    - Unique code
    - Certificates redeemed
  - View details of a workshop:
    - List of attendees who redeemed certificates
    - View uploaded certificates

### **Attendee Login**
- **Redeem Certificates**:
  - Enter the unique code of the workshop.
  - Fill out a feedback form:
    - Rate out of 5 (Required)
    - Describe your experience (Required)
  - Download the certificate.
- **Manage Redeemed Certificates**:
  - View a list of all redeemed certificates with:
    - Workshop title
    - Created date
    - Unique code
  - View the certificate.

---

## Technologies Used
- **Frontend**: Next.js
- **Backend**: Next.js API routes
- **Database**: MongoDB Atlas (Free Tier)
- **Deployment**: Vercel

---

## App Structure

### **Pages**
1. **Login Page**:
   - Email/password authentication
2. **Sign-Up Page**:
   - Email/password registration with the ability to select user type (organizer or attendee)
3. **Home Page**:
   - Organizer Home:
     - List of workshops table:
       - Title
       - Created date
       - Unique code
       - Certificates redeemed
     - Create new workshop:
       - Title of the workshop
       - Unique code (auto-generated)
       - Upload certificates
   - Attendee Home:
     - List of redeemed certificates:
       - Title of the workshop
       - Created date
       - Unique code
     - Redeem new certificate:
       - Enter unique code
       - Fill out feedback form:
         - Rate out of 5
         - Describe your experience

---

## Steps to Run the Application Locally

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/workshop-feedback-app.git
cd workshop-feedback-app
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env.local` file in the root directory and add the following:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<your-cluster-url>/workshop-feedback-app?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
```
Replace `<username>`, `<password>`, and `<your-cluster-url>` with your MongoDB Atlas credentials.

### **4. Run the Development Server**
```bash
npm run dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

### **5. Build and Start for Production**
To build and start the app in production mode:
```bash
npm run build
npm start
```

---

## Deployment

The app is deployed on Vercel. Follow these steps to deploy:

1. **Push Code to GitHub**:
   - Commit your changes and push them to your GitHub repository.
2. **Deploy to Vercel**:
   - Log in to [Vercel](https://vercel.com/).
   - Import your GitHub repository and deploy.
3. **Add Environment Variables**:
   - Go to the **Settings** tab in your Vercel project and add the `MONGO_URI` and `JWT_SECRET` environment variables.

---

## Contributions

This project is open-source and welcomes contributions. Feel free to fork the repository, create feature branches, and submit pull requests.

---
