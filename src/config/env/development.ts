'use strict';

module.exports = {
	app: {
		title: 'Skeleton server',
		description: 'Skeleton server',
		url : 'http://localhost:8085'
	},
	port: process.env.NODEJS_PORT || 8085,
	hostname: process.env.NODEJS_IP || 'localhost',
	db: {
		mssql: {
			root: {
				user: '',
				password: '',
				server: '',
				database: '',
				options: {
					trustedConnection: false
				}
			}
		},
		geode: {
			host: 'http://localhost:8111',
			dbinfo: {
				myregion: '/myregion'
			}
		},
		sequelize: {
			mydb: {
				dialect: "mssql",
				host: "",
				username: "",
				password: "",
				database: "",
				dialectOptions: {
					port: 1433
				}
			}
		}
	},
	ai: {
		wit: {
			accessToken: ""
		}
	}
};
