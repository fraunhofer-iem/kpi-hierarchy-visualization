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
  cytoscape: {
    canvas: cytoscape.Stylesheet[]
  }
}
