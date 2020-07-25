const Query = {
  users(parent, args, { prisma }, info) {
    return prisma.user.findMany({
      where: { ...args },
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(args.query.toLowerCase());
      const isBodyMatch = post.body
        .toLowerCase()
        .includes(args.query.toLowerCase());
      return isTitleMatch || isBodyMatch;
    });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
  me() {
    return {
      id: "123098",
      name: "Mike",
      email: "mike@example.com",
    };
  },
  post() {
    return {
      id: "092",
      title: "GraphQL 101",
      body: "",
      published: false,
    };
  },
};

export default Query;
