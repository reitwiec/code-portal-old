module.exports = (sequelize, DataTypes) => {
	let Language = sequelize.define('languages' , {
		id: {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement: true
		},
		code: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true
		},
		name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		multiplier: {
			type: DataTypes.DOUBLE,
			allowNull: false
		}
	});
	return Language;
}