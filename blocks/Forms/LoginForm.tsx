import React, { RefObject, useRef, useState } from 'react'
import { Field, useFormik } from 'formik'
import { Box, Checkbox, Label, Themed } from 'theme-ui'
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5'
import { customerLogin } from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

interface IValues {
  email: string
  password: string
  // rememberMe: boolean
}

const validate = (values: IValues) => {  
  const errors: any = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Password is Required'
  } else if (values.password.length < 8) {
    errors.password = 'At least 8 characters of password'
  }

  return errors
}

const LoginForm = () => {
  const passwordRef = useRef<HTMLInputElement>(null);
  // const checkboxRef = useRef<HTMLInputElement>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<{ error?: string }>({ error: '' });
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      // rememberMe: false
    },
    validate,
    onSubmit: (values, {setSubmitting, resetForm}) => {
      // values.rememberMe = checkboxRef.current?.checked ?? false;
      try {
        const login = async () => {
          await customerLogin(values).then((result) => {
            if (result && result.id) {
              const user = {
                'name': result.name,
                'email': result.email
              } 
              Cookies.set('user', JSON.stringify(user));
              router.push('/')
            } else {
              setMessage({ error: 'Email or password is incorrect.' })
            }
            resetForm();
            setSubmitting(false);
          });
        };
        login()
      } catch (err) {
        console.log(err)
      }
    },
  })  

  const handleEyesIcon = (e: React.MouseEvent<HTMLSpanElement>) => { 

    if(!(passwordRef.current)) return
    
    if(passwordRef.current.type === 'password') {
      passwordRef.current.type = 'text';
      setPasswordVisible(true);
    }else {
       passwordRef.current.type = 'password'       
       setPasswordVisible(false);
    }
  }

  const Password = () => {
    return (
      <div className="form__passwordGroup">
        <input
          id="loginPassword"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          className="form__inputGroup__input"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          ref={passwordRef}
        ></input>
        <span className="passwordIcon" onClick={handleEyesIcon}>
          {' '}
            {
              (passwordVisible) ? <IoEyeOffSharp/> : <IoEyeSharp/>
            }
          {' '}
        </span>
      </div>
    )
  }

  return (
    <form onSubmit={formik.handleSubmit} className="form form--login">
      <div className="form__group">
        <div className="form__group__content">
          <Themed.h3 className="form__group__content__heading form__group__content__heading--login">
            Log in.
          </Themed.h3>
          <p className="text-muted">
            Login with your data that you entered during registeration.
          </p>
        </div>

        <div className="form__inputGroup">
          <label
            htmlFor="email"
            className="form__inputGroup__label form__inputGroup__label--login"
          >
            Email <span className="required">*</span>
          </label>
          <input
            id="loginEmail"
            name="email"
            type="text"
            className="form__inputGroup__input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="form__error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form__inputGroup">
          <label
            htmlFor="password"
            className="form__inputGroup__label form__inputGroup__label--login"
          >
            Password <span className="required">*</span>
          </label>
          {Password()}
          {formik.touched.password && formik.errors.password ? (
            <div className="form__error">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* <Box>
          <Label>
            <Checkbox
              value="rembember me"
              ref={checkboxRef}
              id="rememberMe"
              name="remember_me"              
            />
            Remember Me
          </Label>
        </Box> */}
        
        {message && message.error ? (
          <div className="form__error">{message.error}</div>
        ) : null}

        <button type="submit" className="form__submit form__submit--login" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Please wait..." : "Submit"}
        </button>
      </div>
    </form>
  )
}

export default LoginForm
