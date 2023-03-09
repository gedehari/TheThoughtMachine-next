import Head from "next/head"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"

import { getThoughts, Thought } from "@/lib/thought"

import styles from "@/styles/index.module.css"

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

  return (
    <>
      <div className={styles.contentDiv}>
        <footer>
          <h1 className={styles.titleTemp}>The Thought Machine</h1>
        </footer>
        <main>
          <div className={styles.postList}>
            {
              thoughts.map((thought) => {
                return (
                  <div className={`${styles.postRow} ${thought.fromOwner ? styles.postFromOwner : ""}`} key={thought.id}>
                    <h1 className={styles.postTitle}>{thought.title}</h1>
                    <h3 className={styles.postDate}>{(thought.createdAt as Date).toLocaleString()}</h3>
                    <p className={styles.postContent}>{thought.content}</p>
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
