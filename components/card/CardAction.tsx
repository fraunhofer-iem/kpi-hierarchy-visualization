import { useUIContext } from "../../lib/hooks"
import styles from "../../styles/components/Card.module.scss"
import { Button } from "../action"

interface Props {
  action?: () => void
  dismiss?: () => void
}

export function CardControls(props: Props) {
  const { theme } = useUIContext()
  return (
    <div className={styles.cardControls} style={theme.card.dismissal.css()}>
      {props.action && (
        <Button type="button" context={"neutral"} action={() => props.action()}>
          &#9473;
        </Button>
      )}
      {props.dismiss && (
        <div style={{ float: "right" }}>
          <Button
            type="button"
            context={"neutral"}
            action={() => props.dismiss()}
          >
            &times;
          </Button>
        </div>
      )}
    </div>
  )
}
