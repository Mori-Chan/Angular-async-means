const Comment = require("./model/comment");
const User = require("./model/user");

class FakeDb {

  constructor() {
    this.comments = [
      {
        date: '2021-03-01 08:32:21.000000',
        message: 'おつでーす！',
        uid: 1
      },
      {
        date: '2021-03-01 08:32:22.000000',
        message: '作業終わったー？',
        uid: 1
      },
      {
        date: '2021-03-01 08:32:47.000000',
        message: 'おつでーす！',
        uid: 2
      },
      {
        date: '2021-03-01 08:32:48.000000',
        message: '終わってまーす',
        uid: 2
      },
      {
        date: '2021-03-02 07:30:39.000000',
        message: 'aaaaaaaaa',
        uid: 1
      }
    ];
    this.users = [
      {
        initial: '佐',
        name: '佐藤 考太',
        uid: 1
      },
      {
        initial: '森',
        name: '森井 將裕',
        uid: 2
      }
    ];
  }

  async initDb() {
    await this.cleanDb();
    this.pushUsersToDb();
    this.pushCommentsToDb();
  }

  async cleanDb() {
    await Comment.deleteMany({});
    await User.deleteMany({});
  }

  pushCommentsToDb() {
    this.comments.forEach(
      (comments) => {
        const newComment = new Comment(comments);
        newComment.save();
      }
    )
  }

  pushUsersToDb() {
    this.users.forEach(
      (users) => {
        const newUser = new User(users);
        newUser.save();
      }
    )
  }

  seeDb() {
    this.pushUsersToDb();
    this.pushCommentsToDb();
  }
}

module.exports = FakeDb;
