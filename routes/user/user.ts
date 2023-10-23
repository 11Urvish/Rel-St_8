const path = require('path')
import UserController from "../../controllers/user.controller";
import commonHelper from "../../helpers/common";

import * as UserValidation from './../../helpers/validation/user.validation';
const { CreateUser, Login,Get121User,Get121UserById,GetUser,GetUserById,UpdateUser,DeleteUser,GetUserByPk} = new UserController();

const { CheckValidationError,VerifyToken } = new commonHelper();

module.exports = function (router) {
    //router.post('/v1/create-user',UserValidation['User'],CheckValidationError,CreateUser);
    router.post('/v1/create-user',CreateUser);
    router.post('/v1/login', Login);
    router.get('/v1/get-user', VerifyToken,GetUser);
    router.get('/v1/get121User', Get121User);
    router.get('/v1/get-userById/:iUserId', VerifyToken,GetUserById);
    router.get('/v1/get-userByPk', VerifyToken,GetUserByPk);
    router.get('/v1/get121user/:iUserId', Get121UserById);
    router.patch('/v1/update-user/:iUserId', UpdateUser);
    router.patch('/v1/delete-user/:iUserId', DeleteUser);
}
