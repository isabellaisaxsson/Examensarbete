import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;


export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const checkSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from("produkter").select("count", { count: "exact" })
  
      if (error) {
        console.error("Supabase connection error:", error)
        return false
      }
  
      console.log("Supabase connection successful")
      return true
    } catch (err) {
      console.error("Unexpected error checking Supabase connection:", err)
      return false
    }
  }
