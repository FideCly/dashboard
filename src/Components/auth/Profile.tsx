import { IUser } from "@/Api/Models/User";
import { UserService } from "@/Api/Services";
import { useEffect, useState } from "react";

export const Profile = () => {
    // get profile using get user by id using axios
    const [user, setUser] = useState<IUser>();
    
    useEffect(() => {
        // get user by id
        const loadUser = async (): Promise<void> => {
            try {
                const response = await UserService.getUserById('1');
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        }
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



