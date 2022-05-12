const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const Price = require("../models/Price");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw new AuthenticationError("Not Logged In");
    },
    users: async () => {
      return User.find().select("-__v -password");
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id }).select("-__v -password");
    },
    prices: async () => {
      return Price.find();
    },
    price: async (parent, { name }) => {
      return Price.findOne({ name });
    },
  },
  Mutation: {
    addUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      }

      throw new AuthenticationError("Not Logged In");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    updateOtherUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate({_id: args._id}, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    deleteUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndRemove(args);
      }

      throw new AuthenticationError("Not logged in");
    },
    addPrice: async (parent, args, context) => {
      if (context.user) {
        const price = await Price.create(args);
        const token = signToken(price);

        return { token, price };
      }

      throw new AuthenticationError("Not Logged In");
    },
    deletePrice: async (parent, args, context) => {
      if (context.user) {
        return await Price.findOneAndRemove(args);
      }

      throw new AuthenticationError("Not Logged In");
    },
    updatePrice: async (parent, args, context) => {
      if (context.user) {
        return await Price.findOneAndUpdate({_id: args._id}, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
