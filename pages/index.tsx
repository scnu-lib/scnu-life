import Head from 'next/head'
import Image from 'next/image'
import { useLocalStorageState } from 'ahooks'
import { useEffect } from 'react'
import { getBgImg } from '../utils/bgImg'

export default function Home() {
  const [imageNumber, setImageNumber] = useLocalStorageState<number | undefined>('imageNumber', {
    defaultValue: 0,
  })
  const [imageArr, setimageArr] = useLocalStorageState<Array<number> | undefined>('imageArr', {
    defaultValue: [0],
  })

  useEffect((): void => {
    const getData = async (): Promise<void> => {
      const body = { imageArr }

      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then(res => res.json())
        .then((data) => {
          if (data.over) {
            setImageNumber(0)
            setimageArr([0])
            return
          }

          setImageNumber(data.randomNumber)
          setimageArr((prev: Array<number>) => [...prev, data.randomNumber])
        })
    }

    getData().catch((_error) => {})
  }, [])

  return (
    <div className={'h-screen w-screen overflow-hidden flex flex-col justify-between items-center relative select-none'}>
      <Head>
        <title>Life in SCNU</title>
        <link rel="icon" href="/scnu_logo.png" />
      </Head>

      <Image alt="background" src={getBgImg(imageNumber)} layout="fill" objectFit="cover" />
    </div>
  )
}
