import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

import { getThoughts, Thought } from "@/lib/thought"

import styles from "@/styles/index.module.css"
import utilStyles from "@/styles/util.module.css"

interface HomeProps {
  thoughts: Array<Thought>
}

export async function getServerSideProps() {
  return {
    props: {
      thoughts: JSON.parse(JSON.stringify(await getThoughts({})))
    }
  }
}

export default function Home({ thoughts }: HomeProps) {
  thoughts.map((thought) => {
    thought.createdAt = new Date(thought.createdAt as string)
  })

  const [thoughtsState, setThoughtsState] = useState(new Array<Thought>())

  useEffect(() => {
    setThoughtsState(thoughts)
  })

  const router = useRouter();
  function refresh() {
    router.replace(router.asPath);
  }

  return (
    <>
      <div className={utilStyles.contentDiv}>
        <footer>
          <h1 className={utilStyles.title}>The Thought Machine</h1>
        </footer>
        <main>
          <div className={styles.buttonContainer}>
            <Link href="/new-post" className={`${utilStyles.button}`}>
              <i className="bi bi-pencil-square" />
            </Link>
            <button className={utilStyles.button} onClick={refresh}>
              <i className="bi bi-arrow-clockwise" />
            </button>
          </div>
          <div className={styles.postList}>
            {
              thoughtsState.map((thought) => {
                return (
                  <div className={`${styles.postRow} ${thought.fromOwner ? styles.postFromOwner : ""}`} key={thought.id}>
                    <h1 className={styles.postTitle}>{thought.title}</h1>
                    <h3 className={styles.postDate}>{(thought.createdAt as Date).toLocaleString("en", { dateStyle: "full" })}</h3>
                    <ReactMarkdown className={styles.postContent}>
                      {thought.content}
                    </ReactMarkdown>
                  </div>
                )
              })
            }
          </div>
        </main>
      </div>
    </>
  )
}
