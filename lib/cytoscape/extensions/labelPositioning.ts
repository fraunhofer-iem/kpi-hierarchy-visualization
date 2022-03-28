export const register = function (cytoscape: any) {
  if (!cytoscape) {
    return
  } // can't register if cytoscape unspecified

  cytoscape("core", "labelPositioning", function (this: cytoscape.Core) {
    this.on("position", "node", (event) => {
      event.target.forEach((node: cytoscape.NodeSingular) => {
        if (node.isChild()) {
          repositionCompoundNodeLabel(node.parent() as cytoscape.NodeSingular)
        }
        node.connectedEdges("edge").forEach((edge: cytoscape.EdgeSingular) => {
          repositionEdgeLabels(
            edge,
            edge.sourceEndpoint(),
            edge.source().boundingBox({}),
            "source",
          )
          repositionEdgeLabels(
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

function repositionCompoundNodeLabel(node: cytoscape.NodeSingular) {
  const labelWidth = 8 * node.data("label").length
  const nodeDimensions = node.boundingBox({})
  const labelPositions = [
    // top left
    {
      x1: nodeDimensions.x1,
      x2: nodeDimensions.x1 + labelWidth,
      y1: nodeDimensions.y1,
      y2: nodeDimensions.y1 + 25,
      vAlign: "top",
      hAlign: "left",
      yMargin: 20,
      xMargin: labelWidth,
    },
    // top right
    {
      x1: nodeDimensions.x2 - labelWidth,
      x2: nodeDimensions.x2,
      y1: nodeDimensions.y1,
      y2: nodeDimensions.y1 + 25,
      vAlign: "top",
      hAlign: "right",
      yMargin: 20,
      xMargin: -labelWidth,
    },
    // bottom left
    {
      x1: nodeDimensions.x1,
      x2: nodeDimensions.x1 + labelWidth,
      y1: nodeDimensions.y2 - 25,
      y2: nodeDimensions.y2,
      vAlign: "bottom",
      hAlign: "left",
      yMargin: -20,
      xMargin: labelWidth,
    },
    // bottom right
    {
      x1: nodeDimensions.x2 - labelWidth,
      x2: nodeDimensions.x2,
      y1: nodeDimensions.y2 - 25,
      y2: nodeDimensions.y2,
      vAlign: "bottom",
      hAlign: "right",
      yMargin: -20,
      xMargin: -labelWidth,
    },
  ]
  for (const position of labelPositions) {
    let isViable = true
    node.children().forEach((child) => {
      const dimensions = child.boundingBox({})
      if (
        // is child in upper left corner of compound node?
        (dimensions.x1 >= position.x1 &&
          dimensions.x1 <= position.x2 &&
          dimensions.y1 >= position.y1 &&
          dimensions.y1 <= position.y2) ||
        // is child in upper right corner of compound node?
        (dimensions.x2 >= position.x1 &&
          dimensions.x2 <= position.x2 &&
          dimensions.y1 >= position.y1 &&
          dimensions.y1 <= position.y2) ||
        // is child in lower left corner of compound node?
        (dimensions.x1 >= position.x1 &&
          dimensions.x1 <= position.x2 &&
          dimensions.y2 >= position.y1 &&
          dimensions.y2 <= position.y2) ||
        // is child in lower right corner of compound node?
        (dimensions.x2 >= position.x1 &&
          dimensions.x2 <= position.x2 &&
          dimensions.y2 >= position.y1 &&
          dimensions.y2 <= position.y2)
      ) {
        isViable = false
      }
    })
    if (isViable) {
      node.style("text-valign", position.vAlign)
      node.style("text-halign", position.hAlign)
      node.style("text-margin-y", position.yMargin)
      node.style("text-margin-x", position.xMargin)
      break
    }
  }
}

function repositionEdgeLabels(
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
