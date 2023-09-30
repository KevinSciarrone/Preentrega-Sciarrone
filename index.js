document.addEventListener("DOMContentLoaded", function () {
  const nombre = document.querySelector("#inputNombre");
  const apellido = document.querySelector("#inputApellido");
  const edad = document.querySelector("#inputEdad");
  const dni = document.querySelector("#inputDni");
  const divListaPacientes = document.querySelector("#listaPacientes");
  const seccionPacientes = document.querySelector("#seccionPacientes");
  const formRegistro = document.querySelector("#formRegistro");

  const buscarNombre = document.querySelector("#inputNombreB");
  const buscarApellido = document.querySelector("#inputApellidoB");
  const buscarDni = document.querySelector("#inputDniB");
  const btnBuscar = document.getElementById("btnBuscar");
  const formBuscar = document.getElementById("formBuscar");

  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
  mostrarPacientes();

  class Paciente {
    constructor({ nombre, apellido, edad, dni }) {
      this.Nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
    }
  }

  //evento (submit)
  formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreValue = nombre.value.trim();
    const apellidoValue = apellido.value.trim();
    const edadValue = edad.value.trim();
    const dniValue = dni.value.trim();

    // Verificar si algún campo está vacío
    if (
      nombreValue === "" ||
      apellidoValue === "" ||
      edadValue === "" ||
      dniValue === ""
    ) {
      swal("¡ Por favor, completa todos los campos.");
      return;
    }

    // Verificar si el nombre es igual al apellido
    if (nombreValue === apellidoValue) {
      swal({
        title: "¡Algo salio mal!",
        text: "El apellido no puede ser igual al nombre",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      return;
    }

    const paciente = new Paciente({
      nombre: nombreValue,
      apellido: apellidoValue,
      edad: edadValue,
      dni: dniValue,
    });

    guardarPaciente(paciente);
    formRegistro.reset();
  });

  //evento para mostrar el formulario de busqueda
  btnBuscar.addEventListener("click", (e) => {
    e.preventDefault();
    formBuscar.style.display = "block";
  });

  //evento del formulario de busqueda
  formBuscar.addEventListener("submit", (e) => {
    e.preventDefault();

    const apellidoBValue = buscarApellido.value.trim();
    const dniBValue = buscarDni.value.trim();

    const nombreValue = nombre.value.trim();
    const apellidoValue = apellido.value.trim();
    const edadValue = edad.value.trim();
    const dniValue = dni.value.trim();

    const resultados = pacientes.filter((paciente) => {
      return (
        paciente.apellido
          .toLowerCase()
          .includes(apellidoBValue.toLowerCase()) &&
        paciente.dni.includes(dniBValue)
      );
    });

    const resultadoBusqueda = document.getElementById("resultadoBusqueda");
    const listaResultados = document.getElementById("listaResultados");
    listaResultados.innerHTML = "";

    if (resultados.length > 0) {
      resultadoBusqueda.style.display = "block";
      seccionPacientes.style.display = "none";
      for (const resultado of resultados) {
        const liResultado = document.createElement("li");
        liResultado.textContent = `${resultado.Nombre} ${resultado.apellido}`;
        listaResultados.appendChild(liResultado);
      }
    } else {
      resultadoBusqueda.style.display = "none";
      seccionPacientes.style.display = "block";
    }
  });

  function guardarPaciente(paciente) {
    return new Promise((resolve, reject) => {
      pacientes.push(paciente);
      localStorage.setItem("pacientes", JSON.stringify(pacientes));
      setTimeout(() => {
        mostrarPacientes();
        resolve;
        resolve();
      }, 500);
    });
  }

  function mostrarPacientes() {
    if (pacientes.length > 0) {
      seccionPacientes.style.display = "block";
      let listaPacientesHtml = "<ul>";
      for (const paciente of pacientes) {
        listaPacientesHtml += `<li>${paciente.Nombre} ${paciente.apellido}<button class="atenderPaciente">Atender</button></li>`;
      }
      listaPacientesHtml += "</ul>";
      divListaPacientes.innerHTML = listaPacientesHtml;

      // Agregar evento a los botones "Atender"
      const botonesAtender = document.querySelectorAll(".atenderPaciente");
      botonesAtender.forEach((btn) => {
        btn.addEventListener("click", () => {
          const nombrePaciente = btn.parentNode.textContent.trim();
          atenderPaciente(nombrePaciente); // Llama a la función para atender al paciente
        });
      });
    }
  }

  // Evento para atender a un paciente y eliminarlo de la lista
  function atenderPaciente(nombreCompleto) {
    return new Promise((resolve, reject) => {
      const pacienteAtendido = pacientes.find((paciente) => {
        return `${paciente.Nombre} ${paciente.apellido}` === nombreCompleto;
      });
      if (pacienteAtendido) {
        const index = pacientes.indexOf(pacienteAtendido);
        if (index !== -1) {
          pacientes.splice(index, 1);
          localStorage.setItem("pacientes", JSON.stringify(pacientes));
          setTimeout(() => {
            mostrarPacientes();
            resolve();
          }, 500); // Simula una operación asíncrona
        }
      }
    });
  }
});
