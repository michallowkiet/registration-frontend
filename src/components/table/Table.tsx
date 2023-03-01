import { TablePropsType } from "../../types/TablePropsType";
import style from "./Table.module.css";

export const Table = ({ events, deleteEvent }: TablePropsType) => {
  const deleteHandler = (id: string) => {
    deleteEvent(id);
  };

  if (events.length === 0) {
    return (
      <div className={style.container}>
        <span className={style.loader}></span>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h3>Zapisani uczestnicy</h3>
      <table className={style.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Imię i Nazwisko</th>
            <th>Szkolenie</th>
            <th>Miasto</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => {
            const { _id: eventId } = event;
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{event.name}</td>
                <td>{event.city}</td>
                <td>{event.course}</td>
                <td>
                  <button onClick={() => deleteHandler(eventId)}>Usuń</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
