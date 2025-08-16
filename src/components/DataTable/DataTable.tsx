import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Loader2, CheckSquare, Square, Minus } from 'lucide-react';
import { clsx } from 'clsx';
import { DataTableProps } from '../../types';

function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data available',
  className
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Sort data based on current sort configuration
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortConfig.direction === 'desc' ? -comparison : comparison;
    });
  }, [data, sortConfig]);

  const handleSort = (columnKey: keyof T, sortable?: boolean) => {
    if (!sortable) return;

    setSortConfig(prev => ({
      key: columnKey,
      direction: prev.key === columnKey && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRowSelect = (index: number) => {
    if (!selectable) return;

    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedData = Array.from(newSelectedRows).map(i => sortedData[i]);
      onRowSelect(selectedData);
    }
  };

  const handleSelectAll = () => {
    if (!selectable) return;

    const allSelected = selectedRows.size === sortedData.length;
    const newSelectedRows = allSelected ? new Set<number>() : new Set(sortedData.map((_, index: number) => index));
    
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedData = allSelected ? [] : sortedData;
      onRowSelect(selectedData);
    }
  };

  const getSortIcon = (columnKey: keyof T, sortable?: boolean) => {
    if (!sortable) return null;
    
    if (sortConfig.key !== columnKey) {
      return <ChevronUp className="w-4 h-4 text-gray-400" />;
    }
    
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-300" /> :
      <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />;
  };

  const getSelectAllIcon = () => {
    const allSelected = selectedRows.size === sortedData.length;
    const someSelected = selectedRows.size > 0 && selectedRows.size < sortedData.length;
    
    if (allSelected) {
      return <CheckSquare className="w-4 h-4 text-blue-600" />;
    } else if (someSelected) {
      return <Minus className="w-4 h-4 text-blue-600" />;
    }
    return <Square className="w-4 h-4 text-gray-400" />;
  };

  if (loading) {
    return (
      <div className={clsx('rounded-lg border border-gray-200 dark:border-gray-700', className)}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={clsx('rounded-lg border border-gray-200 dark:border-gray-700', className)}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Square className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx('rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <button
                    onClick={handleSelectAll}
                    className="flex items-center justify-center w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                    aria-label={selectedRows.size === sortedData.length ? 'Deselect all' : 'Select all'}
                  >
                    {getSelectAllIcon()}
                  </button>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={clsx(
                    'px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                    {
                      'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 select-none': column.sortable
                    }
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column.key, column.sortable)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {getSortIcon(column.key, column.sortable)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {sortedData.map((row: T, index: number) => (
              <tr
                key={index}
                className={clsx(
                  'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                  {
                    'bg-blue-50 dark:bg-blue-900/20': selectedRows.has(index),
                    'cursor-pointer': selectable
                  }
                )}
                onClick={() => selectable && handleRowSelect(index)}
              >
                {selectable && (
                  <td className="w-12 px-4 py-3">
                    <div className="flex items-center justify-center">
                      {selectedRows.has(index) ? (
                        <CheckSquare className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Square className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100"
                  >
                    {column.render 
                      ? column.render(row[column.key], row)
                      : String(row[column.key] ?? '')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer with selection info */}
      {selectable && selectedRows.size > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {selectedRows.size} of {sortedData.length} rows selected
          </p>
        </div>
      )}
    </div>
  );
}

export default DataTable;