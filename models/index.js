var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  getterMethods: {
    route: function(){
      return '/wiki/' + this.getDataValue('urlTitle');
    }
  },
  // hooks does not support 'this', getter does
  hooks: {
    beforeValidate: function(page, options) {
      //console.log(page);
      var title = page.title;
      page.urlTitle = function (title) {
        // if title is empty, generate random title
        return title ? title.replace(/\s+/g, '_').replace(/\W/g, '')
               : "New_article_" + Math.floor(Math.random() * 100000);
      }(title);
    }
  }
});

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,

  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  Page: Page,
  User: User
};

