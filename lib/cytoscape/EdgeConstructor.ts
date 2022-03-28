import { EdgeDataDefinition, ElementDefinition } from "cytoscape"

export const EdgeConstructor = (
  source: string,
  target: string,
  directed: boolean = true,
  additionalAttributes: Omit<
    EdgeDataDefinition,
    "id" | "source" | "target" | "directed"
  > & { arrowShape?: string; lineStyle?: string } = {},
  style: any = undefined,
): ElementDefinition => {
  const edge = {
    data: {
      id: `${source}-${target}`,
      source: source,
      target: target,
      directed: directed,
      ...additionalAttributes,
    },
  }
  if (style !== undefined) {
    edge["style"] = style
  }
  return edge
}
