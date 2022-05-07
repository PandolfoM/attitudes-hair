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

export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      email
      firstName
      lastName
      color
      pfp
    }
  }
`;

export const QUERY_USER = gql`
  query User($id: ID!) {
    user(_id: $id) {
      _id
      email
      firstName
      lastName
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
