import { register as positioningExtension } from "./labelPositioning"
import { register as expansionExtension } from "./nodeExpansion"

export const nodeExpansion: cytoscape.Ext = expansionExtension
export const labelPositioning: cytoscape.Ext = positioningExtension
declare global {
  namespace cytoscape {
    interface NodeSingular {
      expand: () => void
      collapse: () => void
      expanded: () => boolean
    }

    interface Core {
      nodeExpansion: () => void
      labelPositioning: () => void
    }
  }
}
