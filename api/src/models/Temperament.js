const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('temperament', {
    id:{
      type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false
  });
};