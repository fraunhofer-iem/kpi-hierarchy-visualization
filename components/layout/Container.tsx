import { useUIContext } from "../../lib/hooks"
import styles from "../../styles/components/Container.module.scss"

interface Props {
  children?: React.ReactNode
}

export function Container(props: Props) {
  const { theme } = useUIContext()
  const css = theme.layout.container.css()

  return (
    <div className={styles.container} style={css}>
      {props.children}
    </div>
  )
}
