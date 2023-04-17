import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

import { getThoughts, ThoughtData } from "@/lib/thought"
import ThoughtList from "@/components/thoughtList"

import styles from "@/styles/index.module.css"
import utilStyles from "@/styles/util.module.css"

interface HomeProps {
  thoughts: Array<ThoughtData>
}

export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  return {
    props: {
      thoughts: JSON.parse(JSON.stringify(await getThoughts({})))
    }
  }
}

export default function Home({ thoughts }: HomeProps) {
  const [disabled, setDisabled] = useState(false)

  const [thoughtsData, setThoughtsData] = useState(
    thoughts.map((thought) => {
      thought.createdAt = new Date(thought.createdAt as string)
      return thought
    })
  )

  const router = useRouter();

  function refresh() {
    setDisabled(true)
    router.replace("/");
  }

  return (
    <>
      <Head>
        <title>The Thought Machine</title>
      </Head>
      <div className={utilStyles.contentDiv}>
        <footer>
          <h1 className={utilStyles.title}>The Thought Machine</h1>
        </footer>
        <main className={`${disabled ? utilStyles.disabled : ""}`}>
          <div className={`${utilStyles.buttonContainer} ${styles.indexButtonContainer}`}>
            <Link href="/post" className={`${utilStyles.button}`}>
              <i className="bi bi-pencil-square" />
            </Link>
            <button className={utilStyles.button} onClick={refresh}>
              <i className="bi bi-arrow-clockwise" />
            </button>
          </div>
          <ThoughtList thoughtsData={thoughtsData} />
        </main>
      </div>
    </>
  )
}
