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
    container: new CSSProperties({
      backgroundColor: black.brighten(0.05),
      color: white,
    }),
  },
  card: {
    card: new CSSProperties({
      backgroundColor: black.brighten(0.25),
      borderColor: white.darken(0.35),
      color: white,
    }),
    title: new CSSProperties({ color: white }),
    subTitle: new CSSProperties({ color: white.darken(0.35) }),
    dismissal: new CSSProperties({ color: white }),
  },
  cytoscape: {
    canvas: [
      {
        selector: "node[label]",
        style: {
          label: "data(label)",
          "text-valign": "bottom",
          color: white.rgba(),
        },
      },
      {
        selector: "node[?hover]",
        style: {
          backgroundColor: white.darken(0.25).rgba(),
        },
      },
      {
        selector: "node[!hover]",
        style: {
          backgroundColor: white.darken(0.1).rgba(),
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
