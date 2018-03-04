'use strict';

module.exports = {
	app: {
		title: 'Skeleton server',
		description: 'Skeleton server',
		url: ''
	},
	port: process.env.NODEJS_PORT || 8088,
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
	},
	ai: {
		wit: {
			accessToken: ""
		}
	}
};
