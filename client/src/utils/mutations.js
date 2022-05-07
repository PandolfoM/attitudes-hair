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
  mutation addUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
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

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(_id: $id) {
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
  mutation DeletePrice($name: String!) {
    deletePrice(name: $name) {
      _id
      name
      price
      additional
    }
  }
`;

export const UPDATE_PRICE = gql`
mutation UpdatePrice($id: ID!, $name: String, $price: Float, $additional: Boolean) {
  updatePrice(_id: $id, name: $name, price: $price, additional: $additional) {
    _id
  }
}
`;
