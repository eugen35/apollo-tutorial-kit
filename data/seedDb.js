import casual from 'casual';
import _ from 'lodash';

// create mock data with a seed, so we always get the same
casual.seed(123);

export default function seedDb(db){
  const AuthorModel = db.models.author;
  db.sync({ force: true }).then(() => {
    _.times(10, () => {
      return AuthorModel.create({
        firstName: casual.first_name,
        lastName: casual.last_name,
      }).then((author) => {
        return author.createPost({
          title: `A post by ${author.firstName}`,
          text: casual.sentences(3),
        });
      });
    });
  });
}

