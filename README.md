# kpi-hierarchy-visualization

This application can be used to visualize a hierarchy using CytoscapeJS.  
After cloning this repository, you need to add the file `hierarchy.json` to the root level. The hierarchy information is expected in the following form:

```ts
{
  layout: cytoscape.LayoutOptions, // a native CytoscapeJS layout (or cytoscape-dagre) which will be applied to all nodes
  readme: string, // general information on the displayed hierarchy
  title: string, // page title
  nodes: [
    // single node
    {
      id: string,
      name: string,
      description: string
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
          description: string
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
        straight: boolean | undefined // if true, edge is set to 'curve-style: bezier' instead of 'curve-style: taxi'
        directed: boolean | undefined // if true, edge will not have an arrow pointing at the target
      }
    ]
  ]
}
```
