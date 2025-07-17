export interface Paginator {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface ResponsePaginator {
  count: number,
  current_page: number,
  current_page_url: string,
  first_item: number,
  from: number,
  get_page_name: string,
  items: any,
  last_page: number,
  next_page_url: string,
  on_first_page: true
  path: string,
  per_page: number,
  previous_page_url: null
  to: number,
  total: number,
}