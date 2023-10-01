document.addEventListener("DOMContentLoaded", function () {
  const nombre = document.querySelector("#inputNombre");
  const apellido = document.querySelector("#inputApellido");
  const edad = document.querySelector("#inputEdad");
  const dni = document.querySelector("#inputDni");
  const divListaPacientes = document.querySelector("#listaPacientes");
  const seccionPacientes = document.querySelector("#seccionPacientes");
  const formRegistro = document.querySelector("#formRegistro");

  const buscarApellido = document.querySelector("#inputApellidoB");
  const buscarDni = document.querySelector("#inputDniB");
  const btnBuscar = document.getElementById("btnBuscar");
  const formBuscar = document.getElementById("formBuscar");

  const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
  let pacientesJson = [];

  class Paciente {
    constructor({ nombre, apellido, edad, dni }) {
      this.Nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.dni = dni;
    }
  }

  //oculta la lista paciente
  seccionPacientes.style.display = "none";

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
    mostrarPacientes();
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
        liResultado.textContent = `${resultado.nombre} ${resultado.apellido}`;
        listaResultados.appendChild(liResultado);
      }
    } else {
      resultadoBusqueda.style.display = "none";
      seccionPacientes.style.display = "block";
    }
  });

  function guardarPaciente(paciente) {
    return new Promise((resolve) => {
      pacientes.push(paciente);
      localStorage.setItem("pacientes", JSON.stringify(pacientes));
      setTimeout(() => {
        mostrarPacientes();
        resolve();
      }, 500);
    });
  }

  function mostrarPacientes() {
    // Limpia la lista de pacientes existente
    divListaPacientes.innerHTML = "";
    const link = "datos.json";
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          pacientesJson = data;
          const pacientesCombinados = [...pacientes, ...pacientesJson];

          if (pacientesCombinados.length > 0) {
            seccionPacientes.style.display = "block";
            let listaPacientesHtml = "<ul>";
            // ...
            for (const paciente of pacientesCombinados) {
              // Almacena el objeto del paciente completo como atributo data-paciente
              const pacienteData = JSON.stringify(paciente);
              listaPacientesHtml += `<li>${paciente.nombre} ${paciente.apellido}<button class="atenderPaciente" data-paciente='${pacienteData}'>Atender</button></li>`;
            }
            listaPacientesHtml += "</ul>";
            divListaPacientes.innerHTML = listaPacientesHtml;

            // Agregar evento a los botones "Atender"
            const botonesAtender =
              document.querySelectorAll(".atenderPaciente");
            botonesAtender.forEach((btn) => {
              btn.addEventListener("click", () => {
                const pacienteData = btn.getAttribute("data-paciente");
                const paciente = JSON.parse(pacienteData)
                const nombreCompleto = `${paciente.nombre} ${paciente.apellido}`
                console.log(
                  "Botón 'Atender' clickeado para DNI:",
                  nombreCompleto
                ); // Agregar este console.log
                atenderPaciente(paciente);
              });
            });
          } else {
            seccionPacientes.style.display = "none";
          }
        } else {
          console.error("El archivo JSON no tiene el formato esperado.");
        }
      })
      .catch((error) =>
        console.error("Error al cargar el archivo JSON:", error)
      );
  }

  // Evento para atender a un paciente y eliminarlo
  function atenderPaciente(nombreCompleto) {
    return new Promise((resolve) => {
      console.log("Iniciando atenderPaciente para", nombreCompleto);
      const pacienteAtendido = pacientes.find((paciente) => {
        return `${paciente.nombre} ${paciente.apellido}` === nombreCompleto;
      });
      if (pacienteAtendido) {
        const index = pacientes.indexOf(pacienteAtendido);
        console.log("Paciente encontrado:", pacienteAtendido);
        console.log("Pacientes antes de eliminar:", pacientes);
        if (index !== -1) {
          console.log("Eliminando paciente de la lista...");
          pacientes.splice(index, 1);
          localStorage.setItem("pacientes", JSON.stringify(pacientes));
          setTimeout(() => {
            mostrarPacientes();
            resolve();
          }, 500); 
        }
      } else {
        console.log("paciente no encontrado");
      }
    });
  }
}
  }
});
