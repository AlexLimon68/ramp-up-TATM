import { readFile } from "node:fs/promises";

const contenido = await readFile("notas.txt", "utf-8");
console.log(contenido);