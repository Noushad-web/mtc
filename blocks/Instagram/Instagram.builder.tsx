import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'

const Instagram = dynamic(async () => {
  return (await import('./Instagram')).default
})
Builder.registerComponent(Instagram, {
  name: 'Instagram grid',
  image:
    'https://cdn-icons.flaticon.com/png/512/5948/premium/5948714.png?token=exp=1641195856~hmac=b0781bf96b828566597f749079186e9e',
})
