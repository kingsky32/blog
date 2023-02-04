export default {
  Query: {
    user(parent, args, { prisma }) {
      return prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
};
