import Sequelize from 'sequelize';
import seedDb from './seedDb';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const ObservationModel = db.define('observation', {
  evidence: { type: Sequelize.STRING },
  date: { type: Sequelize.DATE }
});

const UnitModel = db.define('unit', {
  name: { type: Sequelize.STRING } // @todo /1/ А как сослаться самой на себя в секулайзе?
});

//ready
const PersonModel = db.define('person', {
  firstName: { type: Sequelize.STRING },
  secondName: { type: Sequelize.STRING },
  patronymic: { type: Sequelize.STRING }
});

// @todo /1/ Requirement - это просто JSON - зачем на него модель тратить?

const AuditReportModel = db.define('auditReport', {
  isApproved: { type: Sequelize.BOOLEAN }, //@todo /1/ А что в sequelize взамен boolean
  approvalDate: { type: Sequelize.DATE }
});

const ActionPlanModel = db.define('actionPlan', {
  isApproved: { type: Sequelize.BOOLEAN }, //@todo /1/ А что в sequelize взамен boolean
  approvalDate: { type: Sequelize.DATE }
});

const ActionModel = db.define('action', {
  deadline: Date
  description: String
  responsible: Person
  type: ActionType
  completionPercentage: Int
  actualDueDate: Date
  observations: [OBSERVATION]
});

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

seedDb(db);

const Author = db.models.author;
const Post = db.models.post;

export { Author, Post };
