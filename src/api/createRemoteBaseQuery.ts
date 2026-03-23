import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function createRemoteBaseQuery(standaloneUrl: string) {
  let _baseUrl = standaloneUrl;

  function setBaseUrl(url: string) {
    _baseUrl = url;
  }

  const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
      return fetchBaseQuery({
        baseUrl: _baseUrl,
        credentials: "include",
      })(args, api, extraOptions);
    };

  return { baseQuery, setBaseUrl };
}