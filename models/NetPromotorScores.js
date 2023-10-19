const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NetPromotorScores', {
    NPSID: {
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
    tableName: 'NetPromotorScores',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "NPSID" },
        ]
      },
      {
        name: "idx_nps",
        using: "BTREE",
        fields: [
          { name: "NPSID" },
          { name: "HotelID" },
        ]
      },
    ]
  });
};
