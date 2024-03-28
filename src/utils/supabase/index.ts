import { createClient } from "@supabase/supabase-js";

export function createSupabaseApp() {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    const SUPABSE_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_KEY

    if (!SUPABASE_URL || !SUPABSE_KEY) {
        console.error("Missing SUPABASE_URL or SUPABSE_KEY")
        return null
    }

    return createClient(SUPABASE_URL, SUPABSE_KEY)
}

const supabase = createSupabaseApp()
export default supabase
