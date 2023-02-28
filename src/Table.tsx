import { TablePropsType } from "./types/TablePropsType";

export const Table = ({ events, deleteEvent }: TablePropsType) => {
  const deleteHandler = (id: string) => {
    deleteEvent(id);
  };

  return (
    <div>
      <h3>Zapisani uczestnicy szkoleń</h3>
      <table>
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
