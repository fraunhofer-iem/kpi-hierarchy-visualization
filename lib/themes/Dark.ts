import { Colors, CSSProperties } from "../frontend"
import { Theme } from "./Theme"

const {
  white,
  black,
  gray,
  fraunhoferGreen,
  transparent,
  blue,
  navy,
  maroon,
  gold,
  green,
} = Colors

const DarkTheme: Theme = {
  name: "dark",
  layout: {
    // container: new CSSProperties({ backgroundColor: white.darken(0.05) }),
    container: new CSSProperties({
      backgroundColor: black.brighten(0.05),
      color: white,
    }),
  },
  cytoscape: {
    canvas: [
      {
        selector: "node[label]",
        style: {
          label: "data(label)",
          "text-valign": "bottom",
        },
      },
      {
        selector: "node[?hover]",
        style: {
          backgroundColor: black.rgba(),
        },
      },
      {
        selector: "node[!hover]",
        style: {
          backgroundColor: gray.rgba(),
        },
      },
      {
        selector: "edge",
        style: {
          width: 2,
          "line-color": white.darken(0.2).rgba(),
          "target-arrow-color": white.darken(0.2).rgba(),
          "target-arrow-shape": "triangle",
          "curve-style": "taxi",
        },
      },
    ],
  },
}

export default DarkTheme
