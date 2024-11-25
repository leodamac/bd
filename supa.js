const supabaseUrl = 'https://fmdairgelzsgeryjlhyo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZGFpcmdlbHpzZ2VyeWpsaHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzMDU1ODMsImV4cCI6MjA0Nzg4MTU4M30.t2EzyLJgkRzUe6gM5j2tIfeD0rLA3Sxy_r0Ej28Qp-g'   

// Inicializar el cliente de Supabase
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);