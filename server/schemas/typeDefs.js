const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    color: String
    pfp: String
  }

  type Price {
    _id: ID
    name: String
    price: Float
    additional: Boolean
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    prices: [Price]
    price(name: String!): Price
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      color: String
      pfp: String
    ): Auth
    addPrice(
      name: String!
      price: Float!
      additional: Boolean
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      color: String
      pfp: String
    ): User
    updateOtherUser(
      _id: ID!
      firstName: String
      lastName: String
      email: String
    ): User
    updatePrice(
      _id: ID!
      name: String
      price: Float
      additional: Boolean
    ): Price
    deleteUser(_id: ID!): User
    deletePrice(_id: ID, name: String): Price
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
