function mostrarPopupEstudiantes() {
  const estudiantes = [
    { id: 1, nombre: "Juan Pérez", nota: 5.6, cita: null },
    { id: 2, nombre: "Ana López", nota: 7.2, cita: null },
    { id: 3, nombre: "Carlos Ruiz", nota: 6.9, cita: null }
  ];

  const popup = document.getElementById("popup");
  const titulo = document.getElementById("titulo-popup");
  const contenido = document.getElementById("contenido-popup");

  titulo.textContent = "Gestión de Estudiantes y Notas";

  contenido.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Nota</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        ${estudiantes.map(est => `
          <tr>
            <td>${est.nombre}</td>
            <td>
              <input type="number" 
                     value="${est.nota}" 
                     style="background-color: ${est.nota >= 7 ? 'green' : est.nota >= 4 ? 'yellow' : 'red'}; 
       color: ${est.nota >= 4 && est.nota<7 ? 'black' : 'white'};"

                     onchange="actualizarNota(${est.id}, this.value, this)">
            </td>
            <td>
              <button id="btn-contactar-${est.id}" 
                      ${est.nota >= 7 ? 'style="display:none;"' : ''} 
                      onclick="contactar(${est.id}, '${est.nombre}')">Contactar</button>
            </td>
          </tr>`).join("")}
      </tbody>
    </table>
  `;

  popup.classList.add("visible");
}

function actualizarNota(estudianteId, nuevaNota, input) {
  nuevaNota = parseFloat(nuevaNota);
  const btnContactar = document.getElementById(`btn-contactar-${estudianteId}`);
  input.style.backgroundColor = nuevaNota >= 7 ? 'green' : nuevaNota >= 4 ? 'yellow' : 'red';
  input.style.color = nuevaNota >= 4 ? 'black' : 'white';

  if (nuevaNota >= 7) {
    btnContactar.style.display = "none"; // Oculta el botón
  } else {
    btnContactar.style.display = "inline"; // Muestra el botón
  }
}

function contactar(estudianteId, estudianteNombre) {
  const fechaHora = prompt(`Ingrese la fecha y hora para la cita con el representante de ${estudianteNombre}:`);
  if (fechaHora) {
    alert(`Cita programada con el representante de ${estudianteNombre} para el ${fechaHora}`);
    registrarCita(estudianteId, estudianteNombre, fechaHora);
  }
}

const citasProgramadas = [];

function registrarCita(estudianteId, estudianteNombre, fechaHora) {
  citasProgramadas.push({
    id: estudianteId,
    nombre: estudianteNombre,
    fecha: fechaHora,
    estado: "Programada"
  });

  // Refrescar la vista de citas programadas (Regla 3)
  mostrarCitasProgramadas();
}

function mostrarCitasProgramadas() {
  const popup = document.getElementById("popup");
  const titulo = document.getElementById("titulo-popup");
  const contenido = document.getElementById("contenido-popup");

  titulo.textContent = "Citas Programadas";

  if (citasProgramadas.length === 0) {
    contenido.innerHTML = "<p>No hay citas programadas actualmente.</p>";
  } else {
    contenido.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          ${citasProgramadas.map(cita => `
            <tr>
              <td>${cita.nombre}</td>
              <td>${cita.fecha}</td>
              <td>
                <select onchange="actualizarEstadoCita(${cita.id}, this.value)">
                  <option value="Programada" ${cita.estado === "Programada" ? "selected" : ""}>Programada</option>
                  <option value="No asistida" ${cita.estado === "No asistida" ? "selected" : ""}>No asistida</option>
                </select>
              </td>
            </tr>`).join("")}
        </tbody>
      </table>
    `;
  }

  popup.classList.add("visible");
}

function actualizarEstadoCita(citaId, nuevoEstado) {
  const cita = citasProgramadas.find(c => c.id === citaId);
  if (cita) {
    cita.estado = nuevoEstado;
    alert(`Estado de la cita actualizado a "${nuevoEstado}"`);
  }
}

// Función para cerrar el popup
function cerrarPopup() {
  const popup = document.getElementById("popup");
popup.classList.remove("visible");

  popup.classList.add("oculto");
}

// Datos simulados para la Regla 4
const cursos = [
  {
    id: 1,
    nombre: "9A",
    tutor: "Profesor García",
    estudiantes: [
      { id: 1, nombre: "Juan Pérez" },
      { id: 2, nombre: "Ana López" },
      { id: 3, nombre: "Carlos Ruiz" }
    ]
  },
  {
    id: 2,
    nombre: "10B",
    tutor: "Profesora Martínez",
    estudiantes: [
      { id: 4, nombre: "Lucía Fernández" },
      { id: 5, nombre: "Pedro Gómez" }
    ]
  }
];

// Mostrar Cursos (Regla 4)
function mostrarRegla4() {
  const popup = document.getElementById("popup");
  const titulo = document.getElementById("titulo-popup");
  const contenedor = document.getElementById("contenido-popup");
  contenedor.innerHTML = "";

  cursos.forEach(curso => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>Curso: ${curso.nombre}</h3>
      <p>Tutor: ${curso.tutor}</p>
      <button onclick="toggleEstudiantes(${curso.id}, this)">Ver Estudiantes</button>
      <ul id="estudiantes-curso-${curso.id}" class="oculto">
        ${curso.estudiantes.map(est => `<li>${est.nombre}</li>`).join("")}
      </ul>
    `;
    contenedor.appendChild(card);
  });
popup.classList.add("visible");
}

// Mostrar/Ocultar estudiantes en Regla 4
function toggleEstudiantes(cursoId, boton) {
  const lista = document.getElementById(`estudiantes-curso-${cursoId}`);
  if (lista.classList.contains("oculto")) {
    lista.classList.remove("oculto");
    boton.textContent = "Ocultar Estudiantes";
  } else {
    lista.classList.add("oculto");
    boton.textContent = "Ver Estudiantes";
  }
}

