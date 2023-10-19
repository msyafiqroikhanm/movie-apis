const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customers', {
    CustID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PostingDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    Phone: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    Notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    CreateDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Customers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "CustID" },
        ]
      },
      {
        name: "idx_Customers",
        using: "BTREE",
        fields: [
          { name: "CustID" },
          { name: "UID" },
        ]
      },
    ]
  });
};
