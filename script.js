      const supabaseUrl = 'https://fmdairgelzsgeryjlhyo.supabase.co'
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZGFpcmdlbHpzZ2VyeWpsaHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzMDU1ODMsImV4cCI6MjA0Nzg4MTU4M30.t2EzyLJgkRzUe6gM5j2tIfeD0rLA3Sxy_r0Ej28Qp-g'   

    // Inicializar el cliente de Supabase
        const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);        
        const estudianteForm = document.getElementById('estudiante-form');
        const estudiantesTableBody = document.querySelector('#estudiantes-table tbody');
        const guardarBtn = document.getElementById('guardar-btn');
        const cancelarBtn = document.getElementById('cancelar-btn');
        let editingRow = null;
        
        //Funciones 
        // Función para obtener todos los estudiantes
        async function obtenerEstudiantes() {
            const { data, error } = await supabaseClient
                .from('Estudiante')
                .select('*')
                .order('created_at',{ascending: false});

            if (error) {
                console.error('Error al obtener estudiantes:', error);
                return;
            }

            mostrarEstudiantes(data);
        }

        // Función para mostrar los estudiantes en la tabla
        function mostrarEstudiantes(estudiantes) {
          estudiantesTableBody.innerHTML = '';
          estudiantes.forEach(estudiante => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', estudiante.Id);
            row.innerHTML = `
              <td>${estudiante.Id}
              ${estudiante.cedula}</td>
              <td>${estudiante.nombre}</td>
              <td class="acciones">
                <button class="editar-btn">Editar</button>
                <button class="eliminar-btn">Eliminar</button>
              </td>
            `;
            estudiantesTableBody.appendChild(row);
          });
        }
        //Función para limpiar el formulario
        function limpiarFormulario(){
            estudianteForm.reset();
            document.getElementById('id').value = '';
            cancelarBtn.style.display = 'none';
            guardarBtn.textContent = 'Guardar';
            if(editingRow){
                editingRow.classList.remove('edit-mode');
                editingRow = null;
            }
        }
        
        // Función para crear o actualizar un estudiante
        async function guardarEstudiante(event) {
          event.preventDefault();
          const cedula = document.getElementById('cedula').value;
          const nombre = document.getElementById('nombre').value;
          const id = document.getElementById('id').value;

          if (id) {
               //Actualizar estudiante
              const { data, error } = await supabaseClient
              .from('Estudiante')
              .update({ cedula, nombre })
              .eq('Id', id);

                if (error) {
                  console.error('Error al actualizar estudiante:', error);
                  return;
                }
              
              obtenerEstudiantes();
              limpiarFormulario();

          } else {
               // Crear estudiante
              const { data, error } = await supabaseClient
              .from('Estudiante')
              .insert([{ cedula, nombre }]);

                if (error) {
                    console.error('Error al crear estudiante:', error);
                    return;
                }
                obtenerEstudiantes();
                limpiarFormulario();

          }
      }
        // Función para eliminar un estudiante
        async function eliminarEstudiante(id) {
            if (confirm('¿Seguro que deseas eliminar este estudiante?')) {
                const { data, error } = await supabaseClient
                    .from('Estudiante')
                    .delete()
                    .eq('Id', id);

                if (error) {
                    console.error('Error al eliminar estudiante:', error);
                    return;
                }

               obtenerEstudiantes();
            }
        }
        // Cargar estudiantes al cargar la página
        obtenerEstudiantes();

        // Event listeners
        estudianteForm.addEventListener('submit', guardarEstudiante);

        // Event delegation para editar y eliminar estudiantes
        estudiantesTableBody.addEventListener('click', event => {
            const target = event.target;
            const row = target.closest('tr');

            if (target.classList.contains('editar-btn')) {
              editarEstudiante(row);
            } else if (target.classList.contains('eliminar-btn')) {
                const id = row.getAttribute('data-id');
                eliminarEstudiante(id);
            }
        });
          // Función para cargar los datos del estudiante en el formulario
        function editarEstudiante(row){
            const id = row.getAttribute('data-id');
            const cedula = row.querySelector('td:nth-child(2)').textContent;
            const nombre = row.querySelector('td:nth-child(3)').textContent;

            document.getElementById('id').value = id;
            document.getElementById('cedula').value = cedula;
            document.getElementById('nombre').value = nombre;
            guardarBtn.textContent = 'Actualizar';
            cancelarBtn.style.display = 'inline-block';
            editingRow = row;
            editingRow.classList.add('edit-mode');
        }
        cancelarBtn.addEventListener('click', limpiarFormulario);
