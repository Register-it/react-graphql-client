import React from "react"
import Restaurant from "../Restaurant/RestaurantPreview"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import Error from "../Error/Error"
import { withHtmlPageMetadata } from "../HtmlPageMetadata"

export const GET_RESTAURANTS = gql`
  query getRestaurant {
    restaurants {
      name
      address
      stars
      city
      id
      numberOfReviews
    }
  }
`

function Home() {
  const { loading, data, error } = useQuery(GET_RESTAURANTS, {})

  if (loading) {
    return "loading"
  }
  if (error) {
    return <Error />
  }
  const { restaurants } = data
  return (
    <section style={{ width: 450 }}>
      {restaurants.map((restaurant) => (
        <Restaurant restaurant={restaurant} key={restaurant.id} />
      ))}
    </section>
  )
}

export default withHtmlPageMetadata(
  "GraphQL demo client - Register devs",
  "GraphQL demo client implementation using React and Apollo, made by Register.it developers"
)(Home)
