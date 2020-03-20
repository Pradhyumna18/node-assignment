'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activities = sequelize.define('Activities', {
    activity: DataTypes.STRING,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    date: DataTypes.DATEONLY,
    userId: DataTypes.INTEGER
  }, {});
  Activities.associate = function(models) {
    // associations can be defined here
    Activities.belongsTo(models.Users,{foreignKey: 'userId'});
    models.Users.hasOne(Activities,{foreignKey:"userId"})
  };
  return Activities;
};