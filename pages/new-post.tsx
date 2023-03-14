import Link from "next/link"
import Router from "next/router"
import { ReactNode, useEffect, useRef, useState } from "react"

import styles from "@/styles/new-post.module.css"
import utilStyles from "@/styles/util.module.css"
import { uploadThought } from "@/lib/thought"

export default function NewPost() {
  const [disabledState, setDisabledState] = useState(false)

  const titleInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  function post() {
    if (titleInputRef.current?.value && messageInputRef.current?.value) {
      setDisabledState(true)
      fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: titleInputRef.current?.value,
          message: messageInputRef.current?.value
        })
      })
      .then((value) => {
        if (value.ok) {
          Router.push("/")
        }
        else {
          setDisabledState(false)
        }
      })
    }
  }

  function back() {
    setDisabledState(true)
    Router.push("/")
  }

  return (
    <>
      <div className={utilStyles.contentDiv}>
        <footer>
          <h1 className={utilStyles.title}>Add Thought</h1>
        </footer>
        <main>
          <button className={utilStyles.button} disabled={disabledState} onClick={back}>&larr; Back</button>
          <form className={styles.newPostForm}>
            <div className={styles.formGroup}>
              <label>Title</label>
              <input ref={titleInputRef} type="text" disabled={disabledState} />
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <p>(Markdown is supported)</p>
              <textarea ref={messageInputRef} disabled={disabledState} />
            </div>
          </form>
          <button className={utilStyles.button} disabled={disabledState} onClick={post}>Post!</button>
        </main>
      </div>
    </>
  )
}