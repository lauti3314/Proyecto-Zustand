import { tareaStore } from "../../../store/tareaStore";
import styles from "./ListTareas.module.css";
import { useEffect, useState } from "react";
import { getAllTareas } from "../../../http/tarea";
import { CardList } from "../CardList/CardList";
import { Modal } from "../Modal/Modal";
import { ITarea } from "../../../types/ITarea";

export const ListTareas = () => {
  const tareas = tareaStore((state) => state.tareas);
  const setArrayTareas = tareaStore((state) => state.setArrayTareas);

  const setTareaActiva = tareaStore((state) => state.setTareaActiva);

  const getTareas = async () => {
    const data = await getAllTareas();
    if (data) setArrayTareas(data);
  };

  useEffect(() => {
    getTareas();
  }, []);

  const [openModalTarea, setOpenModalTarea] = useState(false);

  const handleOpenModalEdit = (tarea: ITarea) => {
    setTareaActiva(tarea);
    setOpenModalTarea(true);
  };

  const handleCloseModal = () => {
    setOpenModalTarea(false);
  };

  return (
    <>
      <div className={styles.containerPrincipalListTareas}>
        <div className={styles.containerTitleAndButton}>
          <h2>Lista de tareas</h2>
          <button
            onClick={() => {
              setOpenModalTarea(true);
            }}
          >
            Agregar tarea
          </button>
        </div>

        <div className={styles.containerList}>
          {tareas.length > 0 ? (
            tareas.map((el) => (
              <CardList handleOpenModalEdit={handleOpenModalEdit} tarea={el} />
            ))
          ) : (
            <div>
              <h3>No hay tareas</h3>
            </div>
          )}
        </div>
      </div>
      {openModalTarea && <Modal handleCloseModal={handleCloseModal} />}
    </>
  );
};
