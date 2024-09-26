// src/app/utils/handlers.ts
import { supabase } from '@/app/lib/supabase';
import {UrlData} from '@/app/types/urlData'

export const handleSubmit = async (
   
    originalUrl: string,
    setError: (error: string) => void,
    setShortUrl: (url: string) => void,
    setUrls: React.Dispatch<React.SetStateAction<UrlData[]>>, 
    BASE_URL: string
) => {
    if (!originalUrl) {
        setError('Por favor, ingrese una URL válida.');
        return;
    }
    setError('');

    const shortUrl = `${BASE_URL}/${Math.random().toString(36).substr(2, 6)}`;
    setShortUrl(shortUrl);

    try {
        const { data, error } = await supabase
            .from('urls')
            .insert([{ originalUrl, shortUrl, clickCount: 0 }])
            .select('*');

        if (error) {
            console.error('Error al insertar la URL:', error);
            return;
        }

        if (data) {
            
            setUrls((prevUrls) => [...prevUrls, ...(data as UrlData[])]);
        }
    } catch (error) {
        console.error('Error en handleSubmit:', error);
    }
};

export const handleDelete = async (
    id: number,
    setUrls: React.Dispatch<React.SetStateAction<UrlData[]>>
) => {
    try {
        const { error } = await supabase.from('urls').delete().eq('id', id);

        if (error) {
            console.error('Error al eliminar la URL:', error);
        } else {
            setUrls((prevUrls) => prevUrls.filter((url) => url.id !== id));
        }
    } catch (error) {
        console.error('Error en handleDelete:', error);
    }
};

// Función para manejar la actualización de una URL
export const handleUpdate = async (
    id: number | null,
    newOriginalUrl: string,
    setIsModalOpen: (isOpen: boolean) => void
) => {
    if (!id) return;

    try {
        const { error } = await supabase
            .from('urls')
            .update({ originalUrl: newOriginalUrl })
            .eq('id', id);

        if (error) {
            console.error('Error actualizando la URL:', error);
        } else {
            setIsModalOpen(false);
        }
    } catch (error) {
        console.error('Error en handleUpdate:', error);
    }
};

// Función para manejar el incremento de clickCount
export const handleIncrement = async (
    id: number,
    fetchUrls: () => Promise<any[] | undefined>
): Promise<void> => {
    try {
        // Lógica de incremento del contador
        const { error } = await supabase
            .from('urls')
            .update({ clickCount: supabase.rpc('clickCount + 1') })
            .eq('id', id);

        if (error) {
            console.error('Error incrementando el contador:', error);
            return;
        }

        // Vuelve a cargar las URLs después de incrementar el contador
        const urls = await fetchUrls();

        if (urls) {
            console.log('URLs fetched successfully:', urls);
        }
    } catch (error) {
        console.error('Error en handleIncrement:', error);
    }
};

