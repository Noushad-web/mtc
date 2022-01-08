import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { Box, Checkbox, Label, Themed } from 'theme-ui'
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5'
import { customerSignup } from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

interface IValues {
  first_name: string
  last_name: string
  email: string
  password: string
  email_optin: boolean
}
interface IValues {
  first_name: string
  last_name: string
  email: string
  password: string
  email_optin: boolean
}

const validate = (values: IValues) => {  
  const errors: any = {}

  if (!values.first_name) {
    errors.first_name = 'First name is required'
  } else if (values.first_name.length > 15) {
    errors.first_name = 'Must be 15 characters or less'
  }

  if (!values.email) {
    errors.email = 'Email is required'
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

const SignupForm = () => {
  const passwordRef = useRef<HTMLInputElement>(null)
  const checkboxRef = useRef<HTMLInputElement>(null)
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [message, setMessage] = useState<{error?: string}>({error: ''});
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      email_optin: false,
    },
    validate,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      values.email_optin = checkboxRef.current?.checked ?? false      
      setSubmitting(true);
      
      try {
        const signup = async () => {
          await customerSignup(values).then((result) => {
            // console.log(result);
            if(result.email.message) {
              setMessage({error:'Email already exists.'})
            } 
            if(result.id) {
              const user = { 
                'name': result.name,
                'email': result.email,
              }
              Cookies.set('user', JSON.stringify(user));
              router.push('/')
            }
            resetForm();
            setSubmitting(false);
          });
        };
        signup()
      } catch (err) {
        console.log(err)
        setSubmitting(false);
      }
    },
  })

  const handleEyesIcon = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!passwordRef.current) return

    if (passwordRef.current.type === 'password') {
      passwordRef.current.type = 'text'
      setPasswordVisible(true)
    } else {
      passwordRef.current.type = 'password'
      setPasswordVisible(false)
    }
  }

  const Password = () => {
    return (
      <div className="form__passwordGroup">
        <input
          id="password"
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
          {passwordVisible ? <IoEyeOffSharp /> : <IoEyeSharp />}{' '}
        </span>
      </div>
    )
  }

  return (
    <form action='/' onSubmit={formik.handleSubmit} className="form form--signup">
      <div className="form__group">
        <div className="form__group__content">
          <Themed.h3 className="form__group__content__heading form__group__content__heading--signup">
            Register.
          </Themed.h3>
        </div>

        <div className="form__inputGroup form__inputGroup--fullName">
          <div className="name__wrapper name__wrapper--firstName">
            <label
              htmlFor="firstName"
              className="form__inputGroup__label form__inputGroup__label--signup"
            >
              First Name <span className="required">*</span>
            </label>
            <input
              id="firstName"
              name="first_name"
              type="text"
              className="form__inputGroup__input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div className="form__error">{formik.errors.first_name}</div>
            ) : null}
          </div>

          <div className="name__wrapper name__wrapper--lastName">
            <label
              htmlFor="lastName"
              className="form__inputGroup__label form__inputGroup__label--signup"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="last_name"
              type="text"
              className="form__inputGroup__input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
            />
          </div>
        </div>

        <div className="form__inputGroup">
          <label
            htmlFor="email"
            className="form__inputGroup__label form__inputGroup__label--signup"
          >
            Email address<span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
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
            className="form__inputGroup__label form__inputGroup__label--signup"
          >
            Password <span className="required">*</span>
          </label>
          {Password()}
          {formik.touched.password && formik.errors.password ? (
            <div className="form__error">{formik.errors.password}</div>
          ) : null}
        </div>

        <div>
          <Box>
            <Label>
              <Checkbox
                value="rembember me"
                ref={checkboxRef}
                id="checkbox"
                name="email_optin"
                className="checkbox--signup"
              />
              <small className="text-light">
                Subscribe to our newsletter for exclusive sales and new product
                announcements
              </small>
            </Label>
          </Box>
          <p className="text-light">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our privacy policy.
          </p>
        </div>
        {message && message.error ? (
          <div className="form__error">{message.error}</div>
        ) : null}
        
        <button type="submit" className="form__submit form__submit--signup " disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Please wait..." : "Register"}
        </button>
      </div>
    </form>
  )
}

export default SignupForm
