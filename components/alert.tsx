import { ReactNode} from "react";

import styles from "@/styles/alert.module.css"

interface AlertProps {
  children: ReactNode
  type: "normal" | "error"
  visible?: boolean
}

export default function Alert({ children, type, visible = true }: AlertProps) {
  return (
    <div
      style={{display: visible ? "block" : "none"}}
      className={`${styles.alert} ${styles["alert" + type.charAt(0).toUpperCase() + type.slice(1)]}`}
    >
      {children}
    </div>
  )
}
