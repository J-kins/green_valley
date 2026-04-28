# Green Valley Clinic - Healthcare Management System

A modern, comprehensive web application for managing clinic operations, patient appointments, and medical records. Built with React 19, TypeScript, and Vite for optimal performance.

## Overview

Green Valley Clinic is a full-featured healthcare management system designed to streamline operations for both patients and staff. The application provides an intuitive interface for appointment booking, patient management, and health record organization.

### Key Features

**Public Website**
- Home page with clinic overview
- Services catalog
- Doctor directory
- Online appointment booking
- Contact information
- Health resources and educational content

**Patient Portal**
- View upcoming appointments
- Access medical history
- Book new appointments
- Manage personal health records
- Patient dashboard

**Staff Dashboard** (Admin/Doctor/Receptionist)
- Appointment management
- Patient management
- Staff management
- Reports and analytics
- Role-based access control (RBAC)

## Technology Stack

- **Frontend Framework**: React 19 with Hooks
- **Language**: TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v7
- **Data Visualization**: Recharts
- **State Management**: Context API + localStorage

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/J-kins/green_valley.git
cd green_valley/green-valley-clinic
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

The application will open automatically at `http://localhost:5173` (or another available port).

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Project Structure

```
green-valley-clinic/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page components
│   │   ├── public/          # Public pages (Login, Register, Home, etc.)
│   │   └── protected/       # Protected pages (Portal, Staff Dashboard)
│   ├── context/             # React Context (Auth, Theme)
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── types/               # TypeScript type definitions
│   ├── styles/              # Global styles
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies
```

## Authentication

The application uses a localStorage-based mock authentication system for development purposes.

### Test Credentials

**Patient Accounts:**
- Email: `jane.smith@email.com` | Password: `patient123`
- Email: `john.doe@email.com` | Password: `patient123`
- Email: `emily.davis@email.com` | Password: `patient123`

**Staff Accounts:**
- Admin: `admin@greenvalleyclinic.com` | Password: `admin123`
- Receptionist: `receptionist@greenvalleyclinic.com` | Password: `recep123`
- Doctor: `drsarahjohnson@greenvalleyclinic.com` | Password: `doctor123`

### Authentication Pages

- **Login**: `/login` - Modern split-layout authentication interface
- **Register**: `/register` - Patient registration form
- **Patient Portal**: `/portal` - Dashboard after patient login
- **Staff Dashboard**: `/staff` - Management interface for clinic staff

## UI/UX Enhancements

### Authentication Pages
The login and registration pages feature:
- Professional split-layout design with branding panel
- Emerald/teal gradient color scheme
- Real-time field validation with visual feedback
- Responsive design for all screen sizes
- Accessibility features (ARIA labels, keyboard navigation)
- Smooth transitions and hover effects
- Error messaging and password strength hints

## Development Notes

### Data Persistence
Currently, all data is stored in the browser's localStorage. This is suitable for development and testing but should be replaced with a proper backend database (e.g., PostgreSQL, MongoDB) for production.

### Styling
- The project uses Tailwind CSS 4 for utility-first styling
- Custom colors are defined in the Tailwind configuration
- Color scheme: Emerald (#10b981) and Teal (#14b8a6) for primary actions

### State Management
- User authentication state is managed via React Context
- localStorage is used for persistence
- Component-level state uses React hooks

## Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms
The built files in `dist/` can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Any traditional web server

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Future Enhancements

- Backend API integration (Node.js/Express or similar)
- Real database (PostgreSQL, MongoDB)
- Email notifications
- SMS appointment reminders
- Video consultation support
- Insurance integration
- Advanced analytics and reporting
- Mobile app (React Native)

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## Troubleshooting

### Dev Server Not Starting
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Port Already in Use
Vite will automatically use the next available port. Check the terminal output for the actual port number.

### Build Errors
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact & Support

For questions or support, please contact Green Valley Clinic through the contact page or visit our website.

---

**Last Updated**: April 2026
**Version**: 1.0.0
