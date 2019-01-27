module.exports = (sequelize, DataTypes) => {
	let Subtestcases = sequelize.define('subtestcases' , {
		id: {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement: true
		},
		verdict: {
			type: DataTypes.ENUM('ac','wa','tle','ce','re','proc'),
			allowNull: false
		},
		submission: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references:{
				model:"submissions",
				key:"id"
			}
		}
	});
	return Subtestcases;
}