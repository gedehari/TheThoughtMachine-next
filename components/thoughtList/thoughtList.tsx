import { ThoughtData } from "@/lib/thought"
import ThoughtCard from "../thoughtCard"

import styles from "./thoughtList.module.css"

export default function ThoughtList({ thoughtsData }: { thoughtsData: ThoughtData[] }) {
  return (
    <div className={styles.postList}>
      {
        thoughtsData.map((thought) => {
          return <ThoughtCard thought={thought} key={thought.id} />
        })
      }
    </div>
  )
}