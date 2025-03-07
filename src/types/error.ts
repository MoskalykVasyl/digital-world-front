export interface AxiosErrorWithMessage {
  response?: {
    data?: {
      message?: string;
    };
  };
}
