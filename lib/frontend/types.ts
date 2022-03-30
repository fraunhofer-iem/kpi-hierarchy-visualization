import cytoscapeDagre from "cytoscape-dagre"

export enum NodeTypes {
  COMPOUND = "COMPOUND",
  NODE = "NODE",
}
interface Hideable {
  hidden: boolean
}

interface Themeable {
  theme?: {
    dark?: {
      background?: string
      color?: string
      border?: string
    }
    light?: {
      background?: string
      color?: string
      border?: string
    }
  }
}
export interface Node extends Hideable, Themeable {
  id: string
  name: string
  shape?: string
  description: string
  hinge: boolean
}

export interface CompoundNode extends Hideable, Themeable {
  id: string
  name?: string
  layout?: cytoscape.LayoutOptions | cytoscapeDagre.DagreLayoutOptions
  children: Node[]
}

export interface Edge {
  source: string
  target: string
  directed?: boolean
  arrowShape?: string
  sourceLabel?: string
  label?: string
  targetLabel?: string
  straight?: boolean
  lineStyle?: string
  style?: { [key: string]: any }
}

export interface Hierarchy {
  layout: cytoscape.LayoutOptions | cytoscapeDagre.DagreLayoutOptions
  readme: string
  center?: string
  title: string
  nodes: (CompoundNode | Node)[]
  edges: Edge[]
}
