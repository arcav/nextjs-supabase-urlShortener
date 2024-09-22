// src/app/components/Table.tsx
import React from 'react';

interface UrlData {
    id: number;
    originalUrl: string;
    shortUrl: string;
    clickCount: number;
}

interface TableProps {
    urls: UrlData[];
}

const Table: React.FC<TableProps> = ({ urls }) => {
    return (
        <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200 text-center'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th className='px-4 py-2 font-semibold text-gray-600'>
                            ID
                        </th>
                        <th className='px-4 py-2 font-semibold text-gray-600'>
                            URL Original
                        </th>
                        <th className='px-4 py-2 font-semibold text-gray-600'>
                            URL Acortada
                        </th>
                        <th className='px-4 py-2 font-semibold text-gray-600'>
                            Contador de Clics
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url) => (
                        <tr key={url.id} className='hover:bg-gray-50'>
                            <td className='px-4 py-2 border-b border-gray-200  text-gray-600'>
                                {url.id}
                            </td>
                            <td className='px-4 py-2 border-b border-gray-200 text-gray-600'>
                                {url.originalUrl}
                            </td>
                            <td className='px-4 py-2 border-b border-gray-200  text-gray-600'>
                                {url.shortUrl}
                            </td>
                            <td className='px-4 py-2 border-b border-gray-200  text-gray-600'>
                                {url.clickCount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
