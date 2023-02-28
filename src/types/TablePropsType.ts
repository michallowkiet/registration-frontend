import { EventType } from "./eventType";

export interface TablePropsType {
  events: EventType[];
  deleteEvent: (id: string) => Promise<void>;
}
