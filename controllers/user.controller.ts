"use strict";

import commonHelper from "../helpers/common";
import UserService from "../services/user.services";
const { commonResponse } = new commonHelper();
export default class UserController {
  common: UserService;
  constructor() {
    this.common = new UserService();
    this.CreateUser = this.CreateUser.bind(this);
    this.Login = this.Login.bind(this);
   this.GetUser = this.GetUser.bind(this);
    this.Get121User = this.Get121User.bind(this);
    this.GetUserByPk = this.GetUserByPk.bind(this)
    this.GetUserById = this.GetUserById.bind(this);
    this.Get121UserById = this.Get121UserById.bind(this);
    this.UpdateUser = this.UpdateUser.bind(this);
    this.DeleteUser = this.DeleteUser.bind(this);
  }

  CreateUser(req, res) {
    this.common.CreateUser(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  Login(req, res) {
    this.common.Login(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
  
   GetUser(req, res) {
    this.common.GetUser(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
  Get121User(req, res) {
    this.common.Get121User(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  Get121UserById(req, res) {
    this.common.Get121UserById(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetUserByPk(req, res) {
    this.common.GetUserByPk(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetUserById(req, res) {
    this.common.GetUserById(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  UpdateUser(req, res) {
    this.common.UpdateUser(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  DeleteUser(req, res) {
    this.common.DeleteUser(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
}
