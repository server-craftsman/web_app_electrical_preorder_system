import { Pageable } from '../../models/api/interceptor/pageable.model';

export interface ResponseSuccessForList<T> {
  message: string;
  data: {
    content?: T;
    page?: Pageable;
    last?: boolean;
    totalPages?: number;
    totalElements?: number;
    size?: number;
    number?: number;
    first?: boolean;
    numberOfElements?: number;
    empty?: boolean;
    sort?: {
      sorted?: boolean;
      empty?: boolean;
      unsorted?: boolean;
    };
  };
}

export interface formatResponseSuccess<T> {
  message: string;
  data: T;
}

export interface ResponseUserManagerSuccess<T> {
  message: string;
  data: {
    users?: T;
    totalPages?: number;
    totalElements?: number;
    currentPage?: number;
    pageSize?: number;
  };
}
