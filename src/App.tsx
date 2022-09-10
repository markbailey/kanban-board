import { FormEvent, useState, DragEvent as ReactDragEvent } from 'react';

import db from './db.json';
import Column from './components/Column';
import Modal from './components/Modal';
import Card, { AddCard, DropCard } from './components/Card';
import CreateTicketForm from './components/CreateTicketForm';
import Filters from './components/Filters';
import gridCss from './assets/stylesheets/grid.module.css';

const DROPPABLE_COLUMNS: Record<string, string> = {
  backlog: 'to-do',
  'to-do': 'in-development',
  'in-development': 'completed'
};

function getFilteredTickets(filters: FilterState, tickets: TicketState[]) {
  const search = filters.search.trim();
  const tag = filters.tag.trim();
  const hasValue = (value: string) => value !== '';

  if (!hasValue(search) && !hasValue(tag)) return tickets;
  return tickets.filter((ticket) => {
    let keep = true;
    if (hasValue(search))
      keep =
        ticket.id.toLowerCase() === search.toLowerCase() ||
        ticket.title.toLowerCase().includes(search.toLowerCase()) ||
        ticket.description.toLowerCase().includes(search.toLowerCase());

    if (hasValue(tag)) keep = keep && ticket.tag === tag;
    return keep;
  });
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [tickets, setTickets] = useState<TicketState[]>(db.tickets);
  const [draggedTicketId, setDraggedTicketId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({ search: '', tag: '' });

  const filteredTickets = getFilteredTickets(filters, tickets);

  const isBacklog = (column: string) => column === 'backlog';

  const onCreateTicket = (_event: FormEvent, state: TicketState) => {
    setTickets((prev) => prev.concat(state as TicketState));
    setShowModal(false);
  };

  const onMoveTicket = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const targetColumn = event.currentTarget.dataset.column;
    const ticketIndex = tickets.findIndex((ticket) => ticket.id === draggedTicketId);
    if (ticketIndex === -1 || DROPPABLE_COLUMNS[tickets[ticketIndex].status] !== targetColumn)
      return;

    const newTickets = [...tickets];
    newTickets[ticketIndex].status = targetColumn;
    setTickets(newTickets);
  };

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <CreateTicketForm onSubmit={onCreateTicket} />
      </Modal>

      <h1>Kanban Board</h1>
      <Filters tags={db.tags} onChange={(state: FilterState) => setFilters(state)} />

      <div className={gridCss.grid}>
        {db.columns.map((name) => (
          <Column key={`column_${name}`} name={name}>
            {!isBacklog(name) && <DropCard onDrop={onMoveTicket} data-column={name} />}

            {filteredTickets
              .filter((card) => card.status === name)
              .map(({ status, ...rest }) => (
                <Card
                  key={rest.id}
                  {...rest}
                  onDragStart={() => setDraggedTicketId(rest.id)}
                  onDragEnd={() => setDraggedTicketId(null)}
                />
              ))}

            {isBacklog(name) && <AddCard onClick={() => setShowModal(true)} />}
          </Column>
        ))}
      </div>
    </>
  );
}

export default App;
