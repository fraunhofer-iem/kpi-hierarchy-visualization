import { ElementDefinition, NodeDataDefinition } from "cytoscape"

export const Node = (params: {
  id: string | number
  label?: string
  kind?: string
  additionalAttributes?: Omit<
    NodeDataDefinition,
    "id" | "label" | "kind" | "entity"
  >
}): ElementDefinition => {
  const { id, label, kind, additionalAttributes } = params
  const node: ElementDefinition = {
    data: {
      id: `${id}`,
      label: `${label}`,
      kind: `${kind}`,
      entity: `${id}`,
      ...additionalAttributes,
    },
  }
  return node
}
