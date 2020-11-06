import React from "react"
import { Helmet } from "react-helmet"

export default function HtmlPageMetadata({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

export const withHtmlPageMetadata = (title, description) => (
  WrappedComponent
) => () => (
  <>
    <HtmlPageMetadata title={title} description={description} />
    <WrappedComponent />
  </>
)
