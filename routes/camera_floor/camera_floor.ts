const path = require('path')
import Camera_FloorController from "../../controllers/camera_floor.controller";
import commonHelper from "../../helpers/common";
// import * as Camera_FloorValidation from '../../helpers/validation/camera_floor.validation';
const { GetAll,GetOneAll,CreateCamera_Floor,GetCamera_Floor, GetCamera_FloorById, DeleteCamera_Floor,GetByCameraId,GetByFloorId} = new Camera_FloorController();

const { CheckValidationError,VerifyToken } = new commonHelper();
;
module.exports = function (router) {

    router.get('/v1/getAll', GetAll);
    router.get('/v1/getOneAll', GetOneAll);
    router.post('/v1/create-camera_floor',VerifyToken, CreateCamera_Floor);
    router.get('/v1/get-camera_floor', GetCamera_Floor);
    router.get('/v1/get-camera_floor/:iCamera_FloorId', GetCamera_FloorById);
    router.patch('/v1/delete-camera_floor/:iCamera_FloorId', DeleteCamera_Floor);
    router.get('/v1/get-Byfloor/:iFloorId', GetByFloorId);
    router.get('/v1/get-ByCamera/:iCameraId', GetByCameraId);
}
