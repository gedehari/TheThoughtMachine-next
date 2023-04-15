import Head from "next/head"
import Router from "next/router"
import { useRef, useState } from "react"

import Alert from "@/components/alert"
import ThoughtForm from "@/components/thoughtForm"

import styles from "@/styles/post.module.css"
import utilStyles from "@/styles/util.module.css"

export default function NewPost() {
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState("")

  function onError(reason: string) {
    setError(reason)
  }

  function onSubmit(title: string, message: string) {
    setDisabled(true)
    setError("")

    fetch("/api/v1/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, message })
    })
      .then((value) => {
        if (value.ok) {
          Router.push("/")
        }
        else {
          console.log(value)
          value.json().then((value) => {
            setDisabled(false)
            setError(value.message)
          })
        }
      })
  }

  function back() {
    setDisabled(true)
    setError("")
    Router.push("/")
  }

  return (
    <>
      <Head>
        <title>New Post - The Thought Machine</title>
      </Head>
      <div className={utilStyles.contentDiv}>
        <footer>
          <h1 className={utilStyles.title}>Add Thought</h1>
        </footer>
        <main>
          <button className={utilStyles.button} disabled={disabled} onClick={back}>&larr; Back</button>
          <Alert type="error" visible={error ? true : false}>
            {`Error: ${error}`}
          </Alert>
          <ThoughtForm onError={onError} onSubmit={onSubmit} />
        </main>
      </div>
    </>
  )
}