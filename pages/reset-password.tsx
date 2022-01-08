import React, { FC, useState } from 'react'

interface resetInterface {
  newPassword: string
  confirmPassword: string
}

const ResetPassword: FC = () => {
  const [state, setState] = useState<resetInterface>({
    newPassword: '',
    confirmPassword: '',
  })

  function handleChange(e: any) {
    if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] })
    } else {
      setState({ ...state, [e.target.name]: e.target.value })
    }
  }

  async function handleResetPassword__submit(e: any) {
    e.preventDefault()
    // console.log(e)
  }

  return (
    <div
      style={{
        minHeight: '50vh',
        display: 'grid',
        placeItems: 'center',
        background: 'lightblue',
      }}
    >
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword__submit}>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={handleChange}
          value={state.newPassword}
          style={{ border: '1px solid black' }}
        />
        <br />
        <input
          name="confirm-password"
          type="password"
          onChange={handleChange}
          placeholder="confirm password"
          style={{ border: '1px solid black' }}
        />

        <br />
        <button type="submit" style={{ border: '1px solid red' }}>
          submit
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
