import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DataTable from './DataTable';
import { Column } from '../../types';
import React from 'react';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  rating: number;
}

// Sample data
const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'active', joinDate: '2023-01-25' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'active', joinDate: '2023-04-05' }
];

const sampleProducts: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299.99, inStock: true, rating: 4.5 },
  { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 29.99, inStock: true, rating: 4.2 },
  { id: 3, name: 'Office Chair', category: 'Furniture', price: 199.99, inStock: false, rating: 4.0 },
  { id: 4, name: 'Standing Desk', category: 'Furniture', price: 299.99, inStock: true, rating: 4.7 },
  { id: 5, name: 'Webcam HD', category: 'Electronics', price: 79.99, inStock: true, rating: 3.8 }
];

const userColumns: Column<User>[] = [
  { key: 'id', header: 'ID', sortable: true, width: '80px' },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { 
    key: 'status', 
    header: 'Status', 
    sortable: true,
    render: (value: string) => (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        value === 'active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {value}
      </span>
    )
  },
  { key: 'joinDate', header: 'Join Date', sortable: true }
];

const productColumns: Column<Product>[] = [
  { key: 'id', header: 'ID', sortable: true, width: '80px' },
  { key: 'name', header: 'Product Name', sortable: true },
  { key: 'category', header: 'Category', sortable: true },
  { 
    key: 'price', 
    header: 'Price', 
    sortable: true,
    render: (value: number) => `$${value.toFixed(2)}`
  },
  { 
    key: 'inStock', 
    header: 'In Stock', 
    sortable: true,
    render: (value: boolean) => (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        value 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {value ? 'Yes' : 'No'}
      </span>
    )
  },
  { 
    key: 'rating', 
    header: 'Rating', 
    sortable: true,
    render: (value: number) => (
      <div className="flex items-center">
        <span className="text-yellow-400">★</span>
        <span className="ml-1">{value.toFixed(1)}</span>
      </div>
    )
  }
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# DataTable Component

A flexible and interactive data table component with sorting, selection, and customizable rendering.

## Features
- **Column sorting**: Click headers to sort data ascending/descending
- **Row selection**: Single or multiple row selection with visual feedback
- **Loading states**: Built-in loading spinner and empty state
- **Custom rendering**: Flexible column rendering with custom components
- **Responsive design**: Horizontal scroll on smaller screens
- **Accessibility**: Full keyboard navigation and screen reader support
- **TypeScript**: Fully typed with generic support for any data structure

## Anatomy
The DataTable consists of:
1. **Header row** - Column titles with optional sorting controls
2. **Data rows** - The actual table content with hover states
3. **Selection column** (optional) - Checkboxes for row selection
4. **Loading/Empty states** - Feedback when data is loading or empty
5. **Footer** (optional) - Selection summary information

## Accessibility
- Semantic table markup with proper headers
- Keyboard navigation support
- ARIA labels for interactive elements
- Screen reader announcements for state changes
- Focus management for complex interactions

## Column Configuration
Each column supports:
- **sortable**: Enable/disable sorting for the column
- **render**: Custom rendering function for complex data
- **width**: Set specific column width
- **key**: Data property to display (with full TypeScript support)
        `
      }
    }
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Shows loading state'
    },
    selectable: {
      control: 'boolean',
      description: 'Enables row selection'
    },
    emptyMessage: {
      control: 'text',
      description: 'Message shown when no data is available'
    }
  },
  args: {
    onRowSelect: action('onRowSelect')
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    data: sampleUsers as any,
    columns: userColumns as any
  }
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers as any,
    columns: userColumns as any,
    selectable: true
  }
};

export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns as any,
    loading: true
  }
};

export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns as any,
    emptyMessage: 'No users found. Try adjusting your search criteria.'
  }
};

// Different Data Types
export const ProductTable: Story = {
  args: {
    data: sampleProducts as any,
    columns: productColumns as any,
    selectable: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with different data structure and custom column rendering'
      }
    }
  }
};

// Custom Rendering Examples
export const WithCustomRendering: Story = {
  args: {
    data: sampleUsers as any,
    columns: [
      { key: 'id', header: 'ID', sortable: true, width: '80px' },
      { 
        key: 'name', 
        header: 'User', 
        sortable: true,
        render: (value: any, row: any) => (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {value.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <div className="font-medium">{value}</div>
              <div className="text-sm text-gray-500">{row.email}</div>
            </div>
          </div>
        )
      },
      { key: 'role', header: 'Role', sortable: true },
      { 
        key: 'status', 
        header: 'Status', 
        sortable: true,
        render: (value: string) => (
          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            value === 'active' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {value}
          </span>
        )
      },
      { 
        key: 'joinDate', 
        header: 'Member Since', 
        sortable: true,
        render: (value: string) => new Date(value).toLocaleDateString()
      }
    ] as any,
    selectable: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Advanced example with avatar, combined user info, and formatted dates'
      }
    }
  }
};

// Responsive Example
export const ResponsiveTable: Story = {
  args: {
    data: sampleProducts as any,
    columns: productColumns as any
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Table with horizontal scroll on smaller containers'
      }
    }
  }
};

// Dark Mode
export const DarkMode: Story = {
  args: {
    data: sampleUsers as any,
    columns: userColumns as any,
    selectable: true
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

// Large Dataset Simulation
export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Moderator'][i % 3],
      status: Math.random() > 0.3 ? 'active' : 'inactive',
      joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0]
    })) as any,
    columns: userColumns as any,
    selectable: true
  },
  decorators: [
    (Story) => (
      <div className="max-h-96 overflow-auto">
        <Story />
      </div>
    )
  ],
  parameters: {
    docs: {
      description: {
        story: 'Example with many rows to demonstrate scrolling behavior'
      }
    }
  }
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<any[]>([]);
    
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
            Interactive Features Demo
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Click column headers to sort</li>
            <li>• Select rows using checkboxes</li>
            <li>• Try selecting all rows with the header checkbox</li>
          </ul>
          {selectedRows.length > 0 && (
            <div className="mt-3 p-2 bg-white dark:bg-gray-800 rounded border">
              <p className="text-sm font-medium">Selected Users:</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedRows.map(user => user.name).join(', ')}
              </p>
            </div>
          )}
        </div>
        
        <DataTable
          data={sampleUsers}
          columns={userColumns}
          selectable
          onRowSelect={setSelectedRows}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Full interactive demo showing all table features'
      }
    }
  }
};

// NEW INTERACTIVE DEMOS

// Loading Simulation Demo
export const LoadingSimulation: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState<User[]>([]);
    
    const loadData = () => {
      setIsLoading(true);
      setData([]);
      
      // Simulate API call
      setTimeout(() => {
        setData(sampleUsers);
        setIsLoading(false);
      }, 2000);
    };
    
    React.useEffect(() => {
      loadData();
    }, []);
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">User Management</h3>
          <button
            onClick={loadData}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Reload Data'}
          </button>
        </div>
        
        <DataTable
          data={data}
          columns={userColumns}
          loading={isLoading}
          selectable
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive loading demo - click reload to see 2-second loading simulation'
      }
    }
  }
};

// Async Data Fetching Demo
export const AsyncDataDemo: Story = {
  render: () => {
    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    
    const fetchUsers = async (shouldFail = false) => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (shouldFail) {
          throw new Error('Failed to fetch users');
        }
        
        setUsers(sampleUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    
    React.useEffect(() => {
      fetchUsers();
    }, []);
    
    if (error) {
      return (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-medium">Error Loading Data</h3>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button
              onClick={() => fetchUsers()}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => fetchUsers()}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 text-sm"
          >
            Load Success
          </button>
          <button
            onClick={() => fetchUsers(true)}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 text-sm"
          >
            Simulate Error
          </button>
        </div>
        
        <DataTable
          data={users}
          columns={userColumns}
          loading={loading}
          selectable
          emptyMessage="No users found. Try loading the data."
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real async data fetching with success/error states'
      }
    }
  }
};