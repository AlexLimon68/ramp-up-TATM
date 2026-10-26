
// Ejercicio 2 Tipos de Dominio.
export type TaskStatus = "pending" | "in_progress" | "done" | "cancelled";
export type TaskPriority = "low" | "medium" | "high";

interface TodoList {
    id: string;
    name: string;
    createdAt: Date;
}

export interface Task {
    id: string;
    listId: string;
    title: string;
    descripcion: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    tags: string[];
    estimatedHours: string | null;
    dueDate: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    updateAt: Date;
}
// Fin del ejercicio 2.


//Ejercicio 3 Tipos Derivados.
type CreateTaskInput = Omit<Task, "id" | "createdAt" | "updateAt" | "completedAt">;
type UpdateTaskInput = Partial<Task>;
//Fin del ejercicio 3.


//Ejercicio 4 Estrechamiento.
function etiquetasDeEstado(estado: TaskStatus): string{
    switch (estado) {
        case "pending": return "Pendiente";
        case "in_progress": return "En progreso";
        case "done": return "Terminada";
        case "cancelled": return "Cancelada";
        default: {
            const imposible: never = estado;
            return imposible;
        }
    }
}
//Fin del ejercicio 4.

//Ejercicio 5 Validacion.
type Result<t> = 
    | { ok: true; value: t }
    | { ok: false; value: string[] };


function estadoValido(estado: string): boolean{
    switch (estado) {
        case "pending": return true;
        case "in_progress": return true;
        case "done": return true;
        case "cancelled": return true;
        default: return false;
    }
}

function prioridadValida(prioridad: string): boolean{
    switch (prioridad){
        case "low": return true;
        case "medium": return true;
        case "high": return true;
        default: return false;
    }
}

function validarCreatedTaskInput(dato: unknown): Result<CreateTaskInput>{
    
    if(typeof dato !== "object" || dato === null){
        return { ok: false, value: ["La entrada debe ser un objeto valido."]}
    }

    const errores: string[] = [];
    const tar = dato as Record<string, unknown>;

    if(typeof tar.listId !== "string" || tar.listId.trim() === ""){
        errores.push("Se requiere un id de lista.");
    }

    if(typeof tar.title !== "string" || tar.title.trim() === ""){
        errores.push("Es necesario agregar un titulo.");
    }
    if(tar.descripcion !== null && typeof tar.descripcion !== "string"){
        errores.push("La descripcion debe ser un texto o null.");
    }
    if(typeof tar.status === "string" && !estadoValido(tar.status)){
        errores.push("El estado no es valido.");
    }
    if(typeof tar.priority === "string" && !prioridadValida(tar.priority)){
        errores.push("La prioridad no es valida.");
    }
    if(!Array.isArray(tar.tags) || !tar.tags.every((tag) => typeof tag === "string")){
        errores.push("Los tags debe ser un arreglo de string.");
    }
    if(tar.estimatedHours !== null && typeof tar.estimatedHours !== "string"){
        errores.push("Horas estimadas debe ser una cadena de texto o null.");
    }
    if(tar.dueDate !== null && !(tar.dueDate instanceof Date && !isNaN(tar.dueDate.getTime()))){
        errores.push("El campo dueDate debe ser una fecha valida o null.");
    }

    if(errores.length > 0){
        return {ok: false, value: errores};
    }

    const taskInput: CreateTaskInput = {
        listId: tar.listId as string,
        title: tar.title as string,
        descripcion: (tar.descripcion ?? null) as string | null,
        status: tar.status as TaskStatus,
        priority: tar.priority as TaskPriority,
        tags: tar.tags as string[],
        estimatedHours: (tar.estimatedHours ?? null) as string | null,            dueDate: (tar.dueDate ?? null) as Date | null,
    }

    return { ok: true, value: taskInput };
}
//Fin del Ejercicio 5.

//Ejercicio 6 Repositorios en memoria.
interface TaskRepository {
    findById(id: string): Promise<Task | null>;
    findByList(listId: string): Promise<Task[]>;
    save(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}

class InMemoryTaskRepository implements TaskRepository {
    private readonly tareas = new Map<string, Task>();

