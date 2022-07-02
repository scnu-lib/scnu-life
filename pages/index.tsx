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

      <header className="h-14 lg:h-16 w-screen fixed top-0 bg-[#00000033] border-[#00000033] shadow-lg backdrop-blur-xl">
        <div className="h-14 lg:h-16 flex justify-between items-center px-4 py-1 text-gray-100 ">
          <div className="font-sans text-xl">Life In SCNU</div>
          <div className="flex gap-3 text-2xl">
            <a href="https://github.com/scnu-lib/scnu-life" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                />
              </svg>
            </a>
            <button onClick={() => {
              navigator.clipboard.writeText(window.location.href)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7Z" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}
