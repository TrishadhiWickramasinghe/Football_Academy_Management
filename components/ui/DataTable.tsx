import React from 'react';
import { EmptyState } from '../feedback/EmptyState';
import { Search } from 'lucide-react';

export interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  onRowClick?: (item: T) => void;
  searchPlaceholder?: string;
}

export function DataTable<T>({ 
  data, 
  columns, 
  emptyStateTitle = "No data found", 
  emptyStateDescription = "Get started by adding a new record.",
  onRowClick,
  searchPlaceholder = "Search..."
}: DataTableProps<T>) {

  if (!data || data.length === 0) {
    return (
      <EmptyState 
        title={emptyStateTitle} 
        description={emptyStateDescription} 
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative w-72 mb-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder={searchPlaceholder}
            className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-full pl-10 pr-4 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 shadow-sm transition-all"
          />
        </div>
        {/* Placeholder for Filters/Actions */}
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-black font-bold bg-gray-50 uppercase border-b border-gray-200">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="px-4 py-3 font-medium">{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  onClick={() => onRowClick?.(item)}
                  className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-4 py-3">
                      {col.cell ? col.cell(item) : String(item[col.accessorKey] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Table Pagination Placeholder */}
      <div className="flex items-center justify-between px-2 pt-2 text-xs font-medium text-gray-500">
        <span>Showing 1 to {data.length} of {data.length} entries</span>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1.5 border border-gray-200 rounded-full font-bold text-gray-400 bg-gray-50 cursor-not-allowed transition-all">Previous</button>
          <button className="px-4 py-1.5 border border-gray-200 rounded-full font-bold text-gray-700 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all">Next</button>
        </div>
      </div>
    </div>
  );
}
