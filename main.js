let listaEspera = [];

// funcion para agregar pacientes
function agregarPaciente() {
  const nombre = prompt("Ingresa el nombre del paciente");
  console.log(nombre);
  listaEspera.push(nombre);
  console.log("El paciente ha sido agregado");
}

//funcion para agregar paciente
function atenderSiguiente() {
  if (listaEspera.length > 0) {
    const paciente = listaEspera.length;
    alert("Tenes " + paciente + " pacientes adelante");
  } else {
    console.log("No hay pacientes en la lista de espera");
  }
}

function salir() {
  console.log("saliendo del simulador");
}

//Objeto

//// Este es un ej
const datosPaciente = {
  nombre: "Roberto",
  apellido: "Tedin",
  edad: 27,
  dni: 37595154,
};

//// Este es la funcion con el objeto

function insertarNuevoPaciente() {
  const nuevoPaciente = {
    nombre: "",
    apellido: "",
    edad: 0,
    dni: 0,
  };
  const nuevoNombre = prompt("Ingresa el nombre del paciente");
  nuevoPaciente.nombre = nuevoNombre;
  const nuevoApellido = prompt("Ingrese el apellido del paciente");
  nuevoPaciente.apellido = nuevoApellido;
  const nuevaEdad = parseInt(prompt("Ingrese la edad del paciente"));
  nuevoPaciente.edad = parseInt(nuevaEdad);
  const nuevoDni = parseInt(prompt("Ingrese su DNI"));
  nuevoPaciente.dni = nuevoDni;

  listaEspera.push(nuevoPaciente);
}

//Funcion para filtrar (.filter te devuelve un array con los elementos que cumplan con la condicion de filtrado)

function filtrarPaciente() {
  const pacienteMenores = listaEspera.filter((paciente) => paciente.edad < 18);
  console.log(pacienteMenores);
  return pacienteMenores;
}

// Funcion de busqueda pacientes (.find devuelve el 1er elemente que coincida)

function buscarPaciente() {
  const dniBuscado = parseInt(prompt("Ingrese dni a buscar"));
  const pacienteBuscado = listaEspera.find(
    (paciente) => paciente.dni === dniBuscado
  );
  if (pacienteBuscado) {
    alert(
      "Este paciente es el que busca: " +
        pacienteBuscado.nombre +
        " " +
        pacienteBuscado.apellido
    );
  } else {
    alert("Estes paciente no esta registrado.");
  }
}

//ciclo
while (true) {
  console.log("¿Que accion desea realizar?");
  console.log("1. Agregar paciente a la lista");
  console.log("2. Atender paciente");
  console.log("3. Filtrar menores");
  console.log("4. Buscar por DNI");
  console.log("5. Salir");

  const opcion = prompt("Selecciona una opcion:");

  if (opcion === "1") {
    insertarNuevoPaciente();
    alert("Aguarde su llamado");
  } else if (opcion === "2") {
    alert("Que pase el que sigue");
    atenderSiguiente();
  } else if (opcion === "3") {
    const pacienteMenores = filtrarPaciente();
    if (pacienteMenores.length !== 0) {
      for (const paciente of pacienteMenores) {
        alert(
          "Estos pacientes tienen que venir acompañados:" +
            paciente.nombre +
            paciente.apellido
        );
      }
    } else {
      alert("No existen pacientes menores de edad");
    }
  } else if (opcion === "4") {
    buscarPaciente();
  } else if (opcion === "5") {
    salir();
    alert("Adios");
    break;
  } else {
    alert("Opcion invalida");
  }
  console.log(listaEspera);
}
