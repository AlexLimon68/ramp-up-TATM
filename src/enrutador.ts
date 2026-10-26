import type { Task } from './tareas.js';
import type { ServerResponse } from "node:http";
import type { IncomingMessage } from "node:http";
import { createServer } from 'node:http';

class ValidationError extends Error {
    constructor(recurso: string) {
        super(`No es posible crear esta tarea: ${recurso}`);
        this.name = "ValidationError";
    }
}

class NotFoundError extends Error {
  constructor(recurso: string, id: string) {
    super(`${recurso} con id ${id} no existe`);
    this.name = "NotFoundError";
  }
}

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
    async save(task: Task): Promise<void> {
        this.tareas.set(task.id, task);
    }
    async delete(id: string): Promise<void> {
        this.tareas.delete(id);
    }
}

// Instanciamos el repositorio en memoria
const taskRepository = new InMemoryTaskRepository();

function analizarUrl(req: IncomingMessage) {
    const url = new URL(req.url ?? "/", "http://localhost");
    const partes = url.pathname.split("/").filter((p) => p !== "");
    return { partes, query: url.searchParams };
}

async function leerJson(req: IncomingMessage): Promise<unknown> {
    const pedazos: Buffer[] = [];
    for await (const pedazo of req) {
        pedazos.push(pedazo as Buffer);
    }
    const texto = Buffer.concat(pedazos).toString("utf-8");
    if (texto === "") return undefined;
    return JSON.parse(texto); // Si el JSON está mal escrito, lanza SyntaxError automáticamente
}

function responder(res: ServerResponse, status: number, cuerpo?: unknown): void {
    if (cuerpo === undefined) {
        res.writeHead(status).end();
        return;
    }
    // CORREGIDO: application/json con barra diagonal
    res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(cuerpo));
}

const port = process.env.PORT ?? 3000;

const servidor = createServer(async (req, res) => {
    try {
        const { partes, query } = analizarUrl(req);
        const metodo = req.method;

        // --- RUTA: GET /lists y POST /lists ---
        if (partes.length === 1 && partes[0] === "lists") {
            if (metodo === "GET") {
                // Obtenemos todas las tareas del repositorio en memoria
                const tareas = await taskRepository.findByList("default"); // O puedes listar todas si adaptas el repo
                return responder(res, 200, tareas);
            }
            
            if (metodo === "POST") {
                const cuerpo = await leerJson(req);
                
                // Validación básica de cuerpo inválido
                if (!cuerpo || typeof cuerpo !== "object" || !("id" in cuerpo)) {
                    throw new ValidationError("El cuerpo de la petición es inválido o falta el campo ID");
                }

                await taskRepository.save(cuerpo as Task);
                return responder(res, 201, cuerpo);
            }

            return responder(res, 405, { error: { code: "METHOD_NOT_ALLOWED", message: "Método no permitido" } });
        }

        console.log(partes);

        if (partes.length === 2 && partes[0] === "lists"){
            const id = partes[1];
            if (metodo === "GET"){
                const tareaExistente = await taskRepository.findById(id as string);
                if(!tareaExistente) {
                    throw new NotFoundError("Lista", id as string);
                }
                const tarea = await taskRepository.findById(id as string);
                
                return responder(res, 200, tarea);
            }

            if (metodo === "DELETE"){
                const tareaExistente = await taskRepository.findById(id as string);
                if (!tareaExistente) {
                    throw new NotFoundError("Lista", id as string);
                }

                await taskRepository.delete(id as string);
                return responder(res, 204);
            }

            return responder(res, 405, { error: { code: "METHOD_NOT_ALLOWED", message: "Método no permitido" } });
        }

        // --- RUTA NO ENCONTRADA ---
        return responder(res, 404, { error: { code: "NOT_FOUND", message: "Ruta no encontrada" } });

    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            return responder(res, 400, { error: { code: "VALIDATION_ERROR", message: error.message } });
        }
        if (error instanceof NotFoundError) {
            return responder(res, 404, { error: { code: "NOT_FOUND", message: error.message } });
        }
        if (error instanceof SyntaxError) {
            return responder(res, 400, { error: { code: "INVALID_JSON", message: "El cuerpo no es JSON válido" } });
        }
        
        console.error(error);
        return responder(res, 500, { error: { code: "INTERNAL_ERROR", message: "Error interno del servidor" } });
    }
});

servidor.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});