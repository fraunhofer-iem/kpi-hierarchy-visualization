import Head from "next/head"
import { Container } from "./Container"

interface Props {
  title: string
  children?: React.ReactNode
}

/**
 * Skeleton page layout
 */
export function Page(props: Props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Container>{props.children}</Container>
    </>
  )
}
