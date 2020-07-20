import { GraphQLServer } from "graphql-yoga";

// Type definitions / Schema

// Available scalar (atomic) types:
// - String
// - Boolean
// - Int
// - Float
// - ID

////////////////////////////////////
// Using Basic Types
////////////////////////////////////

// const typeDefinitions = `
//   type Query {
//     id: ID!
//     name: String!
//     age: Int!
//     employed: Boolean!
//     gpa: Float
//   }
// `;

// Resolvers (Basically controllers)
// const resolvers = {
//   Query: {
//     id() {
//       return "abc123";
//     },
//     name() {
//       return "Daksh";
//     },
//     age() {
//       return 21;
//     },
//     employed() {
//       return true;
//     },
//     gpa() {
//       return null;
//     },
//   },
// };

//////////////////////////////////
// Using custom types and operation arguments
//////////////////////////////////

const typeDefinitions = `
  type Query {
    me: User
    post: Post
    greeting(name: String): String
    grades: [Int!]!
    add(numbers: [Int!]!): Int
    users: [User!]!
    posts: [Post!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int! 
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: String!
    author: User!
  }
`;

// Dummy data
const Users = [
  {
    id: "1",
    name: "Dex",
    age: 21,
    email: "dex@gmail.com",
  },
  {
    id: "2",
    name: "Not Dex",
    email: "notdex@gmail.com",
    age: 21,
  },
  {
    id: "3",
    name: "Shishimanu",
    email: "shishimanu@gmail.com",
    age: 42,
  },
];

const Posts = [
  {
    id: "11",
    title: "Just a book",
    body: "A book that is just a book",
    published: "2011",
    author: "1",
  },
  {
    id: "12",
    title: "Just another book",
    body: "A book that is just another book",
    published: "2012",
    author: "2",
  },
  {
    id: "13",
    title: "Yet another book",
    body: "A book that is yet another book",
    published: "2013",
    author: "3",
  },
];

const resolvers = {
  Query: {
    me() {
      return {
        id: "abc123",
        name: "Mike",
        email: "mike@example.com",
        age: 28,
      };
    },
    post() {
      return {
        id: "abc123",
        title: "New Book",
        body: "A good book",
        published: "2001",
      };
    },
    users() {
      return Users;
    },
    posts() {
      return Posts;
    },
    // Four arguments are passed to all resolvers
    // args: holds the arguments
    // parent: holds data for, say, a parent query
    // ctx: used to pass context data like, say, user logged in state
    // info: info regarding actual actions sent to the server
    greeting(parent, args, ctx, info) {
      if (!args.name) {
        return "Hello, stranger";
      } else {
        return `Hello, ${args.name}`;
      }
    },
    grades() {
      return [9, 10, 11, 12];
    },
    add(parent, args, ctx, info) {
      let sum = 0;
      args.numbers.forEach((number) => {
        sum += number;
      });
      return sum;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return Users.find((user) => {
        return user.id === parent.author;
      });
    },
  },
};

// Create graphql server
const server = new GraphQLServer({
  typeDefs: typeDefinitions,
  resolvers: resolvers,
});

server.start(() => {
  console.log("Server up on default port");
  // Default port: 4000
});
