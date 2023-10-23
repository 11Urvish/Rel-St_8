"use strict";
const models = require("./../models/index");
import commonHelper from "../helpers/common";
import { HttpCodes } from "../helpers/responseCodes";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
const { getEpoch, CreateJwt, ComparePassword } = new commonHelper();
const db = require("../models/index");
const Op = db.Sequelize.Op;
import jwt from "jsonwebtoken";

export default class Camera_FloorService {
  constructor() {
    this.CreateCamera_Floor = this.CreateCamera_Floor.bind(this);
    this.GetCamera_Floor = this.GetCamera_Floor.bind(this);
    this.GetCamera_FloorById = this.GetCamera_FloorById.bind(this);
    this.DeleteCamera_Floor = this.DeleteCamera_Floor.bind(this);
    this.GetByCameraId = this.GetByCameraId.bind(this);
    this.GetByFloorId = this.GetByFloorId.bind(this);
    this.GetAll = this.GetAll.bind(this);
    this.GetOneAll = this.GetOneAll.bind(this);
  }

  async GetAll(req, callback) {
    try {
      const userData = await models.Camera_Floor.findAll({
        attributes: ["iFloorId", "iCameraId"],

        include: [
          {
            model: db.Camera,
            as : "Camera",
            // all: true
            attributes: ["vName", "vType","vDetail"]},
                     
            {
              model: db.Floor,
              as : "Floor",
              // all: true,
              attributes: ["vName"]
            }
      ]
            // include: [
            //   {
            //     model: db.Floor,
            //     as : "Floor",
            //     attributes: ["vName"]
            //   },]
             
      });
      if (userData) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "GetCandidate",
          code: HttpCodes["OK"],
          data: userData,
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "ContentNotFound",
          code: HttpCodes["CONTENT_NOT_FOUND"],
          data: {},
        });
      }
    } catch (error) {
      console.log(error, "error.....");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "ApiFailed",
        code: HttpCodes["BAD_REQUEST"],
        data: error,
      });
    }
  }

  async GetOneAll(req, callback) {
    const { iUserId } = req.params;
    try {
      const userData = await models.Camera_Floor.findAll({
        attributes: ["iUserId", "vFullName", "iPhoneNo", "vEmail"],
        include: { all: true },
        where: { iUserId },
      });
      if (userData) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "GetCandidate",
          code: HttpCodes["OK"],
          data: userData,
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "ContentNotFound",
          code: HttpCodes["CONTENT_NOT_FOUND"],
          data: {},
        });
      }
    } catch (error) {
      console.log(error, "error.....");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "ApiFailed",
        code: HttpCodes["BAD_REQUEST"],
        data: error,
      });
    }
  }

  // async CreateCamera_Floor(req, callback) {
  //   const { iFloorId, iCameraId} = req.body;
  //   try {
  //     let createCamera_Floor = await models.Camera_Floor.build({
  //       iFloorId, iCameraId,
  //       iCreatedAt: await getEpoch()
  //     });
  //     await createCamera_Floor.save();
  //     return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'CreateUser', code: HttpCodes['CREATED'], data: {} });
  //   } catch (error) {
  //     console.log(error, 'error.....');
  //     return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
  //   }
  // }

  async CreateCamera_Floor(req, callback) {
    const {vName ,Camera} = req.body;
    //  console.log(Floor.vName)
    // console.log(Camera.vName)
    // console.log(Camera.vType)
    // console.log(Camera.vDetail)
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded.iUserId);
    try {
      const addFloor = await models.Floor.build({
        vName:vName,
        iUserId: decoded.iUserId,
        iCreatedAt: await getEpoch(),

      });
      await addFloor.save();

    //   const addCamera = await models.Camera.build({
    //     vName:Camera.vName,
    //     vType:Camera.vType,
    //     vDetail:Camera.vDetail,
    //     iUserId: decoded.iUserId,
    // });
    // await addCamera.save();


    //   const addCamera_Floor = await models.Camera_Floor.build({
    //     iFloorId: addFloor.iFloorId,
    //     iCameraId: addCamera.iCameraId,
    //     iCreatedAt: await getEpoch(),
    //   });
    //   await addCamera_Floor.save();
    // const cameras = [];
    // for (const camera of Camera) {
    //   cameras.push({
    //     vName: camera.vName,
    //     vType: camera.vType,
    //     vDetail: camera.vDetail,
    //     iUserId: decoded.iUserId,
    //   });
    // }
    // const addCameras = await models.Camera.bulkCreate(cameras);

    const Floorcamera = [];
    for (const cameraFloor of Camera ) {
      Floorcamera.push({
        iFloorId: addFloor.iFloorId,
        iCameraId: cameraFloor.iCameraId,
        iCreatedAt: await getEpoch(),
      });
    }
    await models.Camera_Floor.bulkCreate(Floorcamera);

      return callback(null, {
        status: HttpCodes["API_SUCCESS"],
        msg: "CreateUser",
        code: HttpCodes["CREATED"],
        data:{}
        ,
      });
    } catch (error) {
      console.log(error, "error.....");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "ApiFailed",
        code: HttpCodes["BAD_REQUEST"],
        data: error,
      });
    }
  }

