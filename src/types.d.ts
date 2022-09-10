declare interface TicketState {
  id: string;
  tag: string;
  title: string;
  description: string;
  link: string;
  status: string;
}

declare interface FilterState {
  search: string;
  tag: string;
}
