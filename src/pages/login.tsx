import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../styles/pages/Login'
import Input from '../components/Input/Input'
import LoginSVG from '../assets/login.svg'
import Header from '../components/Header'
import Head from 'next/head'
import Button from '../components/Button/Button'
import Link from 'next/link'
import RobotSVG from '../assets/robot.svg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import { postAuth, reducer as AuthReducer } from '../store/states/auth'
import { UserState } from '../models/User'
import { ApplicationState } from '../store'

export interface LoginProps {
  name?: string
}

interface LoginState {
  email: string
  password: string
  valid: boolean
}

const validationSchema = Yup.object({
  email: Yup.string().email().required('Invalid e-mail'),
  password: Yup.string().required('Password required')
})

const Login: React.FC<LoginProps> = ({ name }) => {
  const dispatch = useDispatch()
  const state = useSelector<ApplicationState, UserState>(state => state.user)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => submitForm(values),
    validationSchema,
    validateOnMount: true
  })

  const router = useRouter()

  const submitForm = async values => {
    dispatch(
      postAuth({
        email: values.email,
        password: values.password
      })
    )
    // await router.push('/dashboard')
  }

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header
        options={[
          { title: 'Home', link: '/' },
          { title: 'Register', link: '/register' }
        ]}
      />
      <Container primary={true}>
        <LoginSVG />
        <div className="loginPanel">
          <div className="loginPanelHeader">
            <RobotSVG />
            <p>Sign In</p>
          </div>
          <form action="" onSubmit={formik.handleSubmit} id="loginForm">
            {formik.touched.email && formik.errors.email ? (
              <p id="error">{formik.errors.email}</p>
            ) : formik.touched.password && formik.errors.password ? (
              <p id="error">{formik.errors.password}</p>
            ) : null}
            <div className="inputs">
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name={'email'}
                defaultValue={'E-mail'}
                type={'email'}
                value={formik.values.email}
                icon={'mail'}
              />
              <Input
                defaultValue={'Password'}
                onBlur={formik.handleBlur}
                name={'password'}
                type={'password'}
                icon={'vpn'}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <div className="buttons">
              <Button
                type="submit"
                isValid={
                  !(formik.errors.email || formik.errors.password) &&
                  !!(formik.values.email && formik.values.password)
                }
              >
                Login
              </Button>
            </div>
          </form>
          <div className="registerTip">
            <p>
              Don't have an account ?
              <Link href="/register">
                <a> Sign up</a>
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Login
