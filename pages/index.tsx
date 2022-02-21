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
      hidden?: boolean
      children?: { id: string; name: string; description: string }[]
    }) => {
      elements.push(
        Node({
          id: currentNode.id,
          label: currentNode.name ?? "",
          additionalAttributes: {
            description: currentNode.description,
            layout: currentNode.layout,
            hidden: currentNode.hidden,
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
      arrowShape?: string
      sourceLabel?: string
      targetLabel?: string
      directed?: boolean
      label?: string
      straight?: boolean
      style?: { [key: string]: any }
    }) => {
      elements.push(
        Edge(
          currentEdge.source,
          currentEdge.target,
          currentEdge.directed,
          {
            label: currentEdge.label,
            sourceLabel: currentEdge.sourceLabel,
            targetLabel: currentEdge.targetLabel,
            straight: currentEdge.straight,
            arrowShape: currentEdge.arrowShape,
          },
          currentEdge.style,
        ),
      )
    },
  )

  const cytoscapeControl = useCallback(
    (c: cytoscape.Core) => {
      if (cy.current == c) {
        return
      }
      if (hierarchy.center) {
        c.center(c.getElementById(hierarchy.center))
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
