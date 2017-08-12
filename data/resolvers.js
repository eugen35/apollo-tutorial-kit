import { Observation, Unit, Person, AuditReport, ActionPlan, Action } from './connectors';

const resolvers = {
  Query: {
    observations(_, args) { // Возвращает все найденные observation
      // raw: true тут писать не нужно, т.к. если далее мы попросим связанные модели
      // например, unit, то ничего не выйдет - у чистого json уже нет метода getUnit()
      // Почему-то если в schema применять библиотечку с типом JSON, чтобы передать сюда JSON
      // то args будет равно {params: false}. Может это особенность библиотечки?
      // @todo /3/ Может, нужно использовать input type?
      return Observation.findAll({ where: JSON.parse(args.params) });
    },
    // Возвращает один observation
    observation(_, args) { return Observation.find({ where: args }); },
    units(_, args) { return Unit.findAll({ where: args }); },
    persons(_, args) { return Person.findAll({ where: args }); },
    actions(_, args) { return Action.findAll({ where: args }); },
    auditReports(_, args) { return AuditReport.findAll({ where: args }); },
    actionPlans(_, args) { return ActionPlan.findAll({ where: args }); },
  },
  Observation: {
    unit(observation) { return observation.getUnit(); },
    auditor(observation) { return observation.getPerson(); },
    requirement(observation) { return JSON.parse(observation.requirement); },
  },
  Action: {
    responsible(action) { return action.getPerson(); },
  },
  AuditReport: {
    observations(auditReport) { return auditReport.getObservations(); },
  },
  ActionPlan: {
    actions(actionPlan) { return actionPlan.getActions(); },
  },
};

export default resolvers;
