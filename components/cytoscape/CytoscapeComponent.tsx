import cytoscape from "cytoscape"
import dagre from "cytoscape-dagre"
import popper from "cytoscape-popper"
import { useEffect, useRef } from "react"
import { labelPositioning, nodeExpansion } from "../../lib/cytoscape/extensions"
import { compareProps } from "../../lib/frontend"
interface Props {
  /**
   * Return the Cytoscape Core to the parent component.
   * The parent component can then control the Cytoscape instance
   * during execution, i.e. by adding listeners to nodes and edges
   * or by configuring extensions
   */
  cy?: (cy: cytoscape.Core) => void | undefined
  elements: cytoscape.ElementDefinition[]
  layout?: cytoscape.LayoutOptions | dagre.DagreLayoutOptions | undefined
  stylesheet?: cytoscape.Stylesheet[] | undefined
}

export default function CytoscapeComponent(props: Props) {
  const container = useRef(null)
  const prevProps = useRef<Props | null>()
  const cy = useRef<cytoscape.Core | null>()
  const { elements, layout, stylesheet } = props

  useEffect(() => {
    if (!compareProps(prevProps.current, props)) {
      cytoscape.use(dagre)
      cy.current = cytoscape({
        container: container.current,
        layout: layout,
        elements: elements,
        style: stylesheet,
      })
      const compoundNodes = cy.current.nodes("$node > node")
      compoundNodes.forEach((currentNode) => {
        if (currentNode.data("layout")) {
          currentNode.descendants().layout(currentNode.data("layout")).run()
        }
      })
      cy.current.fit()

      if (!Object.getPrototypeOf(cy.current).popper) {
        cytoscape.use(popper)
      }
      if (!Object.getPrototypeOf(cy.current).nodeExpansion) {
        cytoscape.use(nodeExpansion)
      }
      if (!Object.getPrototypeOf(cy.current).labelPositioning) {
        cytoscape.use(labelPositioning)
      }

      prevProps.current = props
    }
    if (props.cy) {
      props.cy(cy.current as cytoscape.Core)
    }
    return () => {
      if (!compareProps(prevProps.current, props)) {
        cy.current?.destroy()
      }
    }
  })

  return <div ref={container} style={{ width: "100%", height: "100%" }} />
}
