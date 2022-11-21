const BASE_URL = 'https://api.spacexdata.com/v4';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

function request<T>(url: string): Promise<T> {
  return wait(300)
    .then(() => fetch(BASE_URL + url))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
