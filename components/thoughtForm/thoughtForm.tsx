import Alert from "@/components/alert"

import utilStyles from "@/styles/util.module.css"

interface ThoughtFormProps {
  onError: (reason: string) => void
  onSubmit: (title: string, message: string) => void
  disabled?: boolean
}

export default function ThoughtForm({ onError, onSubmit, disabled = false }: ThoughtFormProps) {
  let titleInput: HTMLInputElement | null
  let messageInput: HTMLTextAreaElement | null

  function onPostButtonClicked() {
    if (!titleInput?.value) {
      onError("Title is empty!")
      return
    }

    if (!messageInput?.value) {
      onError("Message is empty!")
      return
    }

    if (titleInput?.value && messageInput?.value)
      onSubmit(titleInput?.value, messageInput?.value)
  }

  return (
    <>
      <form className={utilStyles.form}>
        <div className={utilStyles.formGroup}>
          <label>Title</label>
          <input ref={node => titleInput = node} type="text" disabled={disabled} />
        </div>
        <div className={utilStyles.formGroup}>
          <label>Message</label>
          <p>(Markdown is supported)</p>
          <textarea ref={node => messageInput = node} disabled={disabled} />
        </div>
        <button type="button" className={utilStyles.button} disabled={disabled} onClick={onPostButtonClicked}>Post!</button>
      </form>
    </>
  )
}