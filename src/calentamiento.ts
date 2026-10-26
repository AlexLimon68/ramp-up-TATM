

interface task {
    'titulo': string,
    'estado': string,
    'horas': number
}

function filtro(tareas: task[]) {
    return tareas.filter((tarea) => tarea.estado === 'pending');
}

function sumarHoras(tareas: task[]){
    return tareas.reduce((total, tarea) => total + tarea.horas, 0);
}


const tareas = [
    { 'titulo': 'Titulo_1', 'estado': 'pending', 'horas': 2 },
    { 'titulo': 'Titulo_2', 'estado': 'pending', 'horas': 3.5 },
    { 'titulo': 'Titulo_3', 'estado': 'pending', 'horas': 1 },
    { 'titulo': 'Titulo_4', 'estado': 'pending', 'horas': 5 }
];

const pendientes = filtro(tareas);
console.log(pendientes);
console.log(`Horas pendientes ${sumarHoras(pendientes)}`);
