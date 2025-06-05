# Skip Size Selector - Waste App

A modern, responsive React application for selecting and comparing skip sizes. This project showcases best practices in frontend development with a focus on accessibility, internationalization, and user experience.

## 📸 Screenshots

- Theme Customization: Light & Dark Mode Support

<div align="left">
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749132806/waste-app-screenshot-1_oehl4r.png" width="300" alt="Screenshot 1" />
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749132806/waste-app-screenshot-2_zk9osu.png" width="300" alt="Screenshot 2" />
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749132806/waste-app-screenshot-4_trsszo.png" width="300" alt="Screenshot 4" />
</div>

<br/>

- Internationalization with Multi-Language Support

<div align="left">
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749134396/waste-app-screenshot-12_f2jyu2.png" width="300" alt="Screenshot 12" />
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749134396/waste-app-screenshot-11_aqsxh2.png" width="300" alt="Screenshot 11" />
</div>

<br/>

- Selected Skip Highlighting & Comparison Tools

<div align="left">
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749132806/waste-app-screenshot-3_r2pgus.png" width="300" alt="Screenshot 3" />
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749132806/waste-app-screenshot-5_nryhxs.png" width="300" alt="Screenshot 5" />
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749132806/waste-app-screenshot-6_uwjie6.png" width="300" alt="Screenshot 6" />
</div>

<br/>

- Advanced Filtering, Sorting & Pagination for Skips

<div align="left">
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749132807/waste-app-screenshot-9_zdxfw4.png" width="300" alt="Screenshot 9" />
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749132807/waste-app-screenshot-8_up9ssg.png" width="300" alt="Screenshot 8" />
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749133837/waste-app-screenshot-10_wfqlng.png" width="300" alt="Screenshot 10" />
</div>

<br />

- Integrated Customer Support: Call Me Back Feature
<div align="left">
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749132807/waste-app-screenshot-7_ygjfuf.png" width="300" alt="Screenshot 7" />
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749134496/waste-app-screenshot-13_mujinz.png" width="300" alt="Screenshot 13" />
</div>

<br />

- Mobile-Optimized & Fully Responsive UI
<div align="left">
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749134755/waste-app-screenshot-14_x1bkvz.png" height="400" alt="Screenshot 14" />
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749134756/waste-app-screenshot-15_yzh8e9.png" height="400" alt="Screenshot 15" />
  <img src="https://res.cloudinary.com/mustafakbaser/image/upload/v1749134757/waste-app-screenshot-16_nq6myh.png" height="400" alt="Screenshot 16" />
</div>

## 🎯 New Key Features

- **Smart Filtering & Sorting**
  - Dynamic search with instant results
  - Multi-criteria filtering (size, price, features)
  - Customizable sort options with visual feedback
  - Empty state handling with reset options

- **Efficient Pagination**
  - 6 items per page for optimal viewing
  - Smooth page transitions
  - Previous/Next navigation
  - Page number indicators with ellipsis
  - Automatic scroll to top on page change

- **Responsive Cart Experience**
  - Floating cart with expand/collapse animations
  - Persistent across page navigation
  - Visual feedback for selected items
  - Smooth transitions and micro-interactions

- **Advanced Comparison Tools**
  - Side-by-side skip comparison (up to 3 items)
  - Feature-based comparison matrix
  - Quick compare toggles on cards
  - Responsive comparison view

- **Accessibility First**
  - WCAG 2.1 compliant components
  - Keyboard navigation support
  - Screen reader optimized
  - Focus management
  - ARIA attributes throughout

- **Internationalization**
  - Support for 5 languages (EN, FR, DE, ES, TR)
  - RTL layout support
  - Locale-aware formatting
  - Easy translation management

- **Modern UI/UX**
  - Dark/Light theme support
  - Responsive design (mobile-first)
  - Loading states and transitions
  - Toast notifications
  - Modal dialogs

- **Customer Support Integration**
  - Floating callback button
  - Phone number validation
  - Accessible modal dialog
  - Success notifications
  - Multi-language support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/mustafakbaser/Waste-app.git

# Install dependencies
cd Waste-app
npm install

# Start development server
npm run dev
```

## 🛠 Technology Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **State Management:** Zustand
- **Internationalization:** i18next
- **UI Components:** Custom components with Radix UI primitives
- **Icons:** Lucide React, Heroicons

## 💡 Architecture Decisions

### Why Zustand over Redux?

Chose Zustand for its simplicity and minimal boilerplate while maintaining powerful features:
- Smaller bundle size
- Built-in TypeScript support
- Simple API with hooks
- Excellent DevTools integration

### Floating Cart vs Fixed Footer

Implemented a floating cart for several UX benefits:
- Always accessible without scrolling
- Doesn't obstruct content
- Smooth expand/collapse animations
- Better mobile experience

### Filter Architecture

Separated filtering logic for maintainability:
- Custom hooks for filter state
- Memoized filter functions
- Debounced search
- Optimized re-renders

## 📱 Responsive Design

The application follows a mobile-first approach with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Key responsive features:
- Adaptive grid layouts
- Collapsible filters on mobile
- Touch-friendly controls
- Responsive typography

## 🎨 Theme Support

Implemented using Tailwind's dark mode with CSS variables:
- System preference detection
- Manual toggle
- Persistent preference storage
- Smooth transitions

## 🌍 Adding New Languages

1. Add translation file in `public/locales/{lang}/translation.json`
2. Update language selector in `SettingsModal.tsx`
3. Add language code to i18next configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.