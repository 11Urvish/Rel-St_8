"use strict";

import commonHelper from "../helpers/common";
import CameraService from "../services/camera.services";
const { commonResponse } = new commonHelper();
export default class CameraController {
  common: CameraService;
  constructor() {
    this.common = new CameraService();
    this.CreateCamera = this.CreateCamera.bind(this);
    this.GetCamera = this.GetCamera.bind(this);
    this.GetCameraByUserId = this.GetCameraByUserId.bind(this)
    this.GetCameraById = this.GetCameraById.bind(this);
    this.UpdateCamera = this.UpdateCamera.bind(this);
    this.DeleteCamera = this.DeleteCamera.bind(this);
    this.showAll = this.showAll.bind(this);
  }


  showAll(req, res) {
    this.common.showAll(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
  CreateCamera(req, res) {
    this.common.CreateCamera(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetCamera(req, res) {
    this.common.GetCamera(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetCameraByUserId(req, res) {
    this.common.GetCameraByUserId(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  } 

  GetCameraById(req, res) {
    this.common.GetCameraById(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  UpdateCamera(req, res) {
    this.common.UpdateCamera(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  DeleteCamera(req, res) {
    this.common.DeleteCamera(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
}
