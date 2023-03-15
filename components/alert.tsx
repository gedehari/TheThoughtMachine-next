import { Component, ReactNode } from "react";

import styles from "@/styles/alert.module.css"

interface AlertProps {
  children: ReactNode
  type: "normal" | "error"
  visible?: boolean
}

interface AlertState {
  visible: boolean
}

export default class Alert extends Component<AlertProps, AlertState> {
  constructor(props: AlertProps) {
    super(props)
    this.state = {
      visible: props.visible != undefined ? props.visible : true
    }
  }

  // kinda annoying

  setVisible(visible: boolean) {
    this.setState({visible})
  }

  getVisible(): boolean {
    return this.state.visible
  }

  render() {
    
    
    return (
      <div
        style={{
          display: this.state.visible ? "block" : "none"
        }}
        className={`${styles.alert} ${styles["alert" + this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1)]}`}
      >
        {this.props.children}
      </div>
    )
  }
}
