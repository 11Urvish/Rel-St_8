"use strict";
const models = require("./../models/index");
import commonHelper from "../helpers/common";
import { HttpCodes } from "../helpers/responseCodes";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
const { getEpoch, CreateJwt, ComparePassword } = new commonHelper();
const db = require("../models/index");
const Op = db.Sequelize.Op;

export default class UserService {
  constructor() {
    this.CreateUser = this.CreateUser.bind(this);
    this.Login = this.Login.bind(this);
    this.GetUser = this.GetUser.bind(this);
    this.Get121User = this.Get121User.bind(this);
    this.Get121UserById = this.Get121UserById.bind(this);
    this.GetUserById = this.GetUserById.bind(this);
    this.UpdateUser = this.UpdateUser.bind(this);
    this.GetUserByPk = this.GetUserByPk.bind(this);
    this.DeleteUser = this.DeleteUser.bind(this);
  }

  async Get121User(req, callback) {
    try {
      const userData = await models.User.findAll({
        attributes: ["iUserId", "vFullName", "iPhoneNo", "vEmail"],
        // include:[{
        //     models:Cameras,
        //     attributes:['iCameraId','iUserId','vName','vType','vDetail']
        // }]
        include: { all: true },
        // include:[{models:Camera},{all:true}]
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

  async Get121UserById(req, callback) {
    const { iUserId } = req.params;
    try {
      const userData = await models.User.findAll({
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

  async CreateUser(req, callback) {
    const { vFullName, vEmail, iPhoneNo, vPassword } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(vPassword, salt);
      let createUser = await models.User.build({
        vFullName,
        vEmail,
        iPhoneNo,
        vPassword: hashedPassword,
        iCreatedAt: await getEpoch(),
      });
      await createUser.save();
      return callback(null, {
        status: HttpCodes["API_SUCCESS"],
        msg: "CreateUser",
        code: HttpCodes["CREATED"],
        data: {},
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

  //     let userId = { iUserId: user.iUserId };
  //     console.log(userId);
  //     const token = await CreateJwt(userId);
  //     console.log(token);
  //     let userLogin = await models.UserLogin.build({
  //             iUserId: user.iUserId,
  //             VAccessToken: token,
  //             iCreatedAt: await getEpoch(),
  //           });
  //           await userLogin.save();
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
  async Login(req, callback) {
    const { vEmail, vPassword } = req.body;
    try {
      let user = await models.User.findOne({ where: { vEmail } });
      if (!user) {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "LoginInvalidValue",
          code: HttpCodes["UNAUTHORIZED"],
        });
      }
      const password = await ComparePassword(vPassword, user.vPassword);
      if (!password) {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "LoginInvalidValue",
          code: HttpCodes["UNAUTHORIZED"],
        });
      }
      let userId = { iUserId: user.iUserId };
      console.log(userId);
      let userLogin = await models.UserLogin.findOne({
        where: { iUserId: user.iUserId },
      });
      if (userLogin) {
        const token = await CreateJwt(userId);
        console.log(token);
        userLogin.VAccessToken = token;
        userLogin.iCreatedAt = await getEpoch();
        await userLogin.save();
      } else {
        const token = await CreateJwt(userId);
        console.log(token);
        userLogin = await models.UserLogin.build({
          iUserId: user.iUserId,
          VAccessToken: token,
          iCreatedAt: await getEpoch(),
        });
        await userLogin.save();
      }
      return callback(null, {
        status: HttpCodes["API_SUCCESS"],
        msg: "Login",
        code: HttpCodes["OK"],
        data: { Token: userLogin.VAccessToken },
      });
    } catch (error) {
      console.log(error.message, "Login");
      return callback(null, {
        status: HttpCodes["API_FAILURE"],
        msg: "LoginFailed",
        code: HttpCodes["BAD_REQUEST"],
      });
    }
  }
  async GetUser(req, callback) {
    try {
      const userData = await models.User.findAll();
      if (userData.length > 0) {
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

  async GetUserById(req, callback) {
    const { iUserId } = req.params;
    try {
      const userData = await models.User.findAll({ where: { iUserId } });
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
  async GetUserByPk(req, callback) {
    const userId = req.userId;
    try {
      const userData = await models.User.findByPk(userId);
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

  async UpdateUser(req, callback) {
    const { vFullName, iPhoneNo } = req.body;
    const { iUserId } = req.params;
    try {
      const updateUserData = await models.User.update(
        {
          vFullName,
          iPhoneNo,
          iUpdatedAt: await getEpoch(),
        },
        { where: { iUserId } }
      );
      if (updateUserData[0] === 1) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "UpdateUser",
          code: HttpCodes["OK"],
          data: {},
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "UpdateUserFailed",
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

  async DeleteUser(req, callback) {
    const { iUserId } = req.params;
    try {
      const deleteUser = await models.User.update(
        {
          bIsDelete: true,
          iDeletedAt: await getEpoch(),
        },
        { where: { iUserId } }
      );

      if (deleteUser[0] === 1) {
        return callback(null, {
          status: HttpCodes["API_SUCCESS"],
          msg: "DeleteUser",
          code: HttpCodes["OK"],
          data: {},
        });
      } else {
        return callback(null, {
          status: HttpCodes["API_FAILURE"],
          msg: "DeleteUserFailed",
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
