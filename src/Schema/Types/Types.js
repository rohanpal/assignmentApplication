const graphql = require("graphql");
const Teacher = require("../../models/teacher");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;
// const teachersQuery = (teacherType, studentType, AuthDataType) => ();
