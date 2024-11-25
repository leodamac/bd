const { data: { session }, error } = await supabaseClient.auth.getSession();
if (error) {
  console.error('Error al obtener la sesión:', error.message);
}

if (session) {
  ;
} else {
  window.location.href = 'index.html'; // Redirige al login si no hay sesión
}