import { Pageable } from "../../models/api/interceptor/pageable.model";

export interface ResponseSuccessForList<T> {
  message: string;
  data: {
    content: T;
    pageable?: Pageable;
  };
}

export interface formatResponseSuccess<T> {
  message: string;
  data: T;
}
