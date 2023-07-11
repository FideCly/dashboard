import { IUser } from '@/Models/User';

import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const Profile = () => {
  // get profile using get user by id using axios
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const loadUser = async () => {
      const session = await getSession();
      const endpoint = `/api/user/${session.user?.email}`;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await fetch(endpoint, options);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadUser();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p>{user?.username}</p>
      <p>{user?.email}</p>
    </div>
  );
};
