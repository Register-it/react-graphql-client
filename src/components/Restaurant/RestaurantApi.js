import { useQuery, useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useEffect } from "react"

import { useGetAndSet } from "react-context-hook"
import { STORE_VALUES } from "../../Store"

const GET_RESTAURANTS = gql`
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

export const GET_RESTAURANT = gql`
  query getRestaurant($id: ID!) {
    restaurant(id: $id) {
      name
      id
      address
      city
      stars
      numberOfReviews
      reviews {
        message
        stars
        id
      }
    }
  }
`

const ADD_REVIEW = gql`
  mutation createReview($message: String, $restaurantId: ID!, $stars: Int!) {
    createReview(
      input: { message: $message, stars: $stars, restaurantId: $restaurantId }
    ) {
      id
      message
      stars
    }
  }
`

export function useRestaurants() {
  const [restaurants, setRestaurants] = useGetAndSet(
    STORE_VALUES.RESTAURANTS,
    []
  )
  const { loading, data, error } = useQuery(GET_RESTAURANTS, {
    skip: restaurants.length > 0
  })

  useEffect(() => {
    if (data) {
      setRestaurants(data.restaurants)
    }
  }, [data, setRestaurants])

  return { loading, error, restaurants }
}

export function useRestaurant(restaurantId) {
  const [restaurant, setRestaurant] = useGetAndSet(
    STORE_VALUES.RESTAURANT(restaurantId)
  )
  const { loading, data, error } = useQuery(GET_RESTAURANT, {
    variables: { id: restaurantId },
    skip: restaurant !== undefined
  })

  useEffect(() => {
    if (data) {
      setRestaurant(data.restaurant)
    }
  }, [data, setRestaurant])

  return { loading, error, restaurant }
}

export function useAddReview(
  restaurantId,
  message,
  stars,
  onCompleted = () => {}
) {
  const [restaurant, setRestaurant] = useGetAndSet(
    STORE_VALUES.RESTAURANT(restaurantId)
  )
  const [restaurants, setRestaurants] = useGetAndSet(
    STORE_VALUES.RESTAURANTS,
    []
  )

  const [addReview, { loading, error }] = useMutation(ADD_REVIEW, {
    onError: () => {},
    onCompleted: (data) => {
      console.log()
      const numberOfReviews = restaurant.numberOfReviews + 1
      const restaurantUpdated = {
        ...restaurant,
        reviews: [...restaurant.reviews, data.createReview],
        numberOfReviews: numberOfReviews,
        stars:
          (restaurant.stars * restaurant.numberOfReviews +
            data.createReview.stars) /
          numberOfReviews
      }
      setRestaurant(restaurantUpdated)
      setRestaurants(
        restaurants.map((oldRestaurant) =>
          oldRestaurant.id === restaurantUpdated.id
            ? restaurantUpdated
            : oldRestaurant
        )
      )

      onCompleted(data)
    },
    variables: {
      restaurantId,
      message,
      stars
    }
  })

  return [addReview, { loading, error }]
}
