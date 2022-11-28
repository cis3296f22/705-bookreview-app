import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    let userToken;
    const tokenString = sessionStorage.getItem('token');
    console.log(tokenString)
    userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
    // console.log(userToken)
  };

  return [token, saveToken]
}