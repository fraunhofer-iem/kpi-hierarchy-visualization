import Markdown from "markdown-to-jsx"
import React, { useState } from "react"
import { Button } from "../action"
import { Card, CardControls } from "../card"
interface Props {
  readme?: string
  descriptionControl: (
    nodeSelector: (node: cytoscape.NodeSingular) => void,
  ) => void
  simulateTap: (nodeId: string) => void
}

export function Description(props: Props) {
  const [selectedNode, selectNode] = useState<cytoscape.NodeSingular>()
  const [enlarged, setEnlarged] = useState<boolean>(false)

  props.descriptionControl(selectNode)

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <Card width="100%" height={enlarged ? "75vh" : "150px"} margin="0">
        <CardControls action={() => setEnlarged(!enlarged)} />

        <Markdown
          options={{
            createElement: (tag, elementProps, ...children) => {
              if (tag === "a" && elementProps["href"].endsWith(".md")) {
                // description references other document
                return (
                  <Button
                    context={"anchor"}
                    display={"inline"}
                    padding={"0"}
                    action={() =>
                      props.simulateTap(elementProps["href"].split(".")[0])
                    }
                    key={elementProps["key"]}
                  >
                    {children}
                  </Button>
                )
              }
              return React.createElement(tag, elementProps, children)
            },
          }}
        >
          {selectedNode ? selectedNode.data("description") : props.readme}
        </Markdown>
      </Card>
    </div>
  )
}