    async findById(id: string): Promise<Task | null> {
        return this.tareas.get(id) ?? null;
    }
    async findByList(listId: string): Promise<Task[]> {
        return [...this.tareas.values()].filter((t) => t.listId === listId);
    }
    async save(task: Task): Promise<void>{
        this.tareas.set(task.id, task);
    }
    async delete(id: string): Promise<void> {
        this.tareas.delete(id);
    }
}

//Fin del ejercicio 6.

//Ejercicio 7 Servicio con errores propios.
function validarTask(dato: unknown): Result<Task>{
    
    if(typeof dato !== "object" || dato === null){
        return { ok: false, value: ["La entrada debe ser un objeto valido."]}
    }

    const errores: string[] = [];
    const tar = dato as Record<string, unknown>;

    if(typeof tar.id !== "string" || tar.id.trim() === ""){
        errores.push("Se requiere un id.");
    }

    if(typeof tar.listId !== "string" || tar.listId.trim() === ""){
        errores.push("Se requiere un id de lista.");
    }

    if(typeof tar.title !== "string" || tar.title.trim() === ""){
        errores.push("Es necesario agregar un titulo.");
    }
    if(tar.descripcion !== null && typeof tar.descripcion !== "string"){
        errores.push("La descripcion debe ser un texto o null.");
    }
    if(typeof tar.status === "string" && !estadoValido(tar.status)){
        errores.push("El estado no es valido.");
    }
    if(typeof tar.priority === "string" && !prioridadValida(tar.priority)){
        errores.push("La prioridad no es valida.");
    }
    if(!Array.isArray(tar.tags) || !tar.tags.every((tag) => typeof tag === "string")){
        errores.push("Los tags debe ser un arreglo de string.");
    }
    if(tar.estimatedHours !== null && typeof tar.estimatedHours !== "string"){
        errores.push("Horas estimadas debe ser una cadena de texto o null.");
    }
    if(tar.dueDate !== null && !(tar.dueDate instanceof Date && !isNaN(tar.dueDate.getTime()))){
        errores.push("El campo dueDate debe ser una fecha valida o null.");
    }
    if(tar.completedAt !== null && !(tar.completedAt instanceof Date && !isNaN(tar.completedAt.getTime()))){
        errores.push("El campo completedDate debe ser una fecha valida o null.");
    }
    if(!(tar.createdAt instanceof Date && !isNaN(tar.createdAt.getTime())) || tar.createdAt === null){
        errores.push("El campo createdAt debe contener un tipo Date.");
    }
    if(!(tar.updateAt instanceof Date && !isNaN(tar.updateAt.getTime())) || tar.updateAt === null){
        errores.push("El campo updateAt debe contener un tipo Date.");
    }

    if(errores.length > 0){
        return {ok: false, value: errores};
    }

    const taskInput: Task = {
        id: tar.id as string,
        listId: tar.listId as string,
        title: tar.title as string,
        descripcion: (tar.descripcion ?? null) as string | null,
        status: tar.status as TaskStatus,
        priority: tar.priority as TaskPriority,
        tags: tar.tags as string[],
        estimatedHours: (tar.estimatedHours ?? null) as string | null,
        dueDate: (tar.dueDate ?? null) as Date | null,
        completedAt: (tar.completedAt ?? null) as Date | null,
        createdAt: tar.createdAt as Date,
        updateAt: tar.updateAt as Date,
    }

    return { ok: true, value: taskInput };
}

class NotFoundError extends Error {
  constructor(recurso: string, id: string) {
    super(`${recurso} con id ${id} no existe`);
    this.name = "NotFoundError";
  }
}

class ValidationError extends Error{
    constructor(recurso: string[]){
        super(`No es posible crear esta tarea: ${recurso}`);
        this.name = "ValidationError";
    }
}

class TaskService {

  constructor(private readonly repo: TaskRepository) {}

  async obtener(id: string): Promise<Task> {
    const tarea = await this.repo.findById(id);
    if (tarea === null) {
      throw new NotFoundError("Tarea", id);
    }
    return tarea;
  }

  async crear(task: Task): Promise<void>{
    const errores = validarTask(task);

    if(Array.isArray(errores.value) && errores.value.length > 0){
        throw new ValidationError(errores.value);
    }
    
    await this.repo.save(task);
  }

  async actualizar(){
  }

  async eliminar(id: string): Promise<void>{
    const tarea = await this.repo.findById(id);
    if(tarea === null){
        throw new NotFoundError("Tarea", id);
    }
    await this.repo.delete(id);
  }
}

//Ejecutar ejercicio 7
async function ejecutar() {
  const r = new InMemoryTaskRepository();
  const ts = new TaskService(r);

  const t: Task = {
    id: "1",
    listId: "l1",
    title: "string",
    descripcion: null,
    status: "pending",
    priority: "low",
    tags: ["l1"],
    estimatedHours: null,
    dueDate: null,
    completedAt: null,
    createdAt: new Date(),
    updateAt: new Date(),
  };

  await ts.crear(t);

  const tareaObtenida = await ts.obtener("1");
  console.log("Tarea obtenida:", tareaObtenida);

  await ts.eliminar("1");

  try {
    const tareaEliminada = await ts.obtener("1");
    console.log(tareaEliminada);
  } catch (error) {
    console.error("Error esperado:", error);
  }
}

//ejecutar();

//Fin del ejercicio 7.

//Ejercicio 8 Asincronia.

function delay(ms: number) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms);
    });
};

async function obtenerListaSimulada(listId: string): Promise<boolean> {
    await delay(1000);
    return true;
}

async function obtenerTareasSimuladas(listId: string): Promise<boolean>{
    await delay(1000);
    return true;
}

async function compararRendimiento(listId: string) {
    console.log("EN SERIE");
    console.time("Tiempo en Serie");

    const listaSerie = await obtenerListaSimulada(listId);
    const tareasSerie = await obtenerTareasSimuladas(listId);

    console.timeEnd("Tiempo en Serie");


    console.log("\nEN PARALELO");
    console.time("Tiempo en Paralelo");

    const [listaParalelo, tareasParalelo] = await Promise.all([
        obtenerListaSimulada(listId),
        obtenerTareasSimuladas(listId),
    ]); 

    console.timeEnd("Tiempo en Paralelo");
}

// Ejecutar el ejercicio 8
//compararRendimiento("lista-1");
