import { CSSProperties } from "../frontend"

export type Theme = {
  name: string
  layout: {
    container: CSSProperties
  }
  cytoscape: {
    canvas: cytoscape.Stylesheet[]
  }
}
