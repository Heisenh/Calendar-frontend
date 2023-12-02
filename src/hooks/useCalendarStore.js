import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onLoadEventsByUser, onSetActiveEvent, onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const {events, activeEvent} = useSelector(state=> state.calendar);
  const {user} = useSelector(state=> state.auth);


  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };


  const startSavingEvent = async(calendarEvent) => {
    // return console.log('calendarEvent :>> ', calendarEvent);
    try {

      // Updatig
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({...calendarEvent, user}));
        return;
      }

      // Creating
      const {data} = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user}));

    } catch (error) {
      Swal.fire('Error al guardar', error.response.data?.msg, 'error');
    }

  };


  const startDeletingEvent = async() => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
    }
  };


  const startLoadingEvents = async() => {
    try {
      const {data} = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log('error cargando eventos:> ', error);
    }
  };


  const startLoadingEventsByUser = async() => {
    try {
      const {data} = await calendarApi.get('/events/getEventsByUser');
      const events = convertEventsToDateEvents(data.events);
      dispatch(onLoadEventsByUser(events));
    } catch (error) {
      console.log(error);
    }
  };


  return {
    //* Properties
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,
    //* Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startLoadingEventsByUser,
    startSavingEvent,
  }
  
}
