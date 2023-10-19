const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Reviews', {
    RevID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    HotelID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Review: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    CreateDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Reviews',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "RevID" },
        ]
      },
      {
        name: "idx_reviews",
        using: "BTREE",
        fields: [
          { name: "RevID" },
          { name: "HotelID" },
        ]
      },
    ]
  });
};
