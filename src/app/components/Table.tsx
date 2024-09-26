// src/app/components/Table.tsx
import React from 'react';
import { UrlData } from '@/app/types/urlData';
import { MdDeleteForever, MdUpdate } from 'react-icons/md';

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
        handleIncrement(id); // Incrementa o contador
    };

    return (
        <table className='min-w-full bg-white divide-y divide-gray-200 shadow-md rounded-lg mt-4 '>
            <thead className='bg-blue-500 text-white tracking-wider'>
                <tr>
                    <th
                        colSpan={3}
                        className='px-2 py-1 text-center text-xs font-medium uppercase sm:text-sm '>
                        URL Acortada
                    </th>
                </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
                {urls.map((url) => (
                    <tr
                        key={url.id}
                        className='hover:bg-gray-100 transition duration-300 ease-in-out' >
                        <td className='px-1 py-1 text-sm text-left sm:text-left md:text-base whitespace-nowrap break-all relative'>
                            <a
                                href={url.originalUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-600 hover:text-blue-800 font-semibold block'>
                                {url.shortUrl}
                            </a>
                            <span className='absolute top-1 right-1 transform translate-x-1/4 -translate-y-1/4 px-2 py-1 rounded-full text-xs font-semibold bg-red-500 text-white lg:-translate-x-3 lg:right-32'>
                                {url.clickCount}
                            </span>
                        </td>

                        <td className='px-1 py-3 text-center flex justify-between'>
                            <MdUpdate
                                size={26}
                                onClick={() => openModal(url)}
                                className='text-blue-500 hover:text-blue-700 cursor-pointer'
                            />
                            <MdDeleteForever
                                size={26}
                                onClick={() => handleDelete(url.id)}
                                className='text-red-500 hover:text-red-700 cursor-pointer'
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
