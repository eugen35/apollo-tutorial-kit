import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLDate } from 'graphql-iso-date';
import resolvers from './resolvers';

const queryDefs = `
scalar Date
scalar JSON
type Observation {
  id: Int
  evidence: String
  date: Date
  requirement: Requirement
  type: ObservationType
  unit: Unit    
  auditor: Person
  actions: [Action]
  status: ObservationStatus    
}
enum ObservationType {
  NONCONFORMANCE_MAJOR
  NONCONFORMANCE_MINOR
  RECOMMENDATION  
}
enum ObservationStatus {  
  NEED_ACTION_PLAN
  ACTIONS_IN_PROGRESS
  REMOVED
  CLOSED
}
type Unit {
  id: Int
  name: String
  subordinated: Unit
  manages: [Unit]  
}
type Person {
  id: Int
  firstName: String
  secondName: String
  patronymic: String
}
type Requirement {
  normativeDocument: String
  clause: String
  quote: String
}
type AuditReport {
  id:Int
  observations: [Observation]
  isApproved: Boolean
  approvalDate: Date
}
type ActionPlan {
  id: Int
  actions:[Action]
  isApproved: Boolean
  approvalDate: Date  
}
type Action {
  id: Int
  description: String
  responsible: Person 
  type: ActionType
  completionPercentage: Int  
  observations: [Observation]      
}
enum ActionType {
  BLOCKING_ACTION
  CORRECTION
  CORRECTIVE_ACTION
  MITIGATION
  IMPROVE_ACTION
  CORRECTIVE_ACTIONS_NOT_NECESSARY    
}
type Query {  
  observation(id: Int): Observation
  observations(params: String): [Observation]
  units(id: Int): [Unit]  
  persons(id: Int): [Person]
  actions(id: Int): [Action]  
  auditReports(id: Int): [AuditReport]  
  actionPlans(id: Int): [ActionPlan]  
}
`;

const mutationDefs = `
type Mutation {
  addUnit(input: UnitInput): Unit
  updateUnit(id: Int, input: UnitInput): Unit  
  addAction(input: ActionInput): Action  
  addActionPlan(input: ActionPlanInput): ActionPlan  
}
input UnitInput {  
  name: String    
}
input ActionInput {
  description: String
  responsible: PersonInput 
  type: ActionType
  completionPercentage: Int  
}
input ActionPlanInput {
  actions:[ActionInput]
  isApproved: Boolean
  approvalDate: Date  
}
input PersonInput {
  firstName: String
  secondName: String
  patronymic: String
}
`

// @todo /3/ Встал вопрос, как быть с нормативным документом внешним и внутренним - см. тип NormativeDocument

export default makeExecutableSchema({ typeDefs: [queryDefs, mutationDefs], resolvers: { ... resolvers, Date: GraphQLDate } });