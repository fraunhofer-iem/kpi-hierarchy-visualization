# kpi-hierarchy-visualization

This application can be used to visualize a hierarchy using CytoscapeJS.  
After cloning this repository, you need to add the file `hierarchy.json` to the root level.

## Hierarchy Information

The hierarchy information is expected in the following form:

```ts
interface Hierarchy {
  layout: cytoscape.LayoutOptions | cytoscapeDagre.DagreLayoutOptions // will be applied to all nodes and compound nodes
  readme: string // general information on the displayed hierarchy
  center?: string // ID of Cytoscape element the graph will be centered on
  title: string // page title
  nodes: (CompoundNode | Node)[]
  edges: Edge[]
}
```

### Nodes

`Node` represents a simple graph node:

```ts
interface Node {
  id: string
  name: string
  shape: string // set the shape of the node, see [Cytoscape documentation](https://js.cytoscape.org/#style/node-body)
  description: string // Markdown will be rendered in the information card
  hidden: boolean // if true, node will be added to Cytoscape but it will be set to 'visibility: hidden'
  hinge: boolean // if true, creates a 'hinge node'
  theme?: {
    // optional theme information for this specific node
    dark?: {
      background?: string
      color?: string
      border?: string
    }
    light?: {
      background?: string
      color?: string
      border?: string
    }
  }
}
```

A `hinge node` can be used as an artificial junction point between two edges. It is displayed as a circle in the colors of an edge. See below for a more concrete example.

### Compound Nodes

`CompoundNode` represents a subgraph:

```ts
interface CompoundNode {
  id: string
  name?: string
  layout?: cytoscape.LayoutOptions | cytoscapeDagre.DagreLayoutOptions // will be applied only to the compound node's children
  children: Node[]
  hidden: boolean // if true, subgraph will be added to Cytoscape but it will be set to 'visibility: hidden'
}
```

Note, that a `compound node` can itself contain `compound nodes`.

### Edges

`Edge` represents a connection between two nodes:

```ts
interface Edge {
  source: string
  target: string
  directed?: boolean // if true, edge will not have an arrow pointing at the target
  arrowShape?: string // set the target-arrow-shape of the edge, see [Cytoscape documentation](https://js.cytoscape.org/#style/edge-arrow)
  lineStyle?: string // set the line-style of the edge, see [Cytoscape documentation](https://js.cytoscape.org/#style/edge-line)
  sourceLabel?: string
  label?: string
  targetLabel?: string
  straight?: boolean // if true, edge is set to 'curve-style: bezier' instead of 'curve-style: taxi'
  style?: { [key: string]: any } // an object of [Cytoscape](https://js.cytoscape.org/#style) edge styles, **Use only if necessary**
}
```

Note, that `edges` can be drawn between `nodes`, `compound nodes`, as well as `node` and a `compound node`.

### Example

The following example creates three nodes `A`, `B`, `C` in a compound node `group` with edges `A-B`, `A-C`, and `B-C` along a hinge node `hinge`:

```ts
{
  "readme": "",
  "title": "Example",
  "center": "hinge",
  "layout": {
    "name": "concentric"
  },
  "nodes": [
    {
      "id": "group",
      "children": [
        {
          "id": "A",
          "name": "A"
        },
        {
          "id": "B",
          "name": "B"
        },
        {
          "id": "C",
          "name": "C"
        },
        {
          "id": "hinge",
          "hinge": true
        }
      ]
    }
  ],
  "edges": [
    {
      "source": "A",
      "target": "hinge",
      "directed": false,
      "straight": true
    },
    {
      "source": "B",
      "target": "hinge",
      "directed": false,
      "straight": true
    },
    {
      "source": "C",
      "target": "hinge",
      "directed": false,
      "straight": true
    }
  ]
}
```
