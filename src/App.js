import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "./theme"
import { ThemeProvider } from "@material-ui/core"
import { BrowserRouter, Route } from "react-router-dom"
import { ApolloProvider } from "@apollo/react-hooks"
import { withStore } from "react-context-hook"
import client from "./apolloClient"

import ScrollToTop from "./layout/ScrollToTop"
import Home from "./components/Home/Home"
import AppContainer from "./layout/AppContainer"
import Restaurant from "./components/Restaurant/Restaurant"
import AppNotification from "./components/Notification/AppNotification"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <BrowserRouter>
          <AppContainer>
            <ScrollToTop />
            <Route path="/" component={Home} />
            <Route path="/restaurant/:id" component={Restaurant} />
          </AppContainer>
        </BrowserRouter>
        <AppNotification />
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default withStore(
  App,
  {},
  { logging: process.env.NODE_ENV === "development" }
)
