import { supabase } from '@/app/lib/supabase';

 const fetchUrls = async (): Promise<any[] | undefined> => { // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    try {
        const { data, error } = await supabase.from('urls').select('*');
        if (error) {
            console.error('Error fetching data:', error);
            return undefined;
        }
        return data; // Devuelve los datos
    } catch (error) {
        console.error('Error in fetchUrls:', error);
        return undefined;
    }
};

export default fetchUrls