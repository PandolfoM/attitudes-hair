import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($pfp: String, $color: String) {
    updateUser(pfp: $pfp, color: $color) {
      _id
    }
  }
`;

export const ADD_PRICE = gql`
  mutation AddPrice($name: String!, $price: Float!, $additional: Boolean) {
    addPrice(name: $name, price: $price, additional: $additional) {
      token
      user {
        _id
      }
    }
  }
`;

export const DELETE_PRICE = gql`
  mutation DeletePrice($id: ID!) {
    deletePrice(_id: $id) {
      _id
      name
    }
  }
`;
