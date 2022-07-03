import Head from 'next/head'
import Image from 'next/image'
import { useLocalStorageState } from 'ahooks'
import { useEffect, useState } from 'react'
import { getBgImg } from '../utils/bgImg'
import { getSearchLogo } from '../utils/searchLogo'
import { webSites } from '../db/data'

const engineList = new Map([
  ['baidu', 'https://www.baidu.com/s?wd='],
  ['bing', 'https://cn.bing.com/search?q='],
  ['google', 'https://www.google.com/search?q='],
])

interface WebSite {
  name: string
  link: string
  description: string
}

interface WebSiteItem {
  title: string
  items: WebSite[]
}

export const getStaticProps = async () => {
  return {
    props: {
      webSites,
    },
  }
}

export default function Home(props: { webSites: WebSiteItem[] }) {
  const [imageNumber, setImageNumber] = useLocalStorageState<number | undefined>('imageNumber', {
    defaultValue: 0,
  })
  const [imageArr, setimageArr] = useLocalStorageState<Array<number> | undefined>('imageArr', {
    defaultValue: [0],
  })
  const [searchEngine, setSearchEngine] = useLocalStorageState<string | undefined>('searchEngine', {
    defaultValue: 'baidu',
  })
  const [searchText, setSearchText] = useState('')
  const webSites = props.webSites

  const search = () => {
    const url = engineList.get(searchEngine) + searchText
    window.open(url, '_self')
  }

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

    getData().catch((_error) => { })
  }, [])

  return (
    <div className="h-screen w-screen overflow-y-auto flex flex-col justify-between items-center select-none">
      <Head>
        <title>Life in SCNU</title>
        <link rel="icon" href="/scnu_logo.png" />
      </Head>

      <div className="h-screen w-screen fixed top-0 left-0 -z-10">
        <Image alt="background" src={getBgImg(imageNumber)} layout="fill" objectFit="cover" objectPosition="center" />
      </div>

      <header className="h-14 lg:h-16 w-screen fixed top-0 z-10 bg-[#00000033] border-[#00000033] shadow-lg backdrop-blur-xl">
        <div className="h-14 lg:h-16 flex justify-between items-center px-4 py-1 text-gray-100">
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

      <main className="w-full mt-12 pt-14 lg:pt-16 flex flex-col items-center relative z-0">
        <section className="basic-section gap-10">
          <Image alt="searchLogo" src={getSearchLogo(searchEngine)} width={210} height={76} className="cursor-pointer" onClick={() => {
            setSearchEngine((prev: string) => {
              if (prev === 'baidu')
                return 'bing'
              else if (prev === 'bing')
                return 'google'
              else
                return 'baidu'
            })
          }} />

          <div className="w-full flex gap-4 p-3 bg-white hover:bg-[#ffffff80] backdrop-blur-xl rounded">
            <input type="text" className="flex-grow bg-transparent outline-none placeholder-gray-600 hover:placeholder-gray-50" placeholder="Search" value={searchText} onChange={ev => setSearchText(ev.target.value)} onKeyPress={(ev) => {
              if (ev.key === 'Enter')
                search()
            }} />
            <button className="flex-none text-2xl text-gray-800 hover:text-blue-400" onClick={() => {
              search()
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392l.604.646l2.121-2.121l-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5s5 2.243 5 5s-2.243 5-5 5z" />
              </svg>
            </button>
          </div>

          <div className="flex gap-8 text-xl text-white">
            <button className="px-7 py-2 bg-[#00000033] rounded" onClick={() => {
              setSearchEngine('baidu')
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5.927 12.497c2.063-.443 1.782-2.909 1.72-3.448c-.101-.83-1.078-2.282-2.405-2.167c-1.67.15-1.913 2.561-1.913 2.561c-.226 1.115.54 3.497 2.598 3.054zm2.19 4.288c-.06.173-.195.616-.078 1.002c.23.866.982.905.982.905h1.08v-2.64H8.944c-.52.154-.77.559-.827.733zm1.638-8.422c1.14 0 2.06-1.312 2.06-2.933c0-1.62-.92-2.93-2.06-2.93c-1.137 0-2.06 1.31-2.06 2.93c0 1.621.923 2.933 2.06 2.933zm4.908.193c1.522.198 2.501-1.427 2.696-2.659c.199-1.23-.784-2.658-1.862-2.904c-1.08-.248-2.429 1.483-2.552 2.61c-.147 1.38.197 2.758 1.718 2.953zm0 3.448c-1.865-2.905-4.513-1.723-5.4-.245c-.881 1.477-2.256 2.41-2.451 2.658c-.198.244-2.846 1.673-2.258 4.284c.587 2.609 2.652 2.56 2.652 2.56s1.521.15 3.286-.246c1.766-.391 3.286.098 3.286.098s4.125 1.38 5.253-1.278c1.128-2.66-.637-4.038-.637-4.038s-2.356-1.823-3.732-3.793zm-6.008 7.75c-1.158-.231-1.619-1.021-1.677-1.156c-.057-.137-.386-.772-.212-1.853c.5-1.619 1.927-1.735 1.927-1.735h1.428v-1.755l1.215.02v6.479h-2.68zm4.59-.019c-1.196-.308-1.251-1.158-1.251-1.158v-3.412l1.251-.02v3.066c.077.328.483.387.483.387h1.271v-3.433h1.332v4.57h-3.086zm7.454-9.11c0-.59-.49-2.364-2.305-2.364c-1.819 0-2.062 1.675-2.062 2.859c0 1.13.095 2.707 2.354 2.657c2.26-.05 2.013-2.56 2.013-3.152z" />
              </svg>
            </button>
            <button className="px-7 py-2 bg-[#00000033] rounded" onClick={() => {
              setSearchEngine('bing')
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="currentColor" d="m5.71 3l3.593 1.264v12.645l5.061-2.919l-2.48-1.165l-1.566-3.897l7.974 2.802v4.073l-8.984 5.183l-3.595-2L5.71 3z" />
              </svg>
            </button>
            <button className="px-7 py-2 bg-[#00000033] rounded" onClick={() => {
              setSearchEngine('google')
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28a5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934a8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934c0-.528-.081-1.097-.202-1.625z" />
              </svg>
            </button>
          </div>
        </section>

        <section className="basic-section">
          {webSites.map((webSite: WebSiteItem) => {
            return (
              <details key={webSite.title}>
                <summary>{webSite.title}</summary>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 pb-4 px-4">
                  {webSite.items.map((item: WebSite) => {
                    return (
                      <div key={item.name} className="border-[0.5px] border-[#ffffffb3] p-4 lg:p-3 text-[#00000099] bg-[#ffffffb3]">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-sm font-light">{item.description}</div>
                      </div>
                    )
                  })}
                </div>
              </details>
            )
          })}
        </section>
      </main>
    </div>
  )
}
