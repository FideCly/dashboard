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
    <form method="post">
      <div className="form-control">
        <h1 className="mb-3 h3 font-weight-normal">Please sign in</h1>
        <label htmlFor="username" className="label">Username</label>
        <input className="input input-bordered form-control" type="text" value={user.username} name="mail" id="username" autoComplete="username" required autoFocus onChange={handleInputChange} />
        <label htmlFor="email" className="label">Email</label>
        <input className="input input-bordered form-control" type="email" name="email" id="email" autoComplete="current-password" required onChange={handleInputChange} />
        <label className="label"><a href="" className="label-text-alt link link-hover">Forgot password?</a></label>
        <button className="btn btn-primary" type="submit" onClick={saveUser}>Sign in</button>
      </div>
    </form>
  )
}

export default SignupForm
