import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

  const {openDateModal, isDateModalOpen} = useUiStore();
  const {setActiveEvent} = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafafa',
      user: {
        _id: '123',
        name: 'Heisen'
      }
    });

    openDateModal();
  };


  return (
    <button
      className="btn fab"
      style={{
        backgroundColor: '#a370f7',
        display: isDateModalOpen ? 'none' : ''
      }}
      onClick={handleClickNew}
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
