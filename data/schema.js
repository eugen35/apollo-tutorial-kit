import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Observation {
  id: Int
  evidence: String
  requirement: Requirement
  type: ObservationType
  unit: Unit  
  date: Date  
  auditor: Person
  actions: [Action]
  status: ObservationStatus    
}
enum ObservationType {
  NONCONFORMANCE MAJOR
  NONCONFORMANCE MINOR
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
  deadline: Date
  description: String
  responsible: Person 
  type: ActionType
  completionPercentage: Int
  actualDueDate: Date
  observations: [OBSERVATION]    
}
enum ActionType {
  BLOCKING_ACTION
  CORRECTION
  CORRECTIVE_ACTION
  MITIGATION
  IMPROVE_ACTION
  CORRECTIVE_ACTIONS_NOT_NECESSARY    
}


type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}
type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}
type Query {
  author(firstName: String, lastName: String): Author
  getFortuneCookie: String
}
`;
//Встал вопрос, как быть с нормативным документом внешним и внутренним - см. тип NormativeDocument

export default makeExecutableSchema({ typeDefs, resolvers });