import { createClient } from "@supabase/supabase-js";

import 'dotenv/config'

const supabase_anon_key = process.env["SUPABASE_ANON_KEY"];
const supabase_URL = process.env["SUPABASE_URL"];

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabase_URL, supabase_anon_key);
