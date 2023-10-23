
"use strict";
const models = require('./../models/index');
const Camera_Floor = require('./../models/index');
const Camera = require('./../models/index');
import commonHelper from "../helpers/common";
import { HttpCodes } from "../helpers/responseCodes";
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
const { getEpoch, CreateJwt, ComparePassword } = new commonHelper();
const db = require("../models/index");
const Op = db.Sequelize.Op;
import jwt from "jsonwebtoken";

export default class FloorService {

  constructor() {
    this.CreateFloor = this.CreateFloor.bind(this);
    this.GetFloor = this.GetFloor.bind(this);
    this.GetFloorById = this.GetFloorById.bind(this);
    this.UpdateFloor = this.UpdateFloor.bind(this);
    this.DeleteFloor = this.DeleteFloor.bind(this);
    this.GetAllFloorCamera = this.GetAllFloorCamera.bind(this);
    // this.GetFloorByCameraId = this.GetFloorByCameraId.bind(this)
    this.GetFloorByUserId = this.GetFloorByUserId.bind(this);
  }


  async GetAllFloorCamera(req, callback) {
    const iUserId = req.userId;
    try {
      const allData = await models.Floor.findAll({where:{iUserId},
        attributes: ["iFloorId","iUserId", "vName"],

        include: [{
          model: db.Camera_Floor,
          attributes: ["iFloorId", "iCameraId"],
          include: [{
            model: db.Camera,
            attributes: ["vName","iUserId", "vType"]
        }],
      }]
    });
          //   {
          //     model: models.Camera_Floor,all: true
          //     //attributes: ["iFloorId", "iCameraId"]
          // }, 
          
  
        // include:[
        //   {models:Camera_Floor},{all: true},
        //   {models:Camera},{all: true}]
       
        //include: {models:Camera, all: true },
     
      if (allData) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "GetCandidate",
          code: HttpCodes["OK"],
          data: allData,
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
  // async GetFloorByCameraId(req, callback) {
  //   const { iCameraId } = req.params;
  //   try {
  //     const sData = await models.Floor.findAll({where: { iCameraId }});
  //     if (sData.length > 0) {
  //       return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: sData });
  //     } else {
  //       return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
  //     }
  //   } catch (error) {
  //     console.log(error, 'error.....');
  //     return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
  //   }
  // }

  async GetFloorByUserId(req, callback) {
    const { iUserId } = req.params;
  // const userId  = req.iUserId
    try {
      const sData = await models.Floor.findAll({where: { iUserId }});
      if (sData) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: sData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }


  async CreateFloor(req, callback) {
    const { vName} = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    console.log(decoded.iUserId);
    try {
      const salt = await bcrypt.genSalt(10);
      let createFloor = await models.Floor.build({
        vName,iUserId:decoded.iUserId,
        iCreatedAt: await getEpoch()
      });
      await createFloor.save();
      return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'CreateUser', code: HttpCodes['CREATED'], data: {} });
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }


  async GetFloor(req, callback) {
    try {
      
      const floorData = await models.Floor.findAll();
      if (floorData.length > 0) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: floorData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async GetFloorById(req, callback) {
    const { iFloorId } = req.params;
    try {
      const floorData = await models.Floor.findAll({where: { iFloorId }});
      if (floorData.length > 0) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: floorData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async UpdateFloor(req, callback) {
    const { vNo} = req.body;
    const { iFloorId } = req.params;
    try {
      const updateFloorData = await models.Floor.update(
        {
          vNo,
          iUpdatedAt: await getEpoch()
        },
        { where: { iFloorId } }
      )
      if (updateFloorData[0] === 1) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'UpdateUser', code: HttpCodes['OK'], data: {} });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'UpdateUserFailed', code: HttpCodes['NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async DeleteFloor(req, callback) {
    const { iFloorId } = req.params;
    try {
      const deleteCamera = await models.Camera_Floor.destroy(
        { where: { iFloorId } }
      );
      const deleteFloor = await models.Floor.destroy(
        // {
        //   bIsDelete: true,
        //   iDeletedAt: await getEpoch()
        // },
        { where: { iFloorId } }
      );
      
      
      if (deleteFloor) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'DeleteFloor', code: HttpCodes['OK'], data: deleteCamera });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'DeleteFloorFailed', code: HttpCodes['NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }
}
