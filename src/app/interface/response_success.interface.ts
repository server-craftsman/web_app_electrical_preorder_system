import { Pageable } from "../../models/api/interceptor/pageable.model";

export interface ResponseSuccess<T> {
  message: string;
  data: {
    content: T;
    pageable?: Pageable;
  };
}

