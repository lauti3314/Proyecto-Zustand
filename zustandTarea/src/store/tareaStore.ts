import { create } from "zustand";
import { ITarea } from "../types/ITarea";

interface ITareaStore {
  tareas: ITarea[];
  tareaActiva: ITarea | null;
  setTareaActiva: (tareaActiva: ITarea | null) => void;
  setArrayTareas: (arrayDeTareas: ITarea[]) => void;
  agregarNuevaTarea: (nuevaTarea: ITarea) => void;
  editarUnaTarea: (tareaActualizada: ITarea) => void;
  eliminarUnaTarea: (idTarea: string) => void;
}

export const tareaStore = create<ITareaStore>((set) => ({
  tareas: [],
  tareaActiva: null,

  //funciones modificadora para el array

  //agregar array de tareas

  setArrayTareas: (arrayDeTareas) => set(() => ({ tareas: arrayDeTareas })),

  //agregar una tarea al array

  agregarNuevaTarea: (nuevaTarea) =>
    set((state) => ({ tareas: [...state.tareas, nuevaTarea] })),

  //editar una tarea del array

  editarUnaTarea: (tareaEditada) =>
    set((state) => {
      const arregloTareas = state.tareas.map((tarea) =>
        tarea.id === tareaEditada.id ? { ...tarea, tareaEditada } : tarea
      );
      return { tareas: arregloTareas };
    }),

  //eliminar una tarea del array

  eliminarUnaTarea: (idTarea) =>
    set((state) => {
      const arregloTareas = state.tareas.filter(
        (tarea) => tarea.id !== idTarea
      );
      return { tareas: arregloTareas };
    }),

  //setear la tarea activa

  setTareaActiva: (tareaActivaIn) =>
    set(() => ({ tareaActiva: tareaActivaIn })),
}));
