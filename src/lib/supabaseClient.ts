// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ofgbifslafyuuilltwek.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_VpvkBirkYSrIBfDIUfLPXw_ZhcTvtRh';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('❌ Credenciais do Supabase não configuradas!');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

export default supabase;