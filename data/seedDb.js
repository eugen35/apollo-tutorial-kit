import casual from 'casual';
import _ from 'lodash';

// create mock data with a seed, so we always get the same
casual.seed(123);

//@todo /6/ Можно ведь и генерить наполнение моделей автоматически, основываясь на инстроспекции
//casual.array_of_words(n = 7)
export default function seedDb(db){
  const { Observation, Unit } = db.models;
  db.sync({ force: true }).then(() => {
    seedUnits(Unit).then((units) => {
      _.times(10, () => {
        return Observation.create({
          evidence: casual.sentences(2),
          requirement: casual.sentences(2),
          type: casual.random_element(ObservationType),
          // date: casual.date,
          status: casual.random_element(ObservationStatus),
        }).then((observation) => {
          return observation.setUnit(casual.random_element(units));
        });
      });
    });
  });
}

// @returns {Promise} - промис на создание в БД unita
function seedUnits(Unit) {
  return Promise.all(UnitNames.map((unitName) => Unit.create({ name: unitName })));
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