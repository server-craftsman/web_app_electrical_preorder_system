import { BaseService } from "../config/base.service";
import { API_PATH } from "../../const";
import { ResponseSuccess } from "../../app/interface/response_success.interface";
import { GetAllCategoryResponseModel } from "../../models/api/response/product.res.model";

export const ProductService = {
  getAll(params: any) {
    return BaseService.get<ResponseSuccess<GetAllCategoryResponseModel>>({
      url: API_PATH.PRODUCT.GET_ALL,
      payload: params
    });
  },
};


