'use strict';

module.exports = {
	app: {
		title: 'Skeleton server',
		description: 'Skeleton server',
		url: ''
	},
	port: process.env.NODEJS_PORT || 9000,
	hostname: process.env.NODEJS_IP || 'localhost',
	authorization: 'mysecrettoken',
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
			},
		}
	},
	ai: {
		wit: {
			accessToken: ""
		}
	}
};
