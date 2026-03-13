import { createClient } from '@supabase/supabase-js'

// Ambil URL dan Key dari dashboard Supabase lo
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// zMo3Y01BOsS5LQAA