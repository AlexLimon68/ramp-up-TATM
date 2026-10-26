import type { ObjectId, Decimal128 } from "mongodb";
import type { Task, TaskStatus, TaskPriority } from "./tareas";

function sumarHoras (a: string, b: string): string {

    const val_a = Math.round(parseFloat(a) * 100);
    const val_b = Math.round(parseFloat(b) * 100);

    const resultado = ((val_a + val_b) / 100).toFixed(2);


    return resultado.toString();
}

console.log(sumarHoras("0.10", "0.20"));

interface TaskRow {
    id: string;
    list_id: string;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    estimated_hours: string | null;
    due_date: string | null;
    completed_at: Date | null;
    created_at: Date;
    update_at: Date;
}

function taskFromRow(row: TaskRow, tags: string[]): Task {
    return {
        id: row.id,
        listId: row.list_id,
        title: row.title,
        descripcion: row.description,
        status: row.status,
        priority: row.priority,
        tags: tags,
        estimatedHours: row.estimated_hours,
        dueDate: row.due_date === null ? null : new Date(`${row.due_date}T00:00:00Z`),
        completedAt: row.completed_at,
        createdAt: row.created_at,
        updateAt: row.update_at,
    };
}

interface TaskDocument {
    _id: ObjectId;
    listId: ObjectId;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    tags: string[];
    estimatedHours: Decimal128 | null;
    dueDate: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    updateAt: Date;
}

function taskFromDocument(doc: TaskDocument): Task{
    return {
        id: doc._id.toHexString(),
        listId: doc.listId.toHexString(),
        title: doc.title,
        descripcion: doc.description,
        status: doc.status,
        priority: doc.priority,
        tags: doc.tags,
        estimatedHours: doc.estimatedHours?.toString() ?? null,
        dueDate: doc.dueDate,
        completedAt: doc.completedAt,
        createdAt: doc.createdAt,
        updateAt: doc.updateAt,
    };
}