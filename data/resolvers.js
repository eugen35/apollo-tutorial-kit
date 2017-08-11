import { Observation, Unit, Person, AuditReport, ActionPlan, Action } from './connectors';

const resolvers = {
  Query: {
    observation(_, args) {
      return Observation.find({ where: args }).then((concreteObservation) => {
        //concreteObservation.type = { observationType: concreteObservation.type };
        return concreteObservation;
      });
      // return Observation.find({ where: args });
    },
  },
  Observation: {
    unit(observation) { return observation.getUnit(); },
    auditor(observation) { return observation.getPerson(); },
    requirement(observation) { console.log(JSON.stringify(observation.requirement)); return JSON.parse(observation.requirement); },
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