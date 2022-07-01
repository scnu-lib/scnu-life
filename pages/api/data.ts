import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imageArr } = req.body
  let rand = Math.floor(Math.random() * 5)
  let flag = true

  if (imageArr.length === 5) {
    flag = false
  }
  else {
    while (imageArr.includes(rand))
      rand = Math.floor(Math.random() * 5)
  }

  return flag ? res.json({ randomNumber: rand }) : res.json({ over: true })
}
