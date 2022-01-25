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

const LightTheme: Theme = {
  name: "light",
  layout: {
    container: new CSSProperties({ backgroundColor: white.darken(0.05) }),
  },
  card: {
    card: new CSSProperties({
      backgroundColor: white.darken(0.01),
      borderColor: gray,
    }),
    title: new CSSProperties({ color: black }),
    subTitle: new CSSProperties({ color: white.darken(0.65) }),
    dismissal: new CSSProperties({ color: black }),
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

export default LightTheme
