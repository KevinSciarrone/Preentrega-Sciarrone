const nombre = document.querySelector("#inputNombre");
const apellido = document.querySelector("#inputApellido");
const edad = document.querySelector("#inputEdad");
const dni = document.querySelector("#inputDni");
const divListaPacientes = document.querySelector("#listaPacientes");
const seccionPacientes = document.querySelector("#seccionPacientes");
const formRegistro = document.querySelector("#formRegistro");

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

  const nombreValue = nombre.value.trim(); // Elimina espacios en blanco al principio y al final
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
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Verificar si el nombre es igual al apellido
  if (nombreValue === apellidoValue) {
    alert("El apellido no puede ser igual al nombre.");
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

function guardarPaciente(paciente) {
  pacientes.push(paciente);
  localStorage.setItem("pacientes", JSON.stringify(pacientes));
  mostrarPacientes();
}

function mostrarPacientes() {
  if (pacientes.length > 0) {
    seccionPacientes.style.display = "block";
    let listaPacientesHtml = "<ul>";
    for (const paciente of pacientes) {
      listaPacientesHtml += `<li><a onclick="hacerAlgoConPaciente('${paciente.Nombre} ${paciente.apellido}')">${paciente.Nombre} ${paciente.apellido}</a></li>`;
    }
    listaPacientesHtml += "</ul>";
    divListaPacientes.innerHTML = listaPacientesHtml;
  }
}

function hacerAlgoConPaciente(nombrePaciente) {
  alert(nombrePaciente);
}
