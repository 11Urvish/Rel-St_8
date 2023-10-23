"use strict";

import commonHelper from "../helpers/common";
import FloorService from "../services/floor.services";
const { commonResponse } = new commonHelper();
export default class FloorController {
  common: FloorService;
  constructor() {
    this.common = new FloorService();
    this.CreateFloor = this.CreateFloor.bind(this);
    this.GetFloor = this.GetFloor.bind(this);
    this.GetFloorById = this.GetFloorById.bind(this);
    this.UpdateFloor = this.UpdateFloor.bind(this);
    this.GetFloorByUserId = this.GetFloorByUserId.bind(this)
    this.DeleteFloor = this.DeleteFloor.bind(this);
    this.GetAllFloorCamera = this.GetAllFloorCamera.bind(this);
    // this.GetFloorByCameraId = this.GetFloorByCameraId.bind(this)
  }


  GetAllFloorCamera(req, res) {
    this.common.GetAllFloorCamera(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  } 


  GetFloorByUserId(req, res) {
    this.common.GetFloorByUserId(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  } 
  CreateFloor(req, res) {
    this.common.CreateFloor(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  GetFloor(req, res) {
    this.common.GetFloor(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
  // GetFloorByCameraId(req, res) {
  //   this.common.GetFloorByCameraId(req, async (error, result) => {
  //     await commonResponse(res, error, result);
  //   });
  // }

  GetFloorById(req, res) {
    this.common.GetFloorById(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  UpdateFloor(req, res) {
    this.common.UpdateFloor(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }

  DeleteFloor(req, res) {
    this.common.DeleteFloor(req, async (error, result) => {
      await commonResponse(res, error, result);
    });
  }
}
