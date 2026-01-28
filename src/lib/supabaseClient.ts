// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Variáveis de ambiente
const SUPABASE_URL: https://ofgbifslafyuuilltwek.supabase.co
const SUPABASE_ANON_KEY: sb_publishable_VpvkBirkYSrIBfDIUfLPXw_ZhcTvtRh

// Validação das variáveis
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    '❌ Variáveis de ambiente do Supabase não configuradas!\nVerifique seu arquivo .env na raiz do projeto.'
  );
}

// Criação do cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

export default supabase;
