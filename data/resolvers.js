import { Observation, Unit, Person, AuditReport, ActionPlan, Action } from './connectors';

const resolvers = {
  Query: {
    observation(_, args) {
      return Observation.find({ where: args });
    },
  },
  Observation: {
    unit(observation) { return observation.getUnit(); },
  },
};

export default resolvers;
/*
 Author: {
 posts(author) {
 return author.getPosts();
 },
 },
 Post: {
 author(post) {
 return post.getAuthor();
 },
 },
 */