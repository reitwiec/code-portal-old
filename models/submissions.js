module.exports = (sequelize, DataTypes) => {
	let Submission = sequelize.define('submissions' , {
		id: {
			type: DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement: true
		},
		user: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		question: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		contest: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		path: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true
		},
		points: {
			type: DataTypes.DOUBLE,
			allowNull:false
		},
		verdict: {
			type: DataTypes.ENUM('wrong','partial','correct'),
			allowNull: false
		},
		language: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});
	return Submission;
}