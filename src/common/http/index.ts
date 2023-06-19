interface IHttp {
  api: string;
  params?: Record<string, any>;
  method?: 'POST' | 'GET';
  body?: any;
}
export const http = async ({ api, params, method = 'GET', body }: IHttp) => {
  let response: Response;
  const uri = `${process.env.REACT_APP_DOMAIN}api/${api}`;

  if (method === 'GET') {
    const uriParams = params ? `?${new URLSearchParams(params)}` : '';
    response = await fetch(`${uri}${uriParams}`);
  } else {
    response = await fetch(uri, { method, body });
  }

  return response.json();
};
