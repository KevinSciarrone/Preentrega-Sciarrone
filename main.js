 let listaEspera = [];
   
 const paciente1 = prompt("Ingrese nombre del paciente: ")
 //funcion para agregar un paciente a la lista de espera

 function agregarPaciente(nombre) {
     listaEspera.push(nombre);
     alert("Has sido agregado a la lista de espera.");
 }

 //funcion para agregar al siguiente paciente
 function atenderSiguiente(){
 if(listaEspera.lengt > 0){
     const paciente = listaEspera.shift();
     alert("Atendiendo a $ {paciente}.");
 } else{
     alert("No hay pacientes en espera.")
 }
 }

 //Ciclo

 while(true){
     alert("¿Que accion deseas realizar?")
     alert("1. Agregar paciente a la lista de espera.");
     alert("2. Atender al siguiente.")
     alert("3. Salir.")

     const opcion= prompt("selecciona una opcion: ");

     if(opcion === "1"){
         const nombre = parseInt(prompt("Ingresar el nombre del paciente: "))
         agregarPaciente(nombre);
     } else if (opcion === "2"){
         atenderSiguiente();
     } else if (opcion === "3"){
         alert("Saliendo del simulador.");
         break;
        } else{
         alert("Opción inválida. Por favor, elije una opción válida.")
    }
 }

