const Comment = require("./model/comment");

class FakeDb {

  constructor() {
    this.comments = [
      {
        date: '2021-03-01 08:32:21.000000',
        message: 'おつでーす！',
        user: [
          {initial: '佐'},
          {name: '佐藤 考太'},
          {uid: 1}
        ],
      },
      {
        date: '2021-03-01 08:32:22.000000',
        message: '作業終わったー？',
        user: [
          {initial: '佐'},
          {name: '佐藤 考太'},
          {uid: 1}],
      },
      {
        date: '2021-03-01 08:32:47.000000',
        message: 'おつでーす！',
        user: [
          {initial: '森'},
          {name: '森井 將裕'},
          {uid: 2}],
      },
      {
        date: '2021-03-01 08:32:48.000000',
        message: '終わってまーす',
        user: [
          {initial: '森'},
          {name: '森井 將裕'},
          {uid: 2}],
      },
      {
        date: '2021-03-02 07:30:39.000000',
        message: 'aaaaaaaaa',
        user: [
          {initial: '佐'},
          {name: '佐藤 考太'},
          {uid: 1}],
      }
    ];
  }

  async initDb() {
    await this.cleanDb();
    this.pushCommentsToDb();
  }

  async cleanDb() {
    await Comment.deleteMany({});
  }

  pushCommentsToDb() {
    this.comments.forEach(
      (comments) => {
        const newProduct = new Product(comments);
        newProduct.save();
      }
    )
  }

  seeDb() {
    this.pushCommentsToDb();
  }
}

module.exports = FakeDb;
