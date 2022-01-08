const http = require('http')
import type { NextApiRequest, NextApiResponse } from 'next'

const requestOptions: any = {
  method: 'GET',
  redirect: 'follow',
}

const fetchData = async (uri: string) => {
  try {
    const data = await fetch(`${process.env.SWELL_SECRET_URL}${uri}`);
    return data
  } catch (error) {
    return error
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await fetchData('/products?limit=10&&fields=slug')
        .then((response: any) => response.json())
        .then((data) => res.send(data))
        .catch((error) => res.send(error))
    } catch (error) {
      return res.send('error')
    }
  }
}
