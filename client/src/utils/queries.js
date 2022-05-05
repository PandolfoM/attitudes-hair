import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      firstName
      lastName
      email
      color
      pfp
    }
  }
`;

export const QUERY_PRICES = gql`
  query Prices {
    prices {
      _id
      name
      price
      additional
    }
  }
`;

export const QUERY_PRICE = gql`
  query Price($name: String!) {
    price(name: $name) {
      _id
      name
      price
      additional
    }
  }
`;
