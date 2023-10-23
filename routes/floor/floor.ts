const path = require('path')
import FloorController from "../../controllers/floor.controller";
import commonHelper from "../../helpers/common";
//import * as FloorValidation from './../../helpers/validation/floor.validation';
const { CreateFloor, GetFloor, GetFloorById, UpdateFloor, DeleteFloor ,GetFloorByUserId,GetAllFloorCamera} = new FloorController();

const { CheckValidationError ,VerifyToken} = new commonHelper();

module.exports = function (router) {
    router.post('/v1/create-floor',VerifyToken,CreateFloor);
    router.get('/v1/get-floor', GetFloor);
    router.get('/v1/getAllFloorCamera',VerifyToken, GetAllFloorCamera);
    router.get('/v1/get-floor/:iFloorId', GetFloorById);
    router.get('/v1/get-floorByUser', GetFloorByUserId);
    // router.get('/v1/get-floorByCamera/:iCameraId', GetFloorByCameraId);
    router.patch('/v1/update-floor/:iFloorId', UpdateFloor);
    router.patch('/v1/delete-floor/:iFloorId', DeleteFloor);
}
