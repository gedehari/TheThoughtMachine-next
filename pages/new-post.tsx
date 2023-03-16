import Link from "next/link"
import Router from "next/router"
import { ReactNode, useEffect, useRef, useState } from "react"

import styles from "@/styles/new-post.module.css"
import utilStyles from "@/styles/util.module.css"
import Alert from "@/components/alert"

export default function NewPost() {
  const [state, setState] = useState<{
    disabled?: boolean,
    error?: string
  }>({
    disabled: false,
    error: ""
  })

  const titleInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  const alertRef = useRef<Alert>(null)

  function post() {
    if (!titleInputRef.current?.value) {
      setState({ disabled: false, error: "Title is empty!" })
      alertRef.current?.setVisible(true)
    }
    else if (!messageInputRef.current?.value) {
      setState({ disabled: false, error: "Message is empty!" })
      alertRef.current?.setVisible(true)
    }

    if (titleInputRef.current?.value && messageInputRef.current?.value) {
      setState({ disabled: true })
      alertRef.current?.setVisible(false)

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
            console.log(value)
            value.json().then((value) => {
              setState({ disabled: false, error: value.error })
              alertRef.current?.setVisible(true)
            })
          }
        })
    }
  }

  function back() {
    setState({ disabled: true })
    alertRef.current?.setVisible(false)
    Router.push("/")
  }

  return (
    <>
      <div className={utilStyles.contentDiv}>
        <footer>
          <h1 className={utilStyles.title}>Add Thought</h1>
        </footer>
        <main>
          <button className={utilStyles.button} disabled={state.disabled} onClick={back}>&larr; Back</button>
          <Alert type="error" visible={false} ref={alertRef}>
            {`Error: ${state.error}`}
          </Alert>
          <form className={utilStyles.form}>
            <div className={utilStyles.formGroup}>
              <label>Title</label>
              <input ref={titleInputRef} type="text" disabled={state.disabled} />
            </div>
            <div className={utilStyles.formGroup}>
              <label>Message</label>
              <p>(Markdown is supported)</p>
              <textarea ref={messageInputRef} disabled={state.disabled} />
            </div>
          </form>
          <button className={utilStyles.button} disabled={state.disabled} onClick={post}>Post!</button>
        </main>
      </div>
    </>
  )
}