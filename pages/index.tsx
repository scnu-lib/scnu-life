import Head from 'next/head'

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Head>
        <title>Life in SCNU</title>
        <link rel="icon" href="/scnu_logo.png" />
      </Head>

      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  )
}

