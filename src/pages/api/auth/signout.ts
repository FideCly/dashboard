import { deleteCookie } from 'cookies-next';

export default function handler() {
  // delete the token cookie
  deleteCookie('token');
  // delete the userUuid from the local storage
  localStorage.removeItem('userUuid');
}
