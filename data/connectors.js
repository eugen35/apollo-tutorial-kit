import Sequelize from 'sequelize';
import seedDb from './seedDb';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const Observation = db.define('Observation', {
  evidence: { type: Sequelize.STRING },
  date: {type: Sequelize.DATEONLY},
  requirement: { type: Sequelize.STRING }, // Здесь будем JSON-хранить. Зачем отдельная таблица?
  type: { type: Sequelize.STRING },
  //date: { type: Sequelize.DATE },
  status: { type: Sequelize.STRING },
});

const Unit = db.define('Unit', {
  name: { type: Sequelize.STRING }, // @todo /1/ А как сослаться самой на себя в секулайзе?
});

// ready
const Person = db.define('Person', {
  firstName: { type: Sequelize.STRING },
  secondName: { type: Sequelize.STRING },
  patronymic: { type: Sequelize.STRING },
});

const AuditReport = db.define('AuditReport', {
  isApproved: { type: Sequelize.BOOLEAN },
  //approvalDate: { type: Sequelize.DATE },
});

const ActionPlan = db.define('ActionPlan', {
  isApproved: { type: Sequelize.BOOLEAN },
  //approvalDate: { type: Sequelize.DATE },
});

const Action = db.define('Action', {
  //deadline: { type: Sequelize.DATE },
  description: { type: Sequelize.STRING },
  type: { type: Sequelize.STRING },
  completionPercentage: { type: Sequelize.INTEGER },
  //actualDueDate: { type: Sequelize.DATE },
});


Observation.belongsTo(Unit); // `unitId` will be added on Observation (Source model)
Observation.belongsTo(Person);

// @todo /4/ Приходится создавать доптаблицу для связи "многие ко многим". Её имя или даже ее саму можно напрямую в конфигурации прописывать
Observation.belongsToMany(Action, { through: 'ObservationAction' });
Action.belongsToMany(Observation, { through: 'ObservationAction' });

AuditReport.hasMany(Observation);
ActionPlan.hasMany(Action);


seedDb(db);

module.exports = db.models;
