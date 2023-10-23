const app = require('express').Router();

module.exports = (function () {

    //User Route
    var AdminRoutes = require("./admin/router");
    app.use('/admin', AdminRoutes);

    var UserRoutes = require("./user/router");
    app.use('/user', UserRoutes);

    var CameraRoutes = require("./camera/router");
    app.use('/camera', CameraRoutes);

    var FloorRoutes = require("./floor/router");
    app.use('/floor', FloorRoutes);

    var Camera_FloorRoutes = require("./camera_floor/router");
    app.use('/camera_floor', Camera_FloorRoutes);

    return app;
})();
