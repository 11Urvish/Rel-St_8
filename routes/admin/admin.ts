const path = require('path')
import AdminController from "../../controllers/admin.controller";
import commonHelper from "./../../helpers/common";
import * as AdminValidation from './../../helpers/validation/admin.validation';
const { CreateAdmin, Login, GetAdmin, GetAdminById, UpdateAdmin, DeleteAdmin } = new AdminController();

const { CheckValidationError } = new commonHelper();

module.exports = function (router) {
    router.post('/v1/create-admin', CreateAdmin);
    router.post('/v1/login', Login);
    router.get('/v1/get-admin', GetAdmin);
    router.get('/v1/get-admin/:iAdminId', GetAdminById);
    router.patch('/v1/update-admin/:iAdminId', UpdateAdmin);
    router.patch('/v1/delete-admin/:iAdminId', DeleteAdmin);
}
