'use client';
import { useState, useEffect } from 'react';
import { Button, Form, Table, Modal } from '@/app/components/index';
import {  fetchUrls, isValidUrl } from '@/app/utils';
import { UrlData } from '@/app/types/urlData';
import {
    handleSubmit,
    handleDelete,
    handleUpdate,
    handleIncrement,
} from '@/app/utils/handlers/handlers';

export default function Home() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [urls, setUrls] = useState<UrlData[]>([]);
    const [showTable, setShowTable] = useState(false);
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUrlId, setCurrentUrlId] = useState<number | null>(null);
    const [newOriginalUrl, setNewOriginalUrl] = useState(originalUrl);

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

    useEffect(() => {
        const loadUrls = async () => {
            const data = await fetchUrls();
            if (data) {
                setUrls(data);
            }
        };
        loadUrls();
    }, []);

    const openModal = (url: UrlData) => {
        setNewOriginalUrl(url.originalUrl); 
        setCurrentUrlId(url.id); 
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className='w-full h-screen bg-gray-100 flex flex-col justify-center items-center p-2'>
            <div className='w-full max-w-4xl md:max-w-lg sm:max-w-sm bg-white rounded-lg shadow-lg p-2 sm:p-2 flex flex-col place-content-center'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-4 text-center'>
                    Acortador de URLs
                </h1>
                <Form
                    handleSubmit={(e) => {
                        e.preventDefault();
                        if (!isValidUrl(originalUrl)) {
                            setError('Por favor, ingresa una URL válida');
                            setOriginalUrl('')
                            return;
                        }
                        handleSubmit(
                            originalUrl,
                            setError,
                            setShortUrl,
                            setUrls,
                            BASE_URL,
                            setOriginalUrl
                        );
                    }}
                    originalUrl={originalUrl}
                    setOriginalUrl={setOriginalUrl}
                    error={error}
                    setError={setError}
                  
                />
                {shortUrl && (
                    <p className='mt-2 text-black break-all'>
                        URL acortada:{' '}
                        <a href={shortUrl} className='underline'>
                            {shortUrl}
                        </a>
                    </p>
                )}
                <Button
                    label={showTable ? 'Ocultar Tabla' : 'Mostrar Tabla'}
                    onClick={() => setShowTable((prevState) => !prevState)}
                    className='mt-4 p-2 bg-blue-500 text-white rounded w-full sm:w-auto'
                />
                {showTable && (
                    <div className='overflow-x-auto'>
                        <Table
                            urls={urls}
                            handleDelete={(id) => handleDelete(id, setUrls)}
                            handleUpdate={(id) =>
                                handleUpdate(id, newOriginalUrl, setIsModalOpen)
                            }
                            openModal={(url: UrlData) => openModal(url)}
                              handleIncrement={(id) => handleIncrement(id, setUrls)} 
                        />
                    </div>
                )}
                {isModalOpen && (
                    <Modal
                        isOpen={isModalOpen}
                        closeModal={closeModal}
                        handleUpdate={() =>
                            handleUpdate(
                                currentUrlId,
                                newOriginalUrl,
                                setIsModalOpen,
                            )
                        }
                        newOriginalUrl={newOriginalUrl}
                        setNewOriginalUrl={setNewOriginalUrl}
                    />
                )}
            </div>
        </div>
    );
}
