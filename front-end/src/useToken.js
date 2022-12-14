import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    let userToken;
    const tokenString = sessionStorage.getItem('token');
    userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  return [token, saveToken]
}