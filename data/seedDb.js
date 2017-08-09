import casual from 'casual';
import _ from 'lodash';

// create mock data with a seed, so we always get the same
casual.seed(123);

//@todo /6/ Можно ведь и генерить наполнение моделей автоматически, основываясь на инстроспекции
//casual.array_of_words(n = 7)
export default function seedDb(db){
  const Observation = db.models.Observation;
  db.sync({ force: true }).then(() => {
    _.times(10, () => {
      return Observation.create({
        evidence: casual.sentences(2),
        requirement: casual.sentences(2),
        type: casual.random_element(ObservationType),
        //date: casual.date,
        status: casual.random_element(ObservationStatus),
      })//.then((author) => {
        //return author.createPost({     //Да, есть такой синтаксис в sequelize: к имени модели (с заглавной буквы) спереди пишется create, add, get или set и т.п. Но есть и без таких слеплений синтаксис - тот что можно сгенерировать
         // title: `A post by ${author.firstName}`,
          //text: casual.sentences(3),
        //});
      //});
    });
  });
}

const ObservationType = [
  'NONCONFORMANCE MAJOR',
  'NONCONFORMANCE MINOR',
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
