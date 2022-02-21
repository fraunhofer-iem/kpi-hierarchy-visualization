# kpi-hierarchy-visualization

This application can be used to visualize a hierarchy using CytoscapeJS.  
After cloning this repository, you need to add the file `hierarchy.json` to the root level. The hierarchy information is expected in the following form:

```ts
{
  layout: cytoscape.LayoutOptions, // a native CytoscapeJS layout (or cytoscape-dagre) which will be applied to all nodes
  readme: string, // general information on the displayed hierarchy
  center: string | undefined // ID of Cytoscape element the graph will be centered on
  title: string, // page title
  nodes: [
    // single node
    {
      id: string,
      name: string,
      description: string, // Markdown will be rendered in the information card
      hidden: boolean // if true, node will be added to Cytoscape but it will be set to 'visibility: hidden'
    }
    |
    // compound node
    {
      id: string,
      layout: cytoscape.LayoutOptions | undefined, // a native CytoscapeJS layout (or cytoscape-dagre) which will be applied to the compound node's children
      children: [
        // single node
        {
          id: string,
          name: string,
          description: string // Markdown will be rendered in the information card
        }
      ]
    },
    edges: [
      {
        source: string, // ID of the source node
        target: string, // ID of the target node
        label: string | undefined,
        sourceLabel: string | undefined,
        targetLabel: string | undefined,
        arrowShape: string | undefined, // set the target-arrow-shape of the edge, see [Cytoscape documentation](https://js.cytoscape.org/#style/edge-arrow)
        straight: boolean | undefined, // if true, edge is set to 'curve-style: bezier' instead of 'curve-style: taxi'
        directed: boolean | undefined, // if true, edge will not have an arrow pointing at the target
        style: any | undefined // an object of [Cytoscape](https://js.cytoscape.org/#style) edge styles, **Use only if necessary**
      }
    ]
  ]
}
```
