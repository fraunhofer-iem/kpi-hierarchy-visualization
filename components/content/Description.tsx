import Markdown from "markdown-to-jsx"
import { useState } from "react"
import { Card, CardControls } from "../card"

interface Props {
  descriptionControl: (
    nodeSelector: (node: cytoscape.NodeSingular) => void,
  ) => void
}

export function Description(props: Props) {
  const [selectedNode, selectNode] = useState<cytoscape.NodeSingular>()
  const [enlarged, setEnlarged] = useState<boolean>(false)

  props.descriptionControl(selectNode)

  return selectedNode ? (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <Card width="100%" height={enlarged ? "75vh" : "150px"} margin="0">
        <CardControls
          action={() => setEnlarged(!enlarged)}
          dismiss={() => {
            selectedNode.removeData("tapped")
            selectNode(undefined)
          }}
        />
        <Markdown>{selectedNode.data("description")}</Markdown>
      </Card>
    </div>
  ) : (
    <></>
  )
}
