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
