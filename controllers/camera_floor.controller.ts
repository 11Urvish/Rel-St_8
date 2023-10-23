"use strict";

import commonHelper from "../helpers/common";
import Camera_FloorService from "../services/camera_floor.services";
const { commonResponse } = new commonHelper();
export default class Camera_FloorController {
  common: Camera_FloorService;
  constructor() {
    this.common = new Camera_FloorService();
    this.CreateCamera_Floor = this.CreateCamera_Floor.bind(this);
    this.GetCamera_Floor = this.GetCamera_Floor.bind(this);
    this.GetCamera_FloorById = this.GetCamera_FloorById.bind(this);
    this.DeleteCamera_Floor = this.DeleteCamera_Floor.bind(this);
    this.GetByCameraId = this.GetByCameraId.bind(this);
    this.GetByFloorId = this.GetByFloorId.bind(this);
    this.GetAll = this.GetAll.bind(this);
    this.GetOneAll = this.GetOneAll.bind(this);
  }

  CreateCamera_Floor(req, res) {
    this.common.CreateCamera_Floor(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetAll(req, res) {
    this.common.GetAll(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetOneAll(req, res) {
    this.common.GetOneAll(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetCamera_Floor(req, res) {
    this.common.GetCamera_Floor(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetByCameraId(req, res) {
    this.common.GetByCameraId(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }


  GetByFloorId(req, res) {
    this.common.GetByFloorId(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetCamera_FloorById(req, res) {
    this.common.GetCamera_FloorById(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
  DeleteCamera_Floor(req, res) {
    this.common.DeleteCamera_Floor(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
}