//     // const addCamera = await models.Camera.bulkCreate([
  //     //   {vName:Camera.vName ,vType:Camera.vType,vDetail:Camera.vDetail,iUserId: decoded.iUserId},
  //       // {vName:Camera.vName}
  //     //   // {vType:Camera.vType},
  //     //   // {vDetail:Camera.vDetail},
  //     //   // {iUserId: decoded.iUserId},
  //     // ]);
  //     // //await addCamera.save();
      
  //     // const cameraData = ({
  //     //   vName,
  //     //   vType,
  //     //   vDetail,
  //     //   iUserId: decoded.iUserId,
  //     // });
  //     // const addCamera = await models.Camera.bulkCreate([cameraData]);
  //     // await addCamera.save();


  async GetByCameraId(req, callback) {
    const { iCameraId } = req.params;
    try {
      const camera_floorData = await models.Camera_Floor.findAll({
        where: { iCameraId },
      });
      if (camera_floorData.length > 0) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "GetCandidate",
          code: HttpCodes["OK"],
          data: camera_floorData,
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "ContentNotFound",
          code: HttpCodes["CONTENT_NOT_FOUND"],
          data: {},
        });
      }
    } catch (error) {
      console.log(error, "error.....");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "ApiFailed",
        code: HttpCodes["BAD_REQUEST"],
        data: error,
      });
    }
  }

  async GetByFloorId(req, callback) {
    const { iFloorId } = req.params;
    try {
      const camera_floorData = await models.Camera_Floor.findAll({
        where: { iFloorId },
      });
      if (camera_floorData.length > 0) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "GetCandidate",
          code: HttpCodes["OK"],
          data: camera_floorData,
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "ContentNotFound",
          code: HttpCodes["CONTENT_NOT_FOUND"],
          data: {},
        });
      }
    } catch (error) {
      console.log(error, "error.....");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "ApiFailed",
        code: HttpCodes["BAD_REQUEST"],
        data: error,
      });
    }
  }

  async GetCamera_Floor(req, callback) {
    try {
      const camera_floorData = await models.Camera_Floor.findAll();
      if (camera_floorData.length > 0) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "GetCandidate",
          code: HttpCodes["OK"],
          data: camera_floorData,
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "ContentNotFound",
          code: HttpCodes["CONTENT_NOT_FOUND"],
          data: {},
        });
      }
    } catch (error) {
      console.log(error, "error.....");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "ApiFailed",
        code: HttpCodes["BAD_REQUEST"],
        data: error,
      });
    }
  }

  async GetCamera_FloorById(req, callback) {
    const { iCamera_FloorId } = req.params;
    try {
      const camera_floorData = await models.Camera_Floor.findAll({
        where: { iCamera_FloorId },
      });
      if (camera_floorData.length > 0) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "GetCandidate",
          code: HttpCodes["OK"],
          data: camera_floorData,
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "ContentNotFound",
          code: HttpCodes["CONTENT_NOT_FOUND"],
          data: {},
        });
      }
    } catch (error) {
      console.log(error, "error.....");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "ApiFailed",
        code: HttpCodes["BAD_REQUEST"],
        data: error,
      });
    }
  }

  async DeleteCamera_Floor(req, callback) {
    const { iCamera_FloorId } = req.params;
    try {
      const deleteCamera_Floor = await models.Camera_Floor.update(
        {
          bIsDelete: true,
          iDeletedAt: await getEpoch(),
        },
        { where: { iCamera_FloorId } }
      );

      if (deleteCamera_Floor[0] === 1) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "DeleteCamera_Floor",
          code: HttpCodes["OK"],
          data: {},
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "DeleteCamera_FloorFailed",
          code: HttpCodes["NOT_FOUND"],
          data: {},
        });
      }
    } catch (error) {
      console.log(error, "error.....");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "ApiFailed",
        code: HttpCodes["BAD_REQUEST"],
        data: error,
      });
    }
  }
}

// async Login(req, callback) {
//   const { vEmail, vPassword } = req.body;
//   try {
//     let user = await models.User.findOne({ where: { vEmail } });
//     if (!user) {
//       return callback(null, {
//         status: HttpCodes["API_FAILURE"],
//         msg: "LoginInvalidValue",
//         code: HttpCodes["UNAUTHORIZED"]
//       });
//     }
//     const password = await ComparePassword(vPassword, user.vPassword);
//     if (!password) {
//       return callback(null, {
//         status: HttpCodes["API_FAILURE"],
//         msg: "LoginInvalidValue",
//         code: HttpCodes["UNAUTHORIZED"],
//       });
//     }
//     // let userId = { iUserId: user.iUserId };
//     //     console.log(userId);
//     //     const token = await CreateJwt(userId);
//     //     console.log(token);
//     //     let userLogin = await models.UserLogin.build({
//     //       iUserId: user.iUserId,
//     //       vAccessToken: token,
//     //       iCreatedAt: await getEpoch(),
//     //     });
//     //     await userLogin.save();

//     let userId = { iUserId: user.iUserId };

//     console.log(userId);
//     const token = await CreateJwt(userId);
//     console.log(token);
//     // let userLogin = await models.UserLogin.build({
//     //         iUserId: user.iUserId,
//     //         vAccessToken: token,
//     //         iCreatedAt: await getEpoch(),
//     //       });
//     //       await userLogin.save();
//       return callback(null, {
//         status: HttpCodes["API_SUCCESS"],
//         msg: "Login",
//         code: HttpCodes["OK"],
//         data: { Token: token },
//       });

//   } catch (error) {
//     console.log(error.message, "Login");
//     return callback(null, {
//       status: HttpCodes["API_FAILURE"],
//       msg: "LoginFailed",
//       code: HttpCodes["BAD_REQUEST"],
//     });
//   }
// }
