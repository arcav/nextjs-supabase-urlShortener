// src/app/components/Table.tsx
import React from 'react';
import { UrlData } from '@/app/page';

interface TableProps {
    urls: UrlData[];
    handleDelete: (id: number) => Promise<void>;
    handleUpdate:(id: number) => Promise<void>;
    openModal: (url: UrlData) => void
}

const Table: React.FC<TableProps> = ({ urls, handleDelete, openModal }) => {
    return (
        <div >
        <table className='min-w-full divide-y divide-gray-200 text-center'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                URL Acortada
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Clicks
              </th>
              <th className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {urls.map((url) => (
              <tr
                key={url.id}
                className='hover:bg-gray-50 transition duration-200 ease-in-out'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <a
                    href={url.originalUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'>
                    {url.shortUrl}
                  </a>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <span className='text-gray-900'>{url.clickCount}</span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                  <button
                    onClick={()=>openModal(url)}
                    className='text-blue-500 hover:text-blue-700 mr-4'>
                    Modificar
                  </button>
                  <button
                    onClick={() => handleDelete(url.id)}
                    className='text-red-500 hover:text-red-700'>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    );
};

export default Table;
