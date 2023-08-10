import axios from 'axios';

export const API = {
  of: (category: string) => ({
    readList: async () => {
      if (category == null || category === '' || category === 'undefined') {
        return [];
      }
      const { data } = await get(`/api/gist/${category}/list`);
      return data.items;
    },
    readItem: (id: string) => {
      return get(`/api/gist/${category}/${id}`);
    },
    createItem: (contents: any) => {
      return post(`/api/gist/${category}/create`, { contents });
    },
    updateItem: (id:string, contents: any) => {
      return post(`/api/gist/${category}/${id}/modify`, { contents });
    },
    updateItems: (items: Array<{id: string; body:any}>) => {
      return post(`/api/gist/${category}/list/modify`, { items });
    },
    deleteItem: (id:string) => {
      return post(`/api/gist/${category}/${id}/delete`);
    },
  }),
  getList: async () => {
    const { data } = await get(`/api/gist/category`);
    return data;
  }
}

const BASE_URL = `https://app.divops.kr/github-api`;

async function get(url: string) {
  const { data } = await axios.get(`${BASE_URL}${url}`);

  return data;
}

async function post(url: string, body?: any) {
  const { data } = await axios.post(`${BASE_URL}${url}`, body, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return data;
}
