import { BaseService } from '../config/base.service';
import { API_PATH, DOMAIN_API } from '../../const';
import { ResponseSuccessForList } from '../../app/interface/response_success.interface';
import { CreateCategoryResponseModel, GetAllProductResponseModel } from '../../models/api/response/product.res.model';
import { CreateProductRequestModel } from '../../models/api/request/product.req.model';
import {  storage } from '../../utils';
import axios from 'axios';

const API_URL = `${DOMAIN_API}/products`;

export const ProductService = {
  getAll(params: any) {
    return BaseService.get<ResponseSuccessForList<GetAllProductResponseModel>>({
      url: API_PATH.PRODUCT.GET_ALL,
      payload: params,
    });
  },

  create: async (productData: CreateProductRequestModel, files: File[]): Promise<CreateCategoryResponseModel> => {
    const formData = new FormData();

    // Chuyển dữ liệu sản phẩm thành JSON và thêm vào FormData
    formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));

    // Thêm các file ảnh vào FormData
    files.forEach((file) => {
      formData.append("imageFiles", file);
    });

    const token = storage.getToken();
    if (!token) {
      throw new Error("Unauthorized: Token is missing.");
    }

    try {
      const response = await axios.post<CreateCategoryResponseModel>(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Create Product Error:", error.response?.data || error.message);
      throw error;
    }
  },
};
