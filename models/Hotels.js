const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Hotels', {
    HotID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    HotName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    QRFile: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    QRUrl: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CreateDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Hotels',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "HotID" },
        ]
      },
      {
        name: "idx_Hotels",
        using: "BTREE",
        fields: [
          { name: "HotID" },
        ]
      },
    ]
  });
};
