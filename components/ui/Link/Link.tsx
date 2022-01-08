import NextLink, { LinkProps as NextLinkProps } from 'next/link'

const Link: React.FC<NextLinkProps> = ({ href, children, ...props }) => {
  return (
    <NextLink href={href}>
      <div {...props}>{children}</div>
    </NextLink>
  )
}

export default Link
