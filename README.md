# React Component Development Assignment

A modern React component library built with TypeScript, TailwindCSS, and Storybook, featuring two highly customizable and accessible components: InputField and DataTable.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone or download the project
# Navigate to project directory
cd react-components-assignment

# Install dependencies
npm install

# Start Storybook development server
npm run storybook
```

The Storybook interface will open at `http://localhost:6006` where you can explore and interact with all component variants.

## 📦 Components

### InputField
A flexible and accessible input component with comprehensive features:

**Features:**
- ✅ Multiple variants (filled, outlined, ghost)
- ✅ Different sizes (small, medium, large)
- ✅ Interactive states (disabled, invalid, loading)
- ✅ Enhanced functionality (clear button, password toggle)
- ✅ Full accessibility support
- ✅ Dark/light theme compatibility
- ✅ TypeScript integration

**Usage:**
```tsx
import InputField from './components/InputField';

<InputField
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  variant="outlined"
  size="md"
  clearable
  helperText="We'll never share your email"
/>
```

### DataTable
A powerful data table component with sorting and selection capabilities:

**Features:**
- ✅ Column sorting (ascending/descending)
- ✅ Row selection (single/multiple)
- ✅ Loading and empty states
- ✅ Custom column rendering
- ✅ Responsive design
- ✅ Full TypeScript generics support
- ✅ Accessibility compliant

**Usage:**
```tsx
import DataTable from './components/DataTable';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { 
    key: 'status', 
    header: 'Status',
    render: (value) => <StatusBadge status={value} />
  }
];

<DataTable
  data={users}
  columns={columns}
  selectable
  onRowSelect={(rows) => console.log('Selected:', rows)}
/>
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── InputField/
│   │   ├── InputField.tsx          # Main component
│   │   ├── InputField.stories.tsx  # Storybook documentation
│   │   └── index.ts               # Export file
│   └── DataTable/
│       ├── DataTable.tsx          # Main component
│       ├── DataTable.stories.tsx  # Storybook documentation
│       └── index.ts               # Export file
├── types/
│   └── index.ts                   # TypeScript interfaces
└── index.css                     # Global styles & Tailwind
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (focus states, selections)
- **Success**: Green (valid states, positive actions)
- **Error**: Red (error states, validation)
- **Neutral**: Gray scale (text, borders, backgrounds)

### Sizing Scale
- **Small**: Compact for dense layouts
- **Medium**: Default balanced size
- **Large**: Prominent for important actions

### Interactive States
- **Default**: Base appearance
- **Hover**: Subtle feedback on interaction
- **Focus**: Clear focus indicators for accessibility
- **Disabled**: Visual indication of non-interactive state
- **Loading**: Progress feedback with animations

## 🌟 Key Features Implemented

### Animations & Interactions
- Smooth transitions on state changes
- Loading spinners with custom animations
- Hover effects with subtle color changes
- Focus management for keyboard navigation

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- Color contrast compliance
- Focus management

### Responsive Design
- Mobile-first approach
- Horizontal scroll for tables on small screens
- Flexible sizing system
- Touch-friendly interaction areas

### Dark Mode Support
- Complete dark theme implementation
- Automatic color scheme detection
- Consistent theming across components

## 🔧 Development Approach

### Component Architecture
- **Composition over inheritance**: Small, reusable pieces
- **Props-driven design**: Flexible configuration through props
- **TypeScript-first**: Full type safety and intellisense
- **Accessibility by default**: WCAG 2.1 AA compliance

### State Management
- Local state for component-specific logic
- Props for external data and event handling
- Controlled/uncontrolled component patterns

### Styling Strategy
- **Utility-first CSS**: TailwindCSS for rapid development
- **Design tokens**: Consistent spacing, colors, typography
- **Responsive design**: Mobile-first breakpoints
- **Dark mode**: CSS custom properties and class-based theming

### Testing Strategy (Storybook)
- **Component isolation**: Test each component in isolation
- **Visual regression**: Catch UI changes early
- **Interaction testing**: Verify user interactions
- **Documentation**: Living documentation with examples

## 📚 Storybook Documentation

Each component includes comprehensive Storybook documentation with:

- 📖 **Component overview** with feature descriptions
- 🔧 **Props API** with TypeScript definitions
- 🎯 **Use cases** and real-world examples
- 🏗️ **Anatomy** breakdown of component structure
- 🎨 **Variants** and state demonstrations
- ⚡ **Interactions** and behavior examples
- ♿ **Accessibility** notes and best practices
- 🎭 **Theming** and responsive behavior
- ✅ **Best practices** with do's and don'ts

## 🚀 Advanced Features

### InputField Advanced Features
- **Password visibility toggle** with secure state management
- **Clear button** with customizable behavior
- **Loading states** with animated feedback
- **Validation states** with error messaging
- **Multi-theme support** (light/dark modes)

### DataTable Advanced Features
- **Generic TypeScript support** for any data structure
- **Custom column rendering** with React components
- **Sorting algorithms** optimized for performance
- **Selection management** with batch operations
- **Empty and loading states** with custom messages

## 🎯 Performance Considerations

- **Memoization**: Expensive calculations cached with useMemo
- **Event handling**: Optimized event listeners
- **Bundle size**: Tree-shakeable exports
- **Re-rendering**: Minimized unnecessary re-renders

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔄 Future Enhancements

### InputField
- Multi-line text area variant
- Input masking for formatted inputs
- Auto-complete functionality
- Custom validation rules

### DataTable
- Virtual scrolling for large datasets
- Column resizing and reordering
- Export functionality (CSV, PDF)
- Advanced filtering options
- Pagination support

## 🤝 Contributing

This is an internship assignment project. The code demonstrates:
- Modern React patterns and best practices
- TypeScript integration and type safety
- Component composition and reusability
- Accessibility and inclusive design
- Performance optimization techniques
- Comprehensive documentation practices

---

**Built with ❤️ using React, TypeScript, TailwindCSS, and Storybook**