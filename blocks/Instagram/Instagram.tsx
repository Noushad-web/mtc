import React, { useEffect, useState } from 'react'
// import { Builder } from '@builder.io/react';

const Instagram = () => {

  const [stateInstagram, setStateInstagram] = useState()

    async function getInstagram(apiKey: string) {
    const response = await fetch(`https://cdn.builder.io/api/v1/instagram/media?apiKey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setStateInstagram(data);
      })
    }
    getInstagram('bpk-b8ef4f2f062b4e58a4ac5f6ba030b8e8');

    // useEffect(()=> {
    //   console.log('====================================');
    //   console.log('stateInstagram: ', stateInstagram);
    //   console.log('====================================');
    // }, [setStateInstagram])

  return (
    <div>
      Instagram
    </div>
  )
}

export default Instagram
