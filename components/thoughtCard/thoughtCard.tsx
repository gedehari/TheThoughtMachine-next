import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import { ThoughtData } from "@/lib/thought";

import styles from "./thoughtCard.module.css"
import utilStyles from "@/styles/util.module.css"

export default function ThoughtCard({ thought }: { thought: ThoughtData }) {
  return (
    <div className={`${styles.thoughtCard} ${thought.fromOwner ? styles.thoughtFromOwner : ""}`} key={thought.id}>
      <h1 className={styles.thoughtTitle}>{thought.title}</h1>
      <h3 className={styles.thoughtDate}>{(thought.createdAt as Date).toLocaleString("en", { dateStyle: "full" })}</h3>
      <ReactMarkdown className={styles.thoughtContent}>
        {thought.content}
      </ReactMarkdown>
      <div className={`${utilStyles.buttonContainer} ${styles.cardButtonContainer}`}>
        <button className={utilStyles.button} >
          <i className="bi bi-pencil-fill" />
        </button>
        <button className={`${utilStyles.button} ${utilStyles.redButton}`} >
          <i className="bi bi-trash-fill" />
        </button>
      </div>
    </div>
  )
}