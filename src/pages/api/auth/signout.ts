import { deleteCookie } from 'cookies-next';

export default function handler() {
  // delete the token cookie
  deleteCookie('token');
  // delete the userid from the local storage
  localStorage.removeItem('userid');
}
