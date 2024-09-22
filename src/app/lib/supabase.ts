import { createClient } from '@supabase/supabase-js';



// Reemplaza con tus credenciales de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ;

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);