const graphql = require("graphql");
const uuid = require("uuid");
const objects = require("./Types/Types");
const Teacher = require("../models/teacher");
const bcrypt = require("bcryptjs");
//const teachersQuery = require("./Types/Types");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;
const lod = require("lodash");
//All the types
const teacherType = new GraphQLObjectType({
  name: "teacher",
  fields: () => ({
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
    _id: { type: GraphQLID },
    assignments: { type: new GraphQLList(assignmentType) }
  })
});
const studentType = new GraphQLObjectType({
  name: "student",
  fields: () => ({
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
    _id: { type: GraphQLID }
  })
});
const AuthDataType = new GraphQLObjectType({
  name: "AuthData",
  fields: {
    _id: { type: GraphQLID },
    token: { type: GraphQLString },
    expiration: { type: GraphQLInt }
  }
});
const questionType = new GraphQLObjectType({
  name: "questionType",
  fields: {
    question: { type: GraphQLString },
    answer: { type: GraphQLInt }
  }
});
const assignmentType = new GraphQLObjectType({
  name: "assignmentType",
  fields: {
    questions: { type: new GraphQLList(questionType) },
    creator: { type: teacherType }
  }
});
const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    teachers: {
      type: new GraphQLList(teacherType),

      async resolve(parent, args) {
        try {
          const teacher = await Teacher.find();

          if (teacher) {
            return teacher;
          }
        } catch (e) {
          throw e;
        }
      }
    },
    student: {
      type: studentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return null;
      }
    },
    allTeachers: {
      type: new GraphQLList(teacherType),
      async resolve(parent, args) {
        try {
          const teacher = await Teacher.find();

          if (teacher) {
            return teacher;
          }
        } catch (e) {
          throw e;
        }
      }
    },
    allStudents: {
      type: new GraphQLList(studentType),
      resolve(parent, args) {
        return null;
      }
    },
    login: {
      type: AuthDataType,
      args: {
        userName: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args) {
        try {
          const user = await Teacher.findOne({ userName: args.userName });

          if (!user) {
            throw new Error(args.user + " does not exsist");
          }
          if (user.password !== args.password) {
            console.log("wrong pass");
            throw new Error("Incorrect username/password");
          }
          const authData = {
            _id: user.id,
            token: "lladfklndf",
            expiration: 1
          };
          return authData;
        } catch (e) {
          throw e;
        }
      }
    }
  }
});

//Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: teacherType,
      args: {
        userName: { type: GraphQLString },
        password: { type: GraphQLString },
        password2: { type: GraphQLString }
      },
      async resolve(parent, args) {
        try {
          if (
            args.password === "" ||
            args.password === null ||
            typeof args.password === "undefined"
          ) {
            throw new Error("Password can't be empty");
          }
          console.log(typeof args.password);
          const user = await Teacher.findOne({ userName: args.userName });
          if (user) {
            throw new Error("User already esxists");
          }
          if (args.password !== args.password2) {
            throw new Error("password does not match");
          }
          const hashedPassword = await bcrypt.hash(args.password, 12);

          const newTeacher = new Teacher({
            userName: args.userName,
            password: hashedPassword
          });

          const savedTeacher = await newTeacher.save();
          return { ...savedTeacher._doc };
        } catch (e) {
          throw e;
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
});
