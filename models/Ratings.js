const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Ratings', {
    RatID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    HotID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    RevID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PostingDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CreateDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    UID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Ratings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RatID" },
          { name: "RevID" },
        ]
      },
      {
        name: "idx_Ratings",
        using: "BTREE",
        fields: [
          { name: "RatID" },
          { name: "RevID" },
          { name: "HotID" },
          { name: "PostingDate" },
        ]
      },
    ]
  });
};
