import { useEffect, useState } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo, FormRow, Alert } from '../components'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const { user } = useAppContext()
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { isLoading, showAlert, displayAlert, setUpUser } = useAppContext()

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!name && !isMember)) {
      displayAlert()
      return
    }
    const currentUser = { name, email, password }
    if (isMember) {
      setUpUser({
        currentUser: currentUser,
        endPoint: 'login',
        alertText: 'Login',
      })
    } else {
      setUpUser({
        currentUser: currentUser,
        endPoint: 'register',
        alertText: 'Registration',
      })
    }
  }
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 5000)
    }
  }, [user, navigate])
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3 className="text-3xl pb-4">
          {values.isMember ? 'Login' : 'Register'}
        </h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            values={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          values={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          values={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <button
          type="button"
          className="btn btn-block"
          disabled={isLoading}
          onClick={() => {
            setUpUser({
              currentUser: { email: 'test@gmail.com', password: 'password' },
              endPoint: 'login',
              alertText: 'Login',
            })
          }}
        >
          {isLoading ? 'Loading...' : 'demo app'}
        </button>
        <p>
          {!values.isMember ? 'Not a Member Yet? ' : 'Already a Member? '}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}
export default Register
