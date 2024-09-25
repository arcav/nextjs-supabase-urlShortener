'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import { Button, Form, Table } from '@/app/components/index';

export interface UrlData {
    id: number;
    originalUrl: string;
    shortUrl: string;
    clickCount: number;
    data?: [];
}

export default function Home() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [urls, setUrls] = useState<UrlData[]>([]);
    const [showTable, setShowTable] = useState(false);
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUrlId, setCurrentUrlId] = useState<number | null>(null);
    const [newOriginalUrl, setNewOriginalUrl] = useState(originalUrl);

    // Define el dominio base
    const BASE_URL = 'http://localhost:3001';

    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        try {
            const { data, error } = await supabase.from('urls').select('*');
            if (error) {
                console.error('Error fetching data:', error);
                return;
            }
            setUrls(data);
        } catch (error) {
            console.error('Error in fetchUrls:', error);
        }
    };

    const isValidUrl = (url: string): boolean => {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocolo
                '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // dominio
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // dirección IP (opcional)
                '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // puerto y ruta
                '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // parámetros de consulta (opcional)
                '(\\#[-a-zA-Z\\d_]*)?$',
            'i', // fragmento (opcional)
        );
        return !!urlPattern.test(url);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación antes de enviar el formulario
        if (!isValidUrl(originalUrl)) {
            setError('Por favor, ingrese una URL válida.');
            return;
        }

        // Si la URL es válida, reseteamos el error
        setError('');

        // Generar la URL corta
        const generatedShortUrl = Math.random().toString(36).substr(2, 8);
        const fullShortUrl = `${BASE_URL}/${generatedShortUrl}`; // Concatenar con el dominio
        setShortUrl(fullShortUrl);

        try {
            console.log('Datos a insertar:', {
                originalUrl,
                shortUrl: fullShortUrl,
            });

            // Insertar en Supabase
            const { data, error } = await supabase
                .from('urls')
                .insert([
                    { originalUrl, shortUrl: fullShortUrl, clickCount: 0 },
                ])
                .select('*');

            if (error) {
                console.error('Error al insertar la URL:', error);
                return;
            }

            if (!data) {
                console.error('No se recibió ningún dato desde Supabase.');
                return;
            }

            // Actualizar la lista de URLs
            setUrls((prevUrls) => [...prevUrls, ...(data as UrlData[])]);
            setOriginalUrl(''); // Limpiar el campo de URL original
            console.log('URL acortada guardada correctamente:', data);
        } catch (error) {
            console.error('Error en handleSubmit:', error);
        }
    };

    const handleDelete = async (id: number): Promise<void> => {
        const { error } = await supabase
            .from('urls') // Nombre de tu tabla
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting URL:', error);
        } else {
            console.log('URL deleted successfully');
            // Aquí puedes actualizar el estado o hacer un refetch
            setUrls((prevUrls) => prevUrls.filter((url) => url.id !== id));
        }
    };

    const openModal = (url: UrlData) => {
        setNewOriginalUrl(url.originalUrl); // Actualiza la URL original en el estado
        setCurrentUrlId(url.id); // Establece el ID de la URL seleccionada
        setIsModalOpen(true)}
    const closeModal = () => setIsModalOpen(false);

    const handleUpdate = async (id: number | null): Promise<void> => {
        if (!id) return; // Asegúrate de que el ID sea válido
        const { error } = await supabase
            .from('urls')
            .update({ originalUrl: newOriginalUrl })
            .eq('id', id);

        if (error) {
            console.error('Error updating URL:', error);
        } else {
            console.log('URL updated successfully');
            setIsModalOpen(false); // Cierra el modal después de actualizar
        }
    };
    return (
        <div className='w-10/12 h-full bg-red-500 flex flex-col justify-evenly items-center p-4'>
            <h1 className='text-2xl font-bold text-white'>Acortador de URLs</h1>

            <Form
                handleSubmit={handleSubmit}
                originalUrl={originalUrl}
                setOriginalUrl={setOriginalUrl}
                error={error}
                setError={setError}
            />

            {shortUrl && (
                <p className='mt-2 text-white'>
                    URL acortada:{' '}
                    <a href={shortUrl} className='underline'>
                        {shortUrl}
                    </a>
                </p>
            )}

            <Button
                label={showTable ? 'Ocultar Tabla' : 'Mostrar Tabla'}
                onClick={() => setShowTable((prevState) => !prevState)}
                className='mt-4 p-2 bg-blue-500 text-white rounded'
            />

            {showTable && (
                <Table
                    urls={urls}
                    handleDelete={handleDelete}
                
                    handleUpdate={handleUpdate}
                    openModal={(url: UrlData) => openModal(url)}
                />
            )}
            {isModalOpen && (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Modificar URL Original</h2>
            <input
                type="text"
                value={newOriginalUrl}
                onChange={(e) => setNewOriginalUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Introduce la nueva URL"
            />
            <div className="mt-4 flex justify-end space-x-2">
                <button
                    onClick={() => handleUpdate(currentUrlId)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Guardar Cambios
                </button>
                <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
                >
                    Cancelar
                </button>
            </div>
        </div>
    </div>
)}

        </div>
    );
}
