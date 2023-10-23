
"use strict";
const models = require('./../models/index');
import commonHelper from "../helpers/common";
import { HttpCodes } from "../helpers/responseCodes";
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
const { getEpoch, VerifyToken,CreateJwt, ComparePassword } = new commonHelper();
const db = require("../models/index");
const Op = db.Sequelize.Op;
import jwt from "jsonwebtoken";

export default class CameraService {

  constructor() {
    this.CreateCamera = this.CreateCamera.bind(this);
    this.GetCamera = this.GetCamera.bind(this);
    this.GetCameraByUserId = this.GetCameraByUserId.bind(this);
    this.GetCameraById = this.GetCameraById.bind(this);
    this.UpdateCamera = this.UpdateCamera.bind(this);
    this.DeleteCamera = this.DeleteCamera.bind(this);
    this.showAll = this.showAll.bind(this);
  }


  async showAll(req, callback) {
    try {
      const userData = await models.Camera.findAll({
        attributes: ["vName","vType","iUserId"],

        include: [{
          model: db.User,
          attributes: ["vFullName", "iPhoneNo"],
        }]
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

  async CreateCamera(req, callback) {
    const { vName,vType, vDetail } = req.body;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    console.log(decoded.iUserId);

    try {
      let createCamera = await models.Camera.build({
        vName,
        vType,
        vDetail,
        iUserId:decoded.iUserId,
        iCreatedAt: await getEpoch()
      });
      await createCamera.save();
      return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'CreateUser', code: HttpCodes['CREATED'], data: {} });
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }


  async GetCamera(req, callback) {
    try {
      
      const cameraData = await models.Camera.findAll();
      if (cameraData.length > 0) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: cameraData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async GetCameraByUserId(req, callback) {
    const userId  = req.userId
    console.log(userId,"user ni Id");
    try {
      const cameraData = await models.Camera.findAll( {where:{ iUserId:userId }});
      if (cameraData) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: cameraData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async GetCameraById(req, callback) {
    const { iCameraId } = req.params;
    try {
      const cameraData = await models.Camera.findAll({where: { iCameraId }});
      if (cameraData.length > 0) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: cameraData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async UpdateCamera(req, callback) {
    const { vName, vType, vDetail } = req.body;
    const { iCameraId } = req.params;
    try {
      const updateCameraData = await models.Camera.update(
        {
          vName,
          vType,vDetail,
          iUpdatedAt: await getEpoch()
        },
        { where: { iCameraId } }
      )
      if (updateCameraData[0] === 1) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'UpdateUser', code: HttpCodes['OK'], data: {} });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'UpdateUserFailed', code: HttpCodes['NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async DeleteCamera(req, callback) {
    const { iCameraId } = req.params;
    try {
      const deleteCamera = await models.Camera.update(
        {
          bIsDelete: true,
          iDeletedAt: await getEpoch()
        },
        { where: { iCameraId } }
      );
      
      if (deleteCamera[0] === 1) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'DeleteCamera', code: HttpCodes['OK'], data: {} });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'DeleteCameraFailed', code: HttpCodes['NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }
}
