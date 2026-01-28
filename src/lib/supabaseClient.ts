import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ofgbifslafyuuilltwek.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_VpvkBirkYSrIBfDIUfLPXw_ZhcTvtRh';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  global: {
    headers: {
      'X-Client-Info': 'praisefmbr-web',
    },
  },
});

export default supabase;