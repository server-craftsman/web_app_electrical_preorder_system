import { Pageable } from '../../models/api/interceptor/pageable.model';
import { CampaignResponseModel } from '../../models/api/response/campaign.res.model';
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

export interface ResponseProductDetailSuccess<T> {
  message: string;
  data: {
    product?: T;
    campaign?: CampaignResponseModel;
    totalPages?: number;
    totalElements?: number;
    currentPage?: number;
    pageSize?: number;
    sort?: {
      sorted?: boolean;
      empty?: boolean;
      unsorted?: boolean;
    };
    offset?: number;
    paged?: boolean;
    unpaged?: boolean;
    last?: boolean;
    size?: number;
    number?: number;
    numberOfElements?: number;
    first?: boolean;
    empty?: boolean;
  };
}
