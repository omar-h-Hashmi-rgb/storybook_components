import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import InputField from './InputField';
import React from 'react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# InputField Component

A flexible and accessible input component with multiple variants, states, and features.

## Features
- **Multiple variants**: filled, outlined, ghost
- **Different sizes**: small, medium, large  
- **Interactive states**: disabled, invalid, loading
- **Enhanced functionality**: clear button, password toggle
- **Full accessibility**: ARIA support, keyboard navigation
- **Theme support**: Light and dark mode compatible
- **TypeScript**: Full type safety

## Anatomy
The InputField consists of:
1. **Label** (optional) - Describes the input purpose
2. **Input field** - The main interactive element
3. **Icons** (optional) - Clear button, password toggle, loading spinner
4. **Helper text** (optional) - Additional guidance or error messages

## Accessibility
- Uses semantic HTML with proper labeling
- Supports ARIA attributes for screen readers
- Keyboard navigable with focus management
- Error states are announced to assistive technologies
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual style variant'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
      description: 'HTML input type'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input'
    },
    invalid: {
      control: 'boolean',
      description: 'Shows error state'
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner'
    },
    clearable: {
      control: 'boolean',
      description: 'Shows clear button when input has value'
    }
  },
  args: {
    onChange: action('onChange'),
    onClear: action('onClear')
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: 'We\'ll never share your email'
  }
};

export const WithValue: Story = {
  args: {
    label: 'Username',
    value: 'john_doe',
    placeholder: 'Enter username',
    clearable: true
  }
};

// Variants
export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    helperText: 'First and last name'
  }
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Company',
    placeholder: 'Enter company name'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Search',
    placeholder: 'Type to search...'
  }
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small size'
  }
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Medium Input',
    placeholder: 'Medium size'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large size'
  }
};

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
    helperText: 'This field is disabled'
  }
};

export const Invalid: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    invalid: true,
    errorMessage: 'Please enter a valid email address'
  }
};

export const Loading: Story = {
  args: {
    label: 'Loading Input',
    value: 'Validating...',
    loading: true,
    helperText: 'Checking availability'
  }
};

// Password Field
export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters'
  }
};

export const PasswordWithValue: Story = {
  args: {
    type: 'password',
    label: 'Password',
    value: 'secretpassword',
    clearable: true
  }
};

// Special Features
export const WithClearButton: Story = {
  args: {
    label: 'Search Query',
    value: 'React components',
    clearable: true,
    placeholder: 'What are you looking for?'
  }
};

export const LoadingWithClear: Story = {
  args: {
    label: 'Search',
    value: 'searching...',
    loading: true,
    clearable: true,
    helperText: 'Finding results'
  }
};

// Real-world Examples
export const LoginForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Email"
        type="email"
        placeholder="john@example.com"
        variant="outlined"
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        variant="outlined"
        clearable
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A typical login form using InputField components'
      }
    }
  }
};

export const SearchWithStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Search Products"
        placeholder="Search..."
        variant="ghost"
        clearable
        size="lg"
      />
      <InputField
        label="Search (Loading)"
        value="searching..."
        variant="ghost"
        loading
        clearable
        size="lg"
      />
      <InputField
        label="Search (Error)"
        value="invalid query"
        variant="ghost"
        invalid
        errorMessage="Search query too short"
        size="lg"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different states of a search input'
      }
    }
  }
};

// Dark Mode Example
export const DarkMode: Story = {
  args: {
    label: 'Dark Mode Input',
    placeholder: 'Type something...',
    helperText: 'This looks great in dark mode',
    clearable: true
  },
  parameters: {
    backgrounds: { default: 'dark' }
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    )
  ]
};

// NEW INTERACTIVE DEMOS

// Simulated Loading Demo
export const LoadingSimulation: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [value, setValue] = React.useState('');
    
    const handleSubmit = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setValue('Validation complete!');
      }, 2000);
    };
    
    return (
      <div className="space-y-4 w-80">
        <InputField
          label="Email Validation"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter email to validate"
          loading={isLoading}
          helperText={isLoading ? 'Checking email availability...' : 'Click validate to test loading'}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Validating...' : 'Validate Email'}
        </button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing real loading simulation with a 2-second delay'
      }
    }
  }
};

// Real-time Search Demo
export const LiveSearchDemo: Story = {
  render: () => {
    const [query, setQuery] = React.useState('');
    const [isSearching, setIsSearching] = React.useState(false);
    const [results, setResults] = React.useState<string[]>([]);
    
    // Simulate search with debounce
    React.useEffect(() => {
      if (query.length > 2) {
        setIsSearching(true);
        const timer = setTimeout(() => {
          // Simulate search results
          setResults([
            `${query} - Product 1`,
            `${query} - Product 2`,
            `${query} - Product 3`
          ]);
          setIsSearching(false);
        }, 800);
        
        return () => clearTimeout(timer);
      } else {
        setResults([]);
        setIsSearching(false);
      }
    }, [query]);
    
    return (
      <div className="space-y-4 w-80">
        <InputField
          label="Live Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search products..."
          loading={isSearching}
          clearable
          helperText={isSearching ? 'Searching...' : 'Type 3+ characters to search'}
        />
        
        {results.length > 0 && (
          <div className="bg-white border rounded-lg shadow-sm">
            <div className="p-2 text-sm text-gray-600 border-b">Search Results:</div>
            {results.map((result, index) => (
              <div key={index} className="p-2 hover:bg-gray-50 text-sm">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Live search with debounced loading - shows real-world usage'
      }
    }
  }
};