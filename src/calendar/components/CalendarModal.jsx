import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore, useUsersStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '30px',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');


export const CalendarModal = () => {

  const {isDateModalOpen, closeDateModal} = useUiStore();
  const {activeEvent, startSavingEvent} = useCalendarStore();
  const {users, startLoadingUsers} = useUsersStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
    guestUsers: '',
  });


  const titleClass = useMemo(() => {

    if (!formSubmitted) return '';

    return (formValues.title.length > 0)
      ? ''
      : 'is-invalid';

  }, [formValues.title, formSubmitted]);


  useEffect(() => {
    startLoadingUsers();
  }, [isDateModalOpen]);


  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({...activeEvent});
    }
  }, [activeEvent]);

  const onInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  };


  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  };


  const onCloseModal = () => {
    closeDateModal();
  };


  const onSubmit = async(event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }

    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);

  };

  const [optionsSelected, setOptionsSelected] = useState([]);
  const [filter, setFilter] = useState('');

  const handleChange = ({target}) => {
    const optionSelected = Array.from(target.selectedOptions, (option) => option.value);
    setOptionsSelected(optionSelected);
    setFormValues({
      ...formValues,
      [target.name]: optionSelected
    })
  };

  const handleFilterChange = ({target}) => {
    setFilter(target.value);
  };

  const optionsFiltered = users.filter(
    option => option.name.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >

      <h1>Nuevo evento</h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

        <div className="form-group mb-2">
          <label style={{ width: "100%"}}>Fecha y hora inicio</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, 'start')}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label style={{ width: "100%"}}>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, 'end')}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label className='mb-2'>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass} mb-2`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted mt-3">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control my-2"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
        </div>

        <div className="form-group mb-4">
          <small id="guestUsers" className="form-text text-muted">Agregar usuarios al evento</small>
          <input
            type="text"
            className='form-control'
            placeholder="Buscar usuarios..."
            value={filter}
            onChange={handleFilterChange}
          />
          <select
            className="form-select my-2"
            multiple
            name="guestUsers"
            value={formValues.guestUsers}
            onChange={handleChange}
          >
            <option value="">Selecciona una opción</option>
            {
              optionsFiltered.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>
        </div>

        <div className='container d-flex flex-row-reverse'>
          <button
            type="submit"
            className="btn btn-outline-secondary btn-block"
          >
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </div>

      </form>

    </Modal>
  )
}
