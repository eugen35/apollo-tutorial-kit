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
  auditor: Auditor
  unitRepresentative: Worker
  actions: [Action]    
}
type Unit {
  id: Int
  name: String
  organization: Organization
  subordinated: Unit
  manages: [Unit]  
}
type Organization {
  id: Int
  name: String
}
type Auditor {
  id: Int
  worker: Worker
}
type Worker {
  id: Int
  unit: Unit
  position: String
}
type Person {
  id: Int
  firstName: String
  secondName: String
  patronymic: String
  workPlaces: [Worker]
}
type Requirement {
  normativeDocument: NormativeDocument
  clause: String
  quote: String
}
NormativeDocument {
  id: Int
  name: String
  approvalDate: Date
  designation: String
  status: DocumentStatus
}
enum DocumentStatus {
  DRAFT
  ACTUAL
  WITHDRAWN
}
enum ObservationType {
  NONCONFORMANCE MAJOR
  NONCONFORMANCE MINOR
  RECOMMENDATION  
}
type Action {
  deadline: Date
  description: String
  responsible: Worker 
  type: ActionType
  completionPercentage: Int
  actualDueDate: Date
  perfomanceStatus: PerfomanceStatus
  observations: [OBSERVATION]    
}
enum PerfomanceStatus {
  EFFECTIVELLY
  NOT_EFFECTIVELLY
}
enum ActionType {
  BLOCKING_ACTION
  CORRECTION
  CORRECTIVE_ACTION
  MITIGATION
  IMPROVE_ACTION
  NOT_NECESSARY    
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
