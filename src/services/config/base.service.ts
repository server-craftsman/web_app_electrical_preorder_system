import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { ApiRequestModel } from '../../models/api/interceptor/api.req.model';
import { storage, upload } from '../../utils';
import { DOMAIN_API, ROUTER_URL } from '../../const';
import { store } from '../../app/redux/store';
import { toggleLoading } from '../../app/redux/loading.slice';
import { HTTP_STATUS } from '../../app/enums';
import { HttpException } from '../../app/exceptions';
import { helper } from '../../utils';

export const axiosInstance = axios.create({
  baseURL: DOMAIN_API,
  headers: {
    'content-type': 'application/json; charset=UTF-8',
  },
  timeout: 300000,
  timeoutErrorMessage: `Connection is timeout exceeded`,
});

export const BaseService = {
  get<T = any>({
    url,
    isLoading = true,
    payload,
    headers,
    toggleLoading,
  }: Partial<ApiRequestModel> & {
    toggleLoading?: (isLoading: boolean) => void;
  }): Promise<PromiseState<T>> {
    if (toggleLoading) store.dispatch(toggleLoading(isLoading) as any);
    return axiosInstance
      .get<T, PromiseState<T>>(`${url}`, {
        params: payload,
        headers: headers || {},
      })
      .finally(() => {
        if (toggleLoading) toggleLoading(false);
      });
  },
  post<T = any>({
    url,
    isLoading = true,
    payload,
    headers,
    toggleLoading,
  }: Partial<ApiRequestModel>): Promise<PromiseState<T>> {
    if (toggleLoading) store.dispatch(toggleLoading(isLoading) as any);
    return axiosInstance
      .post<T, PromiseState<T>>(`${url}`, payload, {
        headers: headers || {},
      })
      .finally(() => {
        if (toggleLoading) toggleLoading(false);
      });
  },
  put<T = any>({
    url,
    isLoading = true,
    payload,
    headers,
    toggleLoading,
  }: Partial<ApiRequestModel> & {
    toggleLoading?: (isLoading: boolean) => void;
  }): Promise<PromiseState<T>> {
    if (toggleLoading) store.dispatch(toggleLoading(isLoading) as any);
    return axiosInstance
      .put<T, PromiseState<T>>(`${url}`, payload, {
        headers: headers || {},
      })
      .finally(() => {
        if (toggleLoading) toggleLoading(false);
      });
  },
  remove<T = any>({
    url,
    isLoading = true,
    payload,
    headers,
    toggleLoading,
  }: Partial<ApiRequestModel> & {
    toggleLoading?: (isLoading: boolean) => void;
  }): Promise<PromiseState<T>> {
    if (toggleLoading) store.dispatch(toggleLoading(isLoading) as any);
    return axiosInstance
      .delete<T, PromiseState<T>>(`${url}`, {
        params: payload,
        headers: headers || {},
      })
      .finally(() => {
        if (toggleLoading) toggleLoading(false);
      });
  },
  getById<T = any>({
    url,
    isLoading = true,
    payload,
    headers,
    toggleLoading,
  }: Partial<ApiRequestModel> & {
    toggleLoading?: (isLoading: boolean) => void;
  }): Promise<PromiseState<T>> {
    if (toggleLoading) store.dispatch(toggleLoading(isLoading) as any);
    return axiosInstance
      .get<T, PromiseState<T>>(`${url}`, {
        params: payload,
        headers: headers || {},
      })
      .finally(() => {
        if (toggleLoading) toggleLoading(false);
      });
  },
  uploadFile: async (
    file: File,
    type: 'video' | 'image',
    isLoading: boolean = true
  ) => {
    if (isLoading) store.dispatch(toggleLoading(true) as any);

    try {
      const url = await upload.handleUploadFile(file, type);
      if (url) {
        helper.notificationMessage(`${type} uploaded successfully`);
        return url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      helper.notificationMessage(
        error instanceof Error ? error.message : 'Upload failed',
        'error'
      );
      return null;
    } finally {
      if (isLoading) store.dispatch(toggleLoading(false));
    }
  },
};

export interface PromiseState<T = unknown> extends AxiosResponse<T> {
  totalItem: number;
}

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    const userInfo = localStorage.getItem('userInfo');
    if (!config.headers) config.headers = {};
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      config.headers['User-Id'] = parsedUserInfo._id; // debug add user id
    }
    store.dispatch(toggleLoading(true)); // Show loading
    return config as InternalAxiosRequestConfig;
  },
  (err) => {
    setTimeout(() => store.dispatch(toggleLoading(false)), 2000); // Hide loading with delay
    return handleErrorByToast(err);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    store.dispatch(toggleLoading(false)); // Hide loading
    return Promise.resolve(config);
  },
  (err) => {
    setTimeout(() => store.dispatch(toggleLoading(false)), 2000); // Hide loading on error with delay
    const { response } = err;
    if (response) {
      switch (response.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          storage.clearLocalStorage();
          setTimeout(() => {
            window.location.href = ROUTER_URL.LOGIN;
          }, 3000);

          break;
        case HTTP_STATUS.FORBIDDEN:
          helper.notificationMessage(
            'Access denied. You do not have permission to perform this action.',
            'error'
          );
          storage.clearLocalStorage();
          setTimeout(() => {
            window.location.href = ROUTER_URL.LOGIN;
          }, 3000);

          break;
        case HTTP_STATUS.NOT_FOUND:
          helper.notificationMessage('Requested resource not found.', 'error');
          // setTimeout(() => {
          //   window.location.href = ROUTER_URL.LOGIN;
          // }, 2000);
          break;

        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          helper.notificationMessage(
            'Internal server error. Please try again later.',
            'error'
          );
          break;
        default:
          helper.notificationMessage(
            response.data?.message || 'An error occurred. Please try again.',
            'error'
          );
      }
    } else {
      helper.notificationMessage(
        err.message || 'An error occurred. Please try again.',
        'error'
      );
    }
    return Promise.reject(
      new HttpException(
        err.message,
        response?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR
      )
    );
  }
);

const handleErrorByToast = (error: any) => {
  const message = error.response?.data?.message || error.message;
  helper.notificationMessage(message, 'error');
  return Promise.reject(error);
};
