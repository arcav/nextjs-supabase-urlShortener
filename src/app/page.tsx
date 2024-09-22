'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';
import { Button, Form, Table } from '@/app/components/index';

interface UrlData {
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

    // Expresión regular para validar URLs
    const isValidUrl = (url: string): boolean => {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocolo
            '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // dominio
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // dirección IP (opcional)
            '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // puerto y ruta
            '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // parámetros de consulta (opcional)
            '(\\#[-a-zA-Z\\d_]*)?$', 'i' // fragmento (opcional)
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
        setShortUrl(generatedShortUrl);
    
        try {
            console.log("Datos a insertar:", { originalUrl, shortUrl: generatedShortUrl });
    
            // Insertar en Supabase
            const { data, error } = await supabase
                .from('urls')
                .insert([
                    { originalUrl, shortUrl: generatedShortUrl, clickCount: 0 },
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

            {shortUrl && <p className="mt-2 text-white">URL acortada: {shortUrl}</p>}

            <Button
                label={showTable ? 'Ocultar Tabla' : 'Mostrar Tabla'}
                onClick={() => setShowTable((prevState) => !prevState)}
                className='mt-4 p-2 bg-blue-500 text-white rounded'
            />

            {showTable && <Table urls={urls} />}
        </div>
    );
}
