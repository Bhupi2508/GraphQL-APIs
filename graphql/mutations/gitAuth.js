/********************************************************************************************************************
 *  @Execution      : default node          : cmd> gitAuth.js
 *                      
 * 
 *  @Purpose        : perform operations by using gitHub server
 * 
 *  @description    : By mutation give path for github server a new files
 * 
 *  @overview       : fundoo application  
 *  @author         : Bhupendra Singh <bhupendrasingh.ec18@gmail.com>
 *  @version        : 1.0
 *  @since          : 20-april-2019
 *
 *******************************************************************************************************************/
/**
 * @requires files
 */
const { GraphQLNonNull, GraphQLString } = require('graphql')
var gitAuthType = require('../types/gitAuthType').gitauthType
var sendMail = require('../../sendMailer/sendMail')

//create a empty function
var gitAuthMutation = function () { }

/*******************************************************************************************************************/
/**
 * @description : social auth2.0 for github login using graphql
 * @purpose : For fetch data by using CURD operation
 */
gitAuthMutation.prototype.GithubAuth = {
    type: gitAuthType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },

    /**
     * @param {*} root 
     * @param {*} params 
     */
    async resolve(root, params) {
        try {

            /**
             * @param {String}, create a code, which is redirect in graphiql
             * @returns {String} message
             */
            var url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.Git_Link}`

            //sent mail to the mail id
            var mail = sendMail.sendEmailFunction(url, params.email)
            if (!mail) {
                return { "message": "mail not sent" }
            }
            return { "message": "Mail sent to your mail ID" }

        } catch (err) {
            console.log("!Error")
        }
    }
}


/*******************************************************************************************************************/
/**
 * @description : code verify for auth2.0 for github login using graphql
 * @purpose : For fetch data by using CURD operation
 */
gitAuthMutation.prototype.codeVerify = {
    type: gitAuthType,
    args: {
        email: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },

    /**
     * @param {*} root 
     * @param {*} params 
     */
    async resolve(root, params, context) {
        try {

            /**
             * @param {String}, create a access_token, which is redirect in graphiql
             * @returns {String} message
             */
            var url = `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&redirect_uri=${process.env.Git_Link}&code=${context.code}`

            //sent mail to the mail id
            var mail = sendMail.sendEmailFunction(url, params.email)
            if (!mail) {
                return { "message": "mail not sent" }
            }
            return { "message": "Mail sent to your mail ID" }

        } catch (err) {
            console.log("!Error")
        }
    }
}


/*******************************************************************************************************************/
/**
 * @description : code verify for auth2.0 for github login using graphql
 * @purpose : For fetch data by using CURD operation
 */
gitAuthMutation.prototype.getInformationGithub = {
    type: gitAuthType,
    args: {
        access_token: {
            type: new GraphQLNonNull(GraphQLString),
        },
        scope: {
            type: new GraphQLNonNull(GraphQLString),
        },
        token_type: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },

    /**
     * @param {*} root 
     * @param {*} params 
     */
    async resolve(root, params, context) {
        try {
            return { "message": "Data fetch successfully" }

        } catch (err) {
            console.log("!Error")
        }
    }
}



/**
* @exports gitAuthMutation
*/
module.exports = new gitAuthMutation()