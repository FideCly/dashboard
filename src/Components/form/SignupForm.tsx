import React, { useState, ChangeEvent } from "react";
import { UserService } from "../../Api/Services";
import User from "../../Api/Models/User";

const SignupForm : React.FC = () => {
  const initialUserState: User = {
    email: "",
    username: "",
  }
  const [user, setUser] = useState<User>(initialUserState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  const saveUser = () => {
    var data = {
      email: user.email,
      username: user.username,
    };

    UserService.createUser(data)
      .then((response : any) => {
        setUser({
          email: response.data.email,
          username: response.data.username,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e : Error )=> {
        console.log(e);
      });
  }

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  }

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={user.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupForm;

