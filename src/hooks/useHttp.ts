import axios from 'axios';
import constante from 'constate';
import { useState } from 'react';

export const [HttpProvider, useHttp] = constante(() => {
  const [http] = useState(() =>
    axios.create({
      baseURL: '/api',
      headers: {
        'Content-Types': 'application/json'
      }
    })
  );

  return http;
});

export default useHttp;
