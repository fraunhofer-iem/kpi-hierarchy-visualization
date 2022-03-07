export const register = function (cytoscape: any) {
  if (!cytoscape) {
    return
  } // can't register if cytoscape unspecified

  cytoscape("core", "labelPositioning", function (this: cytoscape.Core) {
    this.on("position", "node", (event) => {
      event.target.forEach((node: cytoscape.NodeSingular) => {
        node.connectedEdges("edge").forEach((edge: cytoscape.EdgeSingular) => {
          repositionLabels(
            edge,
            edge.sourceEndpoint(),
            edge.source().boundingBox({}),
            "source",
          )
          repositionLabels(
            edge,
            edge.targetEndpoint(),
            edge.target().boundingBox({}),
            "target",
          )
        })
      })
    })
    this.nodes().emit("position")
  })
}

const CHARACTER_WIDTH = 5
const CHARACTER_HEIGHT = 7

function repositionLabels(
  edge: cytoscape.EdgeSingular,
  anchor: cytoscape.Position,
  reference: cytoscape.BoundingBox12 & cytoscape.BoundingBoxWH,
  direction: "source" | "target",
) {
  if (!edge.data(`${direction}Label`)) {
    return
  }
  const horizontalMid = reference.x1 + reference.w / 2
  const verticalMid = reference.y1 + reference.h / 2
  let labelWidth = CHARACTER_WIDTH * edge.data(`${direction}Label`).length
  if (labelWidth == CHARACTER_WIDTH) {
    labelWidth += CHARACTER_WIDTH
  }

  if (anchor.x < horizontalMid) {
    if (edge.style(`${direction}-text-margin-x`) !== `-${labelWidth}px`) {
      edge.style(`${direction}-text-margin-x`, `-${labelWidth}px`)
    }
  }
  if (anchor.x >= horizontalMid) {
    if (edge.style(`${direction}-text-margin-x`) !== `${labelWidth}px`) {
      edge.style(`${direction}-text-margin-x`, `${labelWidth}px`)
    }
  }
  if (anchor.y <= verticalMid) {
    if (edge.style(`${direction}-text-margin-y`) !== `-${CHARACTER_HEIGHT}px`) {
      edge.style(`${direction}-text-margin-y`, `-${CHARACTER_HEIGHT}px`)
    }
  }
  if (anchor.y > verticalMid) {
    if (edge.style(`${direction}-text-margin-y`) !== `${CHARACTER_HEIGHT}px`) {
      edge.style(`${direction}-text-margin-y`, `${CHARACTER_HEIGHT}px`)
    }
  }
}
