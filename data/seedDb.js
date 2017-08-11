import casual from 'casual';
import _ from 'lodash';

// create mock data with a seed, so we always get the same
casual.seed(123);

// @todo /6/ Можно ведь и генерить наполнение моделей автоматически, основываясь на инстроспекции
export default function seedDb(db) {
  const { Observation, Unit, Person } = db.models;
  db.sync({ force: true }).then(() => {
    Promise.all([seedUnits(Unit), seedPersons(Person)]).then(([units, persons]) => {
      _.times(10, () => {
        return Observation.create({
          evidence: casual.sentences(2),
          date: casual.date('YYYY-MM-DD'),
          requirement: casual.sentences(2),
          type: casual.random_element(ObservationType),
          // date: casual.date,
          status: casual.random_element(ObservationStatus),
        }).then((observation) => {
          observation.setUnit(casual.random_element(units));
          observation.setPerson(casual.random_element(persons));
        });
      });
    });
  });
}

// @returns {Promise} - промис на создание в БД unita
function seedUnits(Unit) {
  return Promise.all(UnitNames.map((unitName) => Unit.create({ name: unitName })));
}
// @returns {Promise} - промис на создание в БД unita
function seedPersons(Person) {
  return Promise.all(_.times(7, () => Person.create({
    firstName: casual.first_name,
    secondName: casual.last_name,
  })));
}

const ObservationType = [
  'NONCONFORMANCE_MAJOR',
  'NONCONFORMANCE_MINOR',
  'RECOMMENDATION',
];
const ObservationStatus = [
  'NEED_ACTION_PLAN',
  'ACTIONS_IN_PROGRESS',
  'REMOVED',
  'CLOSED',
];
const ActionType = [
  'BLOCKING_ACTION',
  'CORRECTION',
  'CORRECTIVE_ACTION',
  'MITIGATION',
  'IMPROVE_ACTION',
  'CORRECTIVE_ACTIONS_NOT_NECESSARY',
];

const UnitNames = [
  'Marketing Dept',
  'Production Dept',
  'Sales Dept',
  'Service Dept',
];