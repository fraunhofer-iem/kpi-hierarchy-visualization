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
          "border-color": white.darken(0.1).rgba(),
          // @ts-ignore-line
          shape: "data(shape)",
          width: "label",
          height: "label",
          padding: "5px",
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
          "text-wrap": "wrap",
        },
      },
      {
        selector: "node[label][colorLight]",
        style: {
          color: "data(colorLight)",
        },
      },
      {
        selector: "node[label][borderLight]",
        style: {
          "border-color": "data(borderLight)",
        },
      },
      {
        selector: "node[?tapped], node[?hover]",
        style: {
          backgroundColor: white.darken(0.03).rgba(),
        },
      },
      {
        selector: "node[!hover][!tapped]",
        style: {
          backgroundColor: white.darken(0.01).rgba(),
        },
      },
      {
        selector: "node[!hover][!tapped][backgroundLight]",
        style: {
          backgroundColor: "data(backgroundLight)",
        },
      },
      {
        selector:
          "node[?tapped][backgroundLight], node[?hover][backgroundLight]",
        style: {
          backgroundColor: "data(backgroundLightHover)",
        },
      },
      {
        selector: "node[?hinge]",
        style: {
          width: 5,
          height: 5,
          shape: "ellipse",
          label: "",
          backgroundColor: black.brighten(0.1).rgba(),
          "border-color": black.brighten(0.1).rgba(),
          //@ts-ignore-line
          padding: 0,
        },
      },
      {
        selector: "$node > node",
        style: {
          "border-width": "0px",
          shape: "rectangle",
          backgroundColor: white.darken(0.05).rgba(),
        },
      },
      {
        selector: "$node[backgroundLight] > node",
        style: {
          backgroundColor: "data(backgroundLight)",
        },
      },
      {
        selector: "$node[colorLight] > node",
        style: {
          color: "data(colorLight)",
        },
      },
      {
        selector: "$node[borderLight] > node",
        style: {
          "border-color": "data(borderLight)",
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
          "line-color": black.brighten(0.1).rgba(),
          "loop-direction": "90deg",
          "curve-style": "taxi",
        },
      },
      {
        selector: "edge[?directed]",
        style: {
          "target-arrow-color": black.brighten(0.1).rgba(),
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

export default LightTheme
