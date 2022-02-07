import { NextPage } from "next"
import { useCallback, useRef } from "react"
import tippyfy, { TooltipControl } from "tooltip-component"
import { Description } from "../components/content/Description"
import CytoscapeComponent from "../components/cytoscape/CytoscapeComponent"
import { Page } from "../components/layout"
import hierarchy from "../hierarchy.json"
import { Edge, Node } from "../lib/cytoscape"
import { useUIContext } from "../lib/hooks"

const Landing: NextPage = tippyfy((props: TooltipControl) => {
  const { theme } = useUIContext()
  const selectNode = useRef<(node: cytoscape.NodeSingular) => void>()
  const cy = useRef<cytoscape.Core | null>()
  const { setTippy } = props
  const elements: cytoscape.ElementDefinition[] = []

  hierarchy.nodes.forEach(
    (currentNode: {
      id: string
      layout?: any
      name?: string
      description?: string
      children?: { id: string; name: string; description: string }[]
    }) => {
      elements.push(
        Node({
          id: currentNode.id,
          label: currentNode.name ?? "",
          additionalAttributes: {
            description: currentNode.description,
            layout: currentNode.layout,
          },
        }),
      )
      currentNode.children?.forEach((currentChild) => {
        elements.push(
          Node({
            id: currentChild.id,
            label: currentChild.name,
            additionalAttributes: {
              description: currentChild.description,
              parent: currentNode.id,
            },
          }),
        )
      })
    },
  )
  hierarchy.edges.forEach(
    (currentEdge: {
      source: string
      target: string
      sourceLabel?: string
      targetLabel?: string
      label?: string
      straight?: boolean
    }) => {
      elements.push(
        Edge(currentEdge.source, currentEdge.target, true, {
          label: currentEdge.label,
          sourceLabel: currentEdge.sourceLabel,
          targetLabel: currentEdge.targetLabel,
          straight: currentEdge.straight,
        }),
      )
    },
  )

  const cytoscapeControl = useCallback(
    (c: cytoscape.Core) => {
      if (cy.current == c) {
        return
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
    [setTippy],
  )

  const descriptionControl = useCallback(
    (nodeSelector: (node: cytoscape.NodeSingular) => void) => {
      selectNode.current = nodeSelector
    },
    [],
  )

  return (
    <Page title={"Test"}>
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
      />
    </Page>
  )
})

export default Landing
