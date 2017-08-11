import casual from 'casual';
import _ from 'lodash';

// create mock data with a seed, so we always get the same
casual.seed(123);

// @todo /6/ Можно ведь и генерить наполнение моделей автоматически, основываясь на инстроспекции
export default async function seedDb(db) {
  const { Observation, Unit, Person, Action } = db.models;
  await db.sync({ force: true });
  const units = await seedUnits(Unit);
  const persons = await seedPersons(Person);
  const observations = await seedObservations({ Observation, units, persons });
  const actions = await seedActions({ Action, persons });
}

// @returns {Promise[]} - промис на массив созданных в БД unitов
function seedUnits(Unit) {
  return Promise.all(UnitNames.map((unitName) => Unit.create({ name: unitName })));
}
// @returns {Promise[]} - промис на массив созданных в БД персонс
function seedPersons(Person) {
  return Promise.all(_.times(7, () => Person.create({
    firstName: casual.first_name,
    secondName: casual.last_name,
  })));
}

// @returns {Promise[]} - промис на массив созданных в БД observations
function seedObservations ({ Observation, units, persons }) {
  return Promise.all(_.times(10, () => Observation.create({
    evidence: casual.sentences(2),
    date: casual.date('YYYY-MM-DD'),
    requirement: JSON.stringify({
      normativeDocument: casual.random_element([
        'ISO 9001:2015', 'ISO 14001:2015', 'OHSAS 18001:2007'
      ]),
      clause: casual.random_element([
        '4.1', '4.2', '5.1', '5.2', '5.3', '6.1', '7.1', '7.2', '7.3', '8.1', '9.1', '10.1'
      ]),
      quote: casual.sentences(2),
    }),
    type: casual.random_element(ObservationType),
    // date: casual.date,
    status: casual.random_element(ObservationStatus),
  }).then((observation) => { //После создания привяжем к нему person и unit
    observation.setUnit(casual.random_element(units));
    observation.setPerson(casual.random_element(persons));
  })
  ));
}

// @returns {Promise[]} - промис на массив созданных в БД актионс
function seedActions({ Action, persons }) {
  return Promise.all(_.times(20, () => Action.create({
    description: casual.sentence,
    type: casual.random_element(ActionType),
    completionPercentage: Math.round(casual.random * 100),
    //observations: [Observation]
  }).then((action) => { //После создания привяжем к нему person
    action.setPerson(casual.random_element(persons));
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