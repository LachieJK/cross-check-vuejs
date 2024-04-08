import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://cekwenulbokbnviovvsp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNla3dlbnVsYm9rYm52aW92dnNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5MjUzMjcsImV4cCI6MjAyNDUwMTMyN30.Qo2ZQhAjHotIYfcsETN1KaM3-Tgpu4gGGuUn1dDDsJA')