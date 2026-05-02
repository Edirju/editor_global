
import Dexie, { type EntityTable } from "dexie";

interface Note {
  id: string;
  content: string;
  updatedAt: number;
}

const db = new Dexie("ObsidianCloneDB") as Dexie & {
  notes: EntityTable<Note, "id">;
};

// Definimos el esquema: id es la llave primaria
db.version(1).stores({
  notes: "id, updatedAt",
});

export { db };
export type { Note };
