import casual from 'casual';
import _ from 'lodash';

// create mock data with a seed, so we always get the same
casual.seed(123);

//@todo /6/ Можно ведь и генерить наполнение моделей автоматически, основываясь на инстроспекции
//casual.array_of_words(n = 7)
export default function seedDb(db){
  const AuthorModel = db.models.author;
  db.sync({ force: true }).then(() => {
    _.times(10, () => {
      return AuthorModel.create({
        firstName: casual.first_name,
        lastName: casual.last_name,
      }).then((author) => {
        return author.createPost({     //Да, есть такой синтаксис в sequelize: к имени модели (с заглавной буквы) спереди пишется create, add, get или set и т.п. Но есть и без таких слеплений синтаксис - тот что можно сгенерировать
          title: `A post by ${author.firstName}`,
          text: casual.sentences(3),
        });
      });
    });
  });
}

