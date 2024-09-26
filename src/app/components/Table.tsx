// src/app/components/Table.tsx
import React from 'react';
import { UrlData } from '@/app/types/urlData';

interface TableProps {
    urls: UrlData[];
    handleDelete: (id: number) => Promise<void>;
    handleUpdate: (id: number) => Promise<void>;
    openModal: (url: UrlData) => void;
    handleIncrement: (id: number) => void;
}

const Table: React.FC<TableProps> = ({
    urls,
    handleDelete,
    openModal,
    handleIncrement,
}) => {
    const handleClick = async (id: number) => {
        await handleIncrement(id); // Incrementa o contador
    };

    return (
        <div>
            <table className='min-w-full bg-white divide-y divide-gray-200 shadow-md rounded-lg'>
                <thead className='bg-blue-500 text-white'>
                    <tr>
                        <th className='px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider'>
                            URL Acortada
                        </th>
                        <th className='px-4 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider'>
                            Clicks
                        </th>
                        <th className='px-4 py-2 md:px-6 md:py-3'></th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {urls.map((url) => (
                        <tr
                            key={url.id}
                            className='hover:bg-gray-100 transition duration-300 ease-in-out'>
                            <td className='px-4 py-2 md:px-6 md:py-4 whitespace-nowrap'>
                                <a
                                    href={url.originalUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base'
                                    onClick={() => handleClick(url.id)}>
                                    {url.shortUrl}
                                </a>
                            </td>
                            <td className='px-4 py-2 md:px-6 md:py-4 whitespace-nowrap'>
                                <span className='text-gray-900 font-medium text-sm md:text-base'>
                                    {url.clickCount}
                                </span>
                            </td>
                            <td className='px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-right text-sm font-medium'>
                                <button
                                    onClick={() => openModal(url)}
                                    className='text-blue-500 hover:text-blue-700 transition duration-200 text-xs md:text-sm mr-2'>
                                    Modificar
                                </button>
                                <button
                                    onClick={() => handleDelete(url.id)}
                                    className='text-red-500 hover:text-red-700 transition duration-200 text-xs md:text-sm'>
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
