const path = require('path')
import CameraController from "../../controllers/camera.controller";
import commonHelper from "../../helpers/common";
// import * as CameraValidation from './../../helpers/validation/camera.validation';
const { CreateCamera,GetCamera,showAll, GetCameraById, UpdateCamera, DeleteCamera ,GetCameraByUserId} = new CameraController();

const { CheckValidationError ,VerifyToken} = new commonHelper();

module.exports = function (router) {
    router.get('/v1/allGet', showAll);
    router.post('/v1/create-camera',VerifyToken, CreateCamera);
    router.get('/v1/get-camera',VerifyToken, GetCamera);
    router.get('/v1/get-camera/:iCameraId', GetCameraById);
    router.get('/v1/get-cameraByUser',VerifyToken, GetCameraByUserId);
    router.patch('/v1/update-camera/:iCameraId', UpdateCamera);
    router.patch('/v1/delete-camera/:iCameraId', DeleteCamera);
}
