const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;
const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parentValue, { email, password}, req) {
        const user = await AuthService.signup({
          email,
          password,
          req,
        });
        return user;
      }
    },
    logout: {
      type: UserType,
      async resolve(parentValue, args, req) {
        const { user } = req;
        await req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parentValue, { email, password }, req) {
        const user = await AuthService.login({
          email,
          password,
          req,
        });
        return user;
      }
    }
  },
});

module.exports = mutation;
