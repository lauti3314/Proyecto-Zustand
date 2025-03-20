import { FC, useEffect, useState } from "react";
import { tareaStore } from "../../../store/tareaStore";
import styles from "./Modal.module.css";
import { ITarea } from "../../../types/ITarea";

type IModal = {
  handleCloseModal: VoidFunction;
};

const initialState: ITarea = {
  titulo: "",
  descripcion: "",
  fechaLimite: "",
};

export const Modal: FC<IModal> = ({ handleCloseModal }) => {
  const tareaActiva = tareaStore((state) => state.tareaActiva);

  const [formValues, setFormValues] = useState<ITarea>(initialState);

  useEffect(() => {
    if (tareaActiva) setFormValues(tareaActiva);
  }, []);

  return (
    <div className={styles.containerPrincipalModal}>
      <div className={styles.contentPopUp}>
        <div>
          <h3>{tareaActiva ? "Editar Tarea" : "Crear Tarea"} </h3>
        </div>

        <form className={styles.formContent}>
          <div>
            <input
              placeholder="Ingrese un titulo"
              type="text"
              required
              value={formValues.titulo}
              autoComplete="off"
              name="titulo"
            />
            <textarea
              placeholder="Ingrese una descripción"
              required
              value={formValues.descripcion}
              name="descripcion"
            />
            <input
              type="date"
              value={formValues.fechaLimite}
              required
              autoComplete="off"
              name="fechaLimite"
            />
          </div>
          <div className={styles.buttonCard}>
            <button onClick={handleCloseModal}>Cancelar</button>
            <button type="submit">
              {tareaActiva ? "Editar Tarea" : "Crear Tarea"}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
