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

//ciclo
while (true) {
  console.log("¿Que accion desea realizar?");
  console.log("1. Agregar paciente a la lista");
  console.log("2. Atender paciente");
  console.log("3. Salir");

  const opcion = prompt("Selecciona una opcion:");

  if (opcion === "1") {
    agregarPaciente();
    alert("Aguarde su llamado");
  } else if (opcion === "2") {
    alert("Que pase el que sigue");
    atenderSiguiente();
  } else if (opcion === "3") {
    salir();
    alert("Adios");
    break;
  } else {
    alert("Opcion invalida");
  }
  console.log(listaEspera);
}
