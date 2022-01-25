import { NextPage } from "next"
import tippyfy, { TooltipControl } from "tooltip-component"
import { Page } from "../components/layout"

const Landing: NextPage = tippyfy((props: TooltipControl) => {
  return <Page title={"Test"}>Hi na</Page>
})

export default Landing
