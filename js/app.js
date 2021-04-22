// CAMPOS DEL FORMULARIO
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
let editando; 

//UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas {
    constructor (){
        this.citas = [];
    }
    agregarCita (cita) {
        this.citas = [...this.citas,cita];
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? cita = citaActualizada : cita)   // como es edicion y map crea nuevo arreglo.
    }                                                                                                        //Verifica por id, en caso de encontrar reescribre cita, en otro caso retorna cita normal
}

class UI {
    imprimirAlerta (mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','d-block', 'col-12', 'alert');
        if(tipo == 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.textContent = mensaje;

        //Insertar en HTML
        document.querySelector('.agregar-cita').appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
    }

    
    imprimirCitas({citas}) {
        this.limpiarHTML();
        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h3');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <span class = "font-weight-bolder">Propietario: </span>${propietario}
            `;
            
            const TelefonoParrafo = document.createElement('p');
            TelefonoParrafo.innerHTML = `
            <span class = "font-weight-bolder">Telefono: </span>${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class = "font-weight-bolder">Fecha: </span>${fecha}
            `;
            
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class = "font-weight-bolder">Hora: </span>${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <span class = "font-weight-bolder">Sintomas: </span>${sintomas}
            `;

            // boton para eliminar esta cita
            const btnEliminar = document.createElement('buton');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-1');
            btnEliminar.innerHTML = 'Eliminar   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /> </svg>';
            btnEliminar.onclick = () => eliminarCita(id);

            const btnEditar = document.createElement('buton');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>'
            btnEditar.onclick = () => cargarEdicion(cita);

            // Agregar los parrafos a divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(TelefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);
            // Agregar la cita al html
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML () {
        while (contenedorCitas.firstChild){
        contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

// OBJETO CON INFORMACION DE LA CITA
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// MAIN
eventListeners();
const ui = new UI();
const administrarCitas = new Citas();

// FUNCIONES
function eventListeners() {
    mascotaInput.addEventListener('input',datosCita)
    propietarioInput.addEventListener('input',datosCita)
    telefonoInput.addEventListener('input',datosCita)
    fechaInput.addEventListener('input',datosCita)
    horaInput.addEventListener('input',datosCita)
    sintomasInput.addEventListener('input',datosCita)

    formulario.addEventListener('submit', nuevaCita);
}

// AGREGA DATOS AL OBJETO  *FUNCIONA SI EL NAME DEL HTML ES EL MISMO DE LA PROPIEDAD DEL OBJETO
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

function nuevaCita(e) {

    e.preventDefault();

    const {mascota, propiertario, telefono, fecha, hora, sintomas} = citaObj;
    if (mascota ==='' || propiertario ==='' || telefono ==='' || fecha ==='' || hora ==='' || sintomas ==='') {
        ui.imprimirAlerta('todos los campos son necesarios','error');
        return;
    }

    if(editando) {

        editando = false;
        
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        
        administrarCitas.editarCita({...citaObj});

        ui.imprimirAlerta('Editado Correctamente');

    } else {
    // Generar id unico
        citaObj.id = Date.now(); 
        
        //Creando nueva cita
        administrarCitas.agregarCita({...citaObj});  // Con esta sintaxis le envia una copia de citaObj             

        ui.imprimirAlerta('Se agrego correctamente');
    }
    reiniciarObjeto();

    formulario.reset();
    // Mostrar el HTML
    ui.imprimirCitas(administrarCitas);
}


function reiniciarObjeto (){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id){
    // Eliminar la cita
    administrarCitas.eliminarCita(id);

    //Muestre un mensaje
    ui.imprimirAlerta('la cita ${id} se elimino correctamente')

    // Refrescar las citas 
    ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edicion
function cargarEdicion (cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto global
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;
    //Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}