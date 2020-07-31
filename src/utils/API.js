const URL = `http://localhost:3001/`;

function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

const getSummary = async () => {
  try {
    return await client('summary');
  } catch (err) {
    return console.log(err);
  }
};

// const postForLH = async (body) => {
//   try {
//     return await client('lh', { body: { sites } });
//   } catch (err) {
//     console.log(err);
//   }
// };

export { client };
