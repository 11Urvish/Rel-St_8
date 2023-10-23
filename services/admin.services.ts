
"use strict";
const models = require('./../models/index');
import commonHelper from "../helpers/common";
import { HttpCodes } from "../helpers/responseCodes";
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
const { getEpoch, CreateJwt, ComparePassword } = new commonHelper();
const db = require("../models/index");
const Op = db.Sequelize.Op;

export default class AdminService {

  constructor() {
    this.CreateAdmin = this.CreateAdmin.bind(this);
    this.Login = this.Login.bind(this);
    this.GetAdmin = this.GetAdmin.bind(this);
    this.GetAdminById = this.GetAdminById.bind(this);
    this.UpdateAdmin = this.UpdateAdmin.bind(this);
    this.DeleteAdmin = this.DeleteAdmin.bind(this);
  }

  async CreateAdmin(req, callback) {
    const { vName, vEmail, vPhone, vPassword } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(vPassword, salt);
      let createAdmin = await models.Admin.build({
        vName,
        vEmail,
        vPhone,
        vPassword: hashedPassword,
        iCreatedAt: await getEpoch()
      });
      await createAdmin.save();
      return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'CreateUser', code: HttpCodes['CREATED'], data: {} });
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async Login(req, callback) {
    const { vEmail, vPassword } = req.body;    
    try {
      let admin = await models.Admin.findOne({where:{ vEmail }});
      if (admin && admin !== undefined) {
        const password = await ComparePassword(vPassword, admin.vPassword);
        if (password) {
          let adminId = { iAdminId: admin.iAdminId };
          const token = await CreateJwt(adminId);
          let adminLogin = await models.AdminLogin.build({
            iAdminId: admin.iAdminId,
            iDeviceType: 1,
            vAccessToken: token,
            iCreatedAt: await getEpoch()
          });
          await adminLogin.save();
          return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'Login', code: HttpCodes['OK'], data: { vToken: token } });
        } else {
          return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'LoginInvalidValue', code: HttpCodes['UNAUTHORIZED'] });
        }
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'EmailNotRegister', code: HttpCodes['UNAUTHORIZED'] });
      }
    } catch (error) {
      console.log(error.message, "Login");
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'LoginFailed', code: HttpCodes['BAD_REQUEST'] });
    }
  }

  async GetAdmin(req, callback) {
    try {
      
      const adminData = await models.Admin.findAll();
      if (adminData.length > 0) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: adminData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async GetAdminById(req, callback) {
    const { iAdminId } = req.params;
    try {
      const adminData = await models.Admin.findAll({where: { iAdminId }});
      if (adminData.length > 0) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetCandidate', code: HttpCodes['OK'], data: adminData });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ContentNotFound', code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async UpdateAdmin(req, callback) {
    const { vName, vPhone } = req.body;
    const { iAdminId } = req.params;
    try {
      const updateAdminData = await models.Admin.update(
        {
          vName,
          vPhone,
          iUpdatedAt: await getEpoch()
        },
        { where: { iAdminId } }
      )
      if (updateAdminData[0] === 1) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'UpdateUser', code: HttpCodes['OK'], data: {} });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'UpdateUserFailed', code: HttpCodes['NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }

  async DeleteAdmin(req, callback) {
    const { iAdminId } = req.params;
    try {
      const deleteAdmin = await models.Admin.update(
        {
          bIsDelete: true,
          iDeletedAt: await getEpoch()
        },
        { where: { iAdminId } }
      );
      
      if (deleteAdmin[0] === 1) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'DeleteAdmin', code: HttpCodes['OK'], data: {} });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'DeleteAdminFailed', code: HttpCodes['NOT_FOUND'], data: {} });
      }
    } catch (error) {
      console.log(error, 'error.....');
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'ApiFailed', code: HttpCodes["BAD_REQUEST"], data: error });
    }
  }
}
