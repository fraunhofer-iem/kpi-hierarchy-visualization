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
  button: {
    neutral: new CSSProperties({
      backgroundColor: transparent,
      color: "inherit",
    }),
    "neutral:hover": new CSSProperties({
      backgroundColor: transparent,
      color: "inherit",
    }),
    anchor: new CSSProperties({
      backgroundColor: transparent,
      color: "inherit",
      textDecoration: "underline",
    }),
    "anchor:hover": new CSSProperties({
      backgroundColor: transparent,
      textDecoration: "none",
      color: "inherit",
    }),
  },
  cytoscape: {
    canvas: [
      {
        selector: "node",
        style: {
          "border-style": "solid",
          "border-width": "1px",
          "border-color": "white",
          // @ts-ignore-line
          shape: "data(shape)",
          width: "label",
        },
      },
      {
        selector: "node[?hidden]",
        style: {
          visibility: "hidden",
        },
      },
      {
        selector: "node[label]",
        style: {
          label: "data(label)",
          "text-valign": "center",
          color: white.rgba(),
        },
      },
      {
        selector: "node[?tapped], node[?hover]",
        style: {
          backgroundColor: white.darken(0.25).rgba(),
        },
      },
      {
        selector: "node[!hover][!tapped]",
        style: {
          backgroundColor: white.darken(0.8).rgba(),
        },
      },
      {
        selector: "node[?hinge]",
        style: {
          width: 5,
          height: 5,
          shape: "ellipse",
          label: "",
          backgroundColor: white.darken(0.2).rgba(),
          "border-color": white.darken(0.2).rgba(),
        },
      },
      {
        selector: "$node > node",
        style: {
          "border-width": "0px",
          shape: "rectangle",
          backgroundColor: black.brighten(0.05).rgba(),
        },
      },
      {
        selector: "$node[label] > node",
        style: {
          "border-width": "1px",
        },
      },
      {
        selector: "edge",
        style: {
          width: 2,
          // @ts-ignore-line
          "line-style": "data(lineStyle)",
          "line-color": white.darken(0.2).rgba(),
          "loop-direction": "90deg",
          color: white.rgba(),
        },
      },
      {
        selector: "edge[?directed]",
        style: {
          "target-arrow-color": white.darken(0.2).rgba(),
          "target-arrow-shape": "chevron",
        },
      },
      {
        selector: "edge[arrowShape]",
        style: {
          //@ts-ignore-line
          "target-arrow-shape": "data(arrowShape)",
        },
      },
      {
        selector: "edge[sourceLabel]",
        style: {
          "source-label": "data(sourceLabel)",
        },
      },
      {
        selector: "edge[targetLabel]",
        style: {
          "target-label": "data(targetLabel)",
        },
      },
      {
        selector: "edge[label]",
        style: {
          label: "data(label)",
        },
      },
      {
        selector: "edge[?straight]",
        style: {
          "curve-style": "bezier",
        },
      },
      {
        selector: "edge[!straight]",
        style: {
          "curve-style": "taxi",
          "taxi-turn": "100px",
        },
      },
    ],
  },
}

export default DarkTheme
