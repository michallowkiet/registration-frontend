import { useEffect, useState } from "react";
import { deleteRequest, getRequest } from "./API";
import "./App.css";
import { Form } from "./components/form/Form";
import { Table } from "./components/table/Table";
import { EventType } from "./types/eventType";

function App() {
  const [events, setEvents] = useState<Array<EventType>>([]);
  const [toggleMsg, setToggleMsg] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const getAllEvents = async () => {
    const data = await getRequest("events");
    setEvents(data);
  };

  const deleteEvent = async (id: string) => {
    const response = await deleteRequest(`events/${id}`);
    setMsg(response.msg);
    setToggleMsg(true);
  };

  useEffect(() => {
    getAllEvents();
  }, [msg]);

  return (
    <>
      {toggleMsg && (
        <div className="msg">
          <h5>{msg}</h5>
          <button onClick={() => setToggleMsg(false)}>x</button>
        </div>
      )}
      <Form getAllEvents={getAllEvents} />
      <Table events={events} deleteEvent={deleteEvent} />
    </>
  );
}

export default App;
