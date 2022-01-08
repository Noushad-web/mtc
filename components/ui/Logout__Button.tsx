import { customerLogout } from '@lib/swell/storefront-data-hooks/src/api/operations-swell'
import React, { memo } from 'react'

const Logout__Button = ({
  className,
  children,
}: {
  className?: string
  children?: JSX.Element
}) => {
  const handleLogoutButton = () => {
    customerLogout()
  }

  return (
    <button onClick={handleLogoutButton} className={className}>
      {children}
    </button>
  )
}

export default memo(Logout__Button)
