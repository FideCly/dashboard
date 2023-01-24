import React, { useState, type ChangeEvent } from 'react'
import { UserService } from '../../Api/Services'
import type User from '../../Api/Models/User'

const SignupForm: React.FC = () => {
  const initialUserState: User = {
    email: '',
    username: ''
  }
  const [user, setUser] = useState<User>(initialUserState)
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  const saveUser = (): void => {
    const data = {
      email: user.email,
      username: user.username
    }

    UserService.createUser(data)
      .then((response: any) => {
        setUser({
          email: response.data.email,
          username: response.data.username
        })
        console.log(response.data)
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  return (
    <div className="submit-form">
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
    </div>
  )
}

export default SignupForm
