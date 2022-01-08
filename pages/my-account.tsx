import React, { useEffect, useState } from 'react'
import { BuilderComponent } from '@builder.io/react'
import LoginForm from 'blocks/Forms/LoginForm'
import { Grid } from 'theme-ui'
import SignupForm from 'blocks/Forms/SignupForm'
import { getLoggedInUser } from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import { useRouter } from 'next/router';
import LoadingSpinner from '@components/ui/LoadingSpinner'
import Cookies from 'js-cookie'

const myAccount:React.FC = () => {
  const [loggedIn, setloggedIn] = useState(false)
  const router = useRouter();

  const getUser = async() => {
    await getLoggedInUser().then((data) => {
      // console.log(data);
      if (data) {
        setloggedIn(true)
        router.push('/', undefined, { shallow: true });
      } else {
        setloggedIn(false)
      }
    })
  }

  useEffect(() => {
    const user = Cookies.get('user')
    if (user) {
      setloggedIn(true)
      router.push('/', undefined, { shallow: true });
    }
    else {
      getUser()
    }
  }, [getLoggedInUser])

  return (
    <>
      {!loggedIn ? (
      <>
      <div className="form__wrapper">
        <Grid columns={2} className='form__container' sx={{marginLeft: 'auto', marginRight:'auto', marginTop: 120, marginBottom: 60}}>
          <LoginForm />
          <SignupForm />
          </Grid>
        </div>
      <BuilderComponent model="footer" /> 
      </>
      ) : (
        <LoadingSpinner />
      )}
    </>
   
  )
}

export default myAccount
