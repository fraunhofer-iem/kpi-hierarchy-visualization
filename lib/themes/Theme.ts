import { CSSProperties } from "../frontend"

export type Theme = {
  name: string
  layout: {
    container: CSSProperties
  }
  card: {
    card: CSSProperties
    title: CSSProperties
    subTitle: CSSProperties
    dismissal: CSSProperties
  }
  button: {
    neutral: CSSProperties
    "neutral:hover": CSSProperties
    anchor: CSSProperties
    "anchor:hover": CSSProperties
  }
  cytoscape: {
    canvas: cytoscape.Stylesheet[]
  }
}
