import { NextPage } from "next"
import { useCallback, useRef } from "react"
import tippyfy, { TooltipControl } from "tooltip-component"
import { Description } from "../components/content/Description"
import CytoscapeComponent from "../components/cytoscape/CytoscapeComponent"
import { Page } from "../components/layout"
import hierarchyJson from "../hierarchy.json"
import { EdgeConstructor, NodeConstructor } from "../lib/cytoscape"
import { Color, CompoundNode, Hierarchy, Node } from "../lib/frontend"
import { useUIContext } from "../lib/hooks"

const defineNode = (node: CompoundNode | Node, parentNode?: string) => {
  const nodes: cytoscape.NodeDefinition[] = []
  let additionalAttributes: Omit<
    cytoscape.NodeDataDefinition,
    "id" | "label" | "kind" | "entity"
  > = {}
  if (!node.hasOwnProperty("children")) {
    node = node as Node
    ;(additionalAttributes.description = node.description ?? ""),
      (additionalAttributes.hinge = node.hinge)
    additionalAttributes.parent = parentNode
    additionalAttributes.shape = node.shape ?? "rectangle"
  } else {
    node = node as CompoundNode
    additionalAttributes.layout = node.layout

    node.children.forEach((currentChild) => {
      nodes.push(...defineNode(currentChild, node.id))
    })
  }
  additionalAttributes.hidden = node.hidden
  additionalAttributes.colorDark = node.theme?.dark?.color
  additionalAttributes.borderDark = node.theme?.dark?.border
  additionalAttributes.backgroundDark = node.theme?.dark?.background
  additionalAttributes.backgroundDarkHover = new Color(
    0,
    0,
    0,
    0,
    node.theme?.dark?.background,
  )
    .brighten(0.1)
    .rgba()
  additionalAttributes.colorLight = node.theme?.light?.color
  additionalAttributes.borderLight = node.theme?.light?.border
  additionalAttributes.backgroundLight = node.theme?.light?.background
  additionalAttributes.backgroundLightHover = new Color(
    0,
    0,
    0,
    0,
    node.theme?.light?.background,
  )
    .brighten(0.1)
    .rgba()
  nodes.push(
    NodeConstructor({
      id: node.id,
      label: node.name,
      additionalAttributes: additionalAttributes,
    }),
  )
  return nodes
}

const Landing: NextPage = tippyfy((props: TooltipControl) => {
  const { theme } = useUIContext()
  const selectNode = useRef<(node: cytoscape.NodeSingular) => void>()
  const cy = useRef<cytoscape.Core | null>()
  const { setTippy } = props
  const elements: cytoscape.ElementDefinition[] = []
  let hierarchy = hierarchyJson as Hierarchy
  if (hierarchy.hasOwnProperty("nodes")) {
    hierarchy.nodes.forEach((currentNode) => {
      elements.push(...defineNode(currentNode))
    })
  }
  if (hierarchy.hasOwnProperty("edges")) {
    hierarchy.edges.forEach((currentEdge) => {
      elements.push(
        EdgeConstructor(
          currentEdge.source,
          currentEdge.target,
          currentEdge.directed,
          {
            label: currentEdge.label,
            sourceLabel: currentEdge.sourceLabel,
            targetLabel: currentEdge.targetLabel,
            straight: currentEdge.straight,
            arrowShape: currentEdge.arrowShape,
            lineStyle: currentEdge.lineStyle ?? "solid",
          },
          currentEdge.style,
        ),
      )
    })
  }

  const cytoscapeControl = useCallback(
    (c: cytoscape.Core) => {
      if (cy.current == c) {
        return
      }
      c.labelPositioning()
      if (hierarchy.hasOwnProperty("center")) {
        c.center(c.getElementById(hierarchy["center"]))
      }
      c.on("mouseover", "node", (event) => {
        const node: cytoscape.NodeSingular = event.target
        if (!node.isParent()) {
          setTippy(node.id(), {
            content: <></>,
            popperRef: node.popperRef(),
            dispose: () => node.data("hover", false),
            tippyProps: { placement: "right" },
          })
          node.data("hover", true)
        }
      })
      c.on("mouseout", "node", (event) => {
        const node: cytoscape.NodeSingular = event.target
        if (!node.isParent()) {
          setTippy(node.id(), { content: undefined, popperRef: undefined })
        }
      })
      c.on("tap", () => {
        c.nodes().removeData("tapped")
        selectNode.current(undefined)
      })
      c.on("tap", "node", (event) => {
        const node: cytoscape.NodeSingular = event.target
        if (!node.isParent()) {
          if (!node.data("tapped")) {
            c.nodes().removeData("tapped")
            node.data("tapped", true)
            selectNode.current(node)
          } else {
            node.removeData("tapped")
            selectNode.current(undefined)
          }
        }
      })
      cy.current = c
    },
    [setTippy, hierarchy],
  )

  const descriptionControl = useCallback(
    (nodeSelector: (node: cytoscape.NodeSingular) => void) => {
      selectNode.current = nodeSelector
    },
    [],
  )

  const simulateTap = useCallback((nodeId: string) => {
    cy.current.getElementById(nodeId).emit("tap")
  }, [])

  return (
    <Page title={hierarchy.title}>
      <div style={{ height: "calc(100vh - 150px)", width: "100%" }}>
        <CytoscapeComponent
          cy={cytoscapeControl}
          elements={elements}
          layout={hierarchy.layout}
          stylesheet={theme.cytoscape?.canvas}
        />
      </div>
      <Description
        readme={hierarchy.readme}
        descriptionControl={descriptionControl}
        simulateTap={simulateTap}
      />
    </Page>
  )
})

export default Landing
