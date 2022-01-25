import { NextPage } from "next"
import { useCallback, useRef } from "react"
import tippyfy, { TooltipControl } from "tooltip-component"
import { Card } from "../components/card"
import CytoscapeComponent from "../components/cytoscape/CytoscapeComponent"
import { Page } from "../components/layout"
import kpis from "../kpiHierarchy.json"
import { Edge, Node } from "../lib/cytoscape"
import { useUIContext } from "../lib/hooks"

const Landing: NextPage = tippyfy((props: TooltipControl) => {
  const { theme } = useUIContext()
  const cy = useRef<cytoscape.Core | null>()
  const { setTippy } = props
  const elements: cytoscape.ElementDefinition[] = []

  kpis.forEach((currentKpi) => {
    elements.push(
      Node("unspecified", currentKpi.id, currentKpi.name, {
        description: currentKpi.description,
        hover: false,
      }),
    )
    currentKpi.children.forEach((currentChild) => {
      elements.push(Edge(currentKpi.id, currentChild))
    })
  })

  const cytoscapeControl = useCallback(
    (c: cytoscape.Core) => {
      if (cy.current == c) {
        return
      }

      // Initializes nodeExpansion plugin, setting the 'expanded' attribute and hiding all child nodes and their edges
      c.nodeExpansion()

      c.on("tap", "node", (event) => {
        const node: cytoscape.NodeSingular = event.target
        if (!node.expanded()) {
          node.expand()
        } else {
          node.collapse()
        }
      })

      c.on("mouseover", "node", (event) => {
        const node: cytoscape.NodeSingular = event.target
        setTippy(node.id(), {
          content: <Card width="250px">{node.data("description")}</Card>,
          popperRef: node.popperRef(),
          dispose: () => node.data("hover", false),
          tippyProps: { placement: "right" },
        })
        node.data("hover", true)
      })
      c.on("mouseout", "node", (event) => {
        const node: cytoscape.NodeSingular = event.target
        setTippy(node.id(), { content: undefined, popperRef: undefined })
      })

      cy.current = c
    },
    [setTippy],
  )

  return (
    <Page title={"Test"}>
      <div style={{ height: "100vh", width: "100%" }}>
        <CytoscapeComponent
          cy={cytoscapeControl}
          elements={elements}
          layout={{
            name: "dagre",
            nodeDimensionsIncludeLabels: true,
            fit: false,
          }}
          stylesheet={theme.cytoscape?.canvas}
        />
      </div>
    </Page>
  )
})

export default Landing
