import { Observation, Unit, Person, AuditReport, ActionPlan, Action } from './connectors';

const resolvers = {
  Query: {
    observations(_, args) { // Возвращает все найденные observation
      // raw: true тут писать не нужно, т.к. если далее мы попросим связанные модели
      // например, unit, то ничего не выйдет - у чистого json уже нет метода getUnit()
      return Observation.findAll({ where: args });
    },
    observation(_, args) { // Возвращает один observation
      console.log(args);
        return Observation.find({ where: args });
    },
  },
  Observation: {
    unit(observation) { return observation.getUnit(); },
    auditor(observation) { return observation.getPerson(); },
    requirement(observation) { return JSON.parse(observation.requirement); },
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