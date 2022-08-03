
export const getToken = () => {
  const { token } = JSON.parse(sessionStorage?.getItem('auth')) || '';

  const auth = token?.auth;

  return {
    token,
    auth
  };
}