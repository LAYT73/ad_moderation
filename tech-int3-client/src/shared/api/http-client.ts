import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

import { HttpError } from '@/shared/errors';

import { EHttpMethod, type HttpMethodType, type IRequestOptions } from './http-types';
import instance from './instance';

type QueryPrimitive = string | number | boolean;
type QueryValue = QueryPrimitive | QueryPrimitive[];

export class HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.axiosInstance = axiosInstance ?? instance;
  }

  private getUrl(endpoint: string): string {
    if (!endpoint) throw new Error('Endpoint cannot be empty');
    return endpoint.replace(/^\/+/, '');
  }

  private async execute<
    TResp = unknown,
    TData = unknown,
    TParams extends Record<string, QueryValue> = Record<string, QueryValue>,
  >(method: HttpMethodType, url: string, options?: IRequestOptions<TData, TParams>): Promise<TResp> {
    const axiosConfig: AxiosRequestConfig = {
      method,
      url: this.getUrl(url),
      params: options?.params,
      data: options?.data,
      headers: options?.headers,
      signal: options?.signal,
      timeout: options?.timeout,
      onUploadProgress: options?.onUploadProgress,
      onDownloadProgress: options?.onDownloadProgress,
    };

    try {
      const res = await this.axiosInstance.request<TResp>(axiosConfig);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw HttpError.fromAxiosError(err);
      }
      throw err;
    }
  }

  private createMethod(method: HttpMethodType) {
    return <TResp = unknown, TData = unknown, TParams extends Record<string, QueryValue> = Record<string, QueryValue>>(
      url: string,
      options?: IRequestOptions<TData, TParams>,
    ) => this.execute<TResp, TData, TParams>(method, url, options);
  }

  /** GET */
  get = this.createMethod(EHttpMethod.GET);
  /** POST */
  post = this.createMethod(EHttpMethod.POST);
  /** PUT */
  put = this.createMethod(EHttpMethod.PUT);
  /** PATCH */
  patch = this.createMethod(EHttpMethod.PATCH);
  /** DELETE */
  delete = this.createMethod(EHttpMethod.DELETE);
}

export const httpClient = new HttpClient(instance);
