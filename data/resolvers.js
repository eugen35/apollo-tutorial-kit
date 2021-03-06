import db from './connectors';
const { Observation, Unit, Person, AuditReport, ActionPlan, Action } = db.models;

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
    actions(observation) { return observation.getActions(); },
    requirement(observation) { return JSON.parse(observation.requirement); },
  },
  Action: {
    responsible(action) { return action.getPerson(); },
    observations(action) { return action.getObservations(); },
  },
  AuditReport: {
    observations(auditReport) { return auditReport.getObservations(); },
  },
  ActionPlan: {
    actions(actionPlan) { return actionPlan.getActions(); },
  },
  Mutation: {
    addUnit(_, args) { return Unit.create(args.input); },
    updateUnit(_, { id, input }) { return Unit.update(input, { where: { id } }); },
    addAction(_, args) { return Action.create(args.input).then((action) => mutationResolverAnalogs.AddAction.addResponsible(action, args.input.responsible)); },
    addActionPlan(_, args) { return ActionPlan.create(args.input).then((actionPlan) => mutationResolverAnalogs.AddActionPlan.addActions(actionPlan, args.input.actions)); },
  },
};

const mutationResolverAnalogs = {
  AddAction: {
    addResponsible(action, args) {
      return Person.create(args).then((person) => {
        return action.setPerson(person); // Возвращать нужно всегда объект, который обещали вернуть по схеме
      });
    },
  },
  AddActionPlan: {
    addActions(actionPlan, args) {
      return Action.bulkCreate(args).then((actions) => { // Создаём массив из объектов action
        return Promise.all(actions.map((action, i) => mutationResolverAnalogs.AddAction.addResponsible(action, args[i].responsible))).then((actionsWithResponsibles) => actionPlan.setActions(actionsWithResponsibles));
      });
    },
  },
};



export default resolvers;
