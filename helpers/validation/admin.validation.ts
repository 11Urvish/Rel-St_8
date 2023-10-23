
import { body } from 'express-validator';
const models = require('./../../models/index');
const { Op } = require("sequelize");


module.exports.CreateAdmin = [
  body('vFirstName').trim().notEmpty().withMessage('UserFirstNameRequired'),
  body('vFirstName').trim().isLength({min:2}).withMessage('UserFirstNameMinLengthRequired'),
  body('vFirstName').trim().isLength({max:15}).withMessage('UserFirstNameMaxLengthRequired'),
  body('vLastName').trim().notEmpty().withMessage('UserLastNameRequired'),
  body('vLastName').trim().isLength({min:2}).withMessage('UserLastNameMinLengthRequired'),
  body('vLastName').trim().isLength({max:15}).withMessage('UserLastNameMaxLengthRequired'),
  body('vEmail').trim().notEmpty().withMessage('UserEmailRequired'),
  body('vEmail').trim().isEmail().withMessage('ValidEmailFormat'),
  body('vEmail').trim().custom(async (value, { req }) => {
    return new Promise<void>((resolve, reject) => {
      return models.User.findOne({
        where:{
          vEmail: {[Op.eq]: value},
          bIsDeleted:false
        }
      }).then(user => {
        if (user && user !== null && user !== undefined) {
          return reject();
        } else {
          return resolve();
        }
      }).catch((err) => {
        return reject();
      });
    });
  }).withMessage('ExistUser')
];

