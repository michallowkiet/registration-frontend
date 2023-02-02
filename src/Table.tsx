import { EventType } from "./types/eventType";
import React, { useEffect, useState } from "react";
import { getRequest } from "./API";

export const Table = () => {
  const [events, setEvents] = useState<Array<EventType>>([]);

  const getAllEvents = async (url: string) => {
    const data = await getRequest(url);
    setEvents(data);
  };

  useEffect(() => {
    getAllEvents("events");
  }, []);

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
            return (
              <tr key={event._id}>
                <td>{index + 1}</td>
                <td>{event.name}</td>
                <td>{event.city}</td>
                <td>{event.course}</td>
                <td>
                  <button>Usuń</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
