const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const { Apps, Users } = require("../demoData");

const AppType = new GraphQLObjectType({
  name: "App",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    link: { type: GraphQLString },
    type: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return Users.find((user) => user.id === parent.userId);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    twitter: { type: GraphQLString },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    app: {
      type: AppType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Apps.find((app) => app.id === args.id);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Users.find((user) => user.id === args.id);
      },
    },
    apps: {
      type: new GraphQLList(AppType),
      resolve(parent, args) {
        return Apps;
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return Users;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
});
