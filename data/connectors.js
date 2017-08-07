import Sequelize from 'sequelize';
import seedDb from './seedDb';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const Observation = db.define('Observation', {
  evidence: { type: Sequelize.STRING },
  requirement: { type: Sequelize.STRING }, // Здесь будем JSON-хранить. Зачем отдельная таблица?
  type: { type: Sequelize.STRING },
  date: { type: Sequelize.DATE },
  status: { type: Sequelize.STRING }
});

const Unit = db.define('Unit', {
  name: { type: Sequelize.STRING } // @todo /1/ А как сослаться самой на себя в секулайзе?
});

// ready
const Person = db.define('Person', {
  firstName: { type: Sequelize.STRING },
  secondName: { type: Sequelize.STRING },
  patronymic: { type: Sequelize.STRING }
});

// @todo /1/ Requirement - это просто JSON - зачем на него модель тратить?

const AuditReport = db.define('AuditReport', {
  isApproved: { type: Sequelize.BOOLEAN },
  approvalDate: { type: Sequelize.DATE },
});

const ActionPlan = db.define('ActionPlan', {
  isApproved: { type: Sequelize.BOOLEAN },
  approvalDate: { type: Sequelize.DATE },
});

const Action = db.define('Action', {
  deadline: { type: Sequelize.DATE },
  description: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  completionPercentage: { type: Sequelize.INTEGER },
  actualDueDate: { type: Sequelize.DATE },
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

Observation.belongsTo(Unit); // `unitId` will be added on Observation (Source model)
Observation.belongsTo(Person);

// @todo /4/ Приходится создавать доптаблицу для связи "многие ко многим". Её имя или даже ее саму можно напрямую в конфигурации прописывать
Observation.belongsToMany(Action, { through: 'ObservationAction' });
Action.belongsToMany(Observation, { through: 'ObservationAction' });

AuditReport.hasMany(Observation);
ActionPlan.hasMany(Action);


seedDb(db);

const Author = db.models.author;
const Post = db.models.post;

export { Author, Post };
