let listaEspera = [];

const nombre = document.querySelector("#inputNombre");
const apellido = document.querySelector("#inputApellido");
const edad = document.querySelector("#inputEdad");
const dni = document.querySelector("#inputDni");
const divListaPacientes = document.querySelector("#listaPacientes");
const seccionPacientes = document.querySelector("#seccionPacientes");
const form = document.querySelector("#formRegistro");

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  while (true) {
    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const edad = inputEdad.value;
    const dni = inputDni.value;

    if (inputNombre.value === inputApellido.value) {
      // alert('el nombre no puede ser igual al apellido')
      const texto = document.createElement("p");
      texto.innerHTML = "el nombre no puede ser igual al apellido";
    } else if (inputEdad === "" && inputDni === "") {
      const texto = document.createElement("p");
      texto.innerHTML = "favor de completar todos los campos";
    } else {
      console.log(pacientes);
      const paciente = new Paciente({ nombre, apellido, edad, dni });
      guardarPaciente(paciente);
    }
  }
});

function guardarPaciente(paciente) {
  listaEspera.push(paciente);
  localStorage.setItem("paciente", JSON.stringify(paciente));
  mostrarPacientes();
}

function mostrarPacientes() {
  if (pacientes.length > 0) {
    seccionPacientes.style.display = "block";
    let listaPacientesHtml = "<ul>";
    for (const paciente of pacientes) {
      listaPacientesHtml += `<li><a onclick="hacerAlgoConPaciente('${paciente.nombre}')">${paciente.nombre}</a></li>`;
    }
    divListaPacientes.innerHTML = listaEspera + "</ul>";
  }
}

function hacerAlgoConpaciente(nombrePaciente) {
  alert(nombrePaciente);
}
