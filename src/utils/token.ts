import { HttpException } from '../app/exceptions';
import { HTTP_STATUS } from '../app/enums';

export const decodeAccessToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new HttpException(
      'Failed to decode access token',
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
};
