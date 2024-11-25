async function login(email, password) {
  const { data: session, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error en el inicio de sesión:', error.message);
    alert('Error en el inicio de sesión. Revisa tus credenciales.');
    return;
  }

  const profile = await getTypeProfile(session);
  if(determinarValidezPerfil(profile)){
	// Redirigir a la página correspondiente según el tipo de perfil
	redirectToProfilePage(profile[0].tipo_perfil);
  }else{
	alert('Error en el inicio de sesión. Perfil desconocido.');
    return;
  }
  
}

// Función para redirigir según el perfil
function redirectToProfilePage(profileType) {
  var page_re = 'index.html'
  switch (profileType) {
    case 'Estudiante':
      page_re = 'estudiante.html';
      break;
    case 'Tutor':
      page_re = 'tutor.html';
      break;
    case 'Docente':
      page_re = 'docente.html';
      break;
    case 'Representante':
      page_re = 'representante.html';
      break;
    default:
      alert('Perfil no reconocido.');
      console.error('Perfil desconocido:', profileType);
  }
  var currentPage = window.location.pathname.split('/').pop();

	if (page_re === currentPage) {
	  return;
	} else {
	  window.location.href = page_re;
	}
}

async function getTypeProfile(session){
	// Obtener perfil del usuario
  const userId = session.user.id;
  const { data: profile, error: profileError } = await supabaseClient.rpc('get_user_profile', {
    user_id: userId,
  });

  if (profileError || !profile) {
    console.error('Error al obtener perfil:', profileError?.message || 'Perfil no encontrado.');
    alert('No se pudo determinar el perfil del usuario.');
  }
  return profile;
}

function determinarValidezPerfil(perfil){
	if (!perfil || perfil.length === 0) {
    alert('No se pudo determinar el perfil del usuario.');
    return false;
	}
	return true;
}

async function redirigirSesionActiva(){
	const { data: { session }, error } = await supabaseClient.auth.getSession();
	if (error) {
	  console.error('Error al obtener la sesión:', error.message);
	  return;
	}
	if (session) {
	  const profile = await getTypeProfile(session);
	  if(determinarValidezPerfil(profile)){
		const nombre_tipo_perfil = profile[0].tipo_perfil;
		redirectToProfilePage(profile[0].tipo_perfil);
	  }
	}
}
redirigirSesionActiva();
