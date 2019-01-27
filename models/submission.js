module.exports = (sequelize, DataTypes) => {
	let Submission = sequelize.define('submission' , {
		id: {
			type: DataTypes.BIGINT,
			primaryKey:true,
			autoIncrement: true
		},
		user: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references:{
				model:"users",
				key:"id"
			}
		},
		question: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references:{
				model:"questions",
				key:"id"
			}
		},
		contest: {
			type: DataTypes.BIGINT,
			allowNull: false,
			references:{
				model:"contests",
				key:"id"
			}
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
			type: DataTypes.ENUM('wrong','partial','correct','ce'),
			allowNull: false
		},
		language: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references:{
				model:"languages",
				key:"id"
			}
		}
	});
	return Submission;
}