
import { body } from 'express-validator';
const models = require('./../../models/index');
const { Op } = require("sequelize");


module.exports.User = [
  body('vFullName').trim().notEmpty().withMessage('UserFullNameRequired'),
  body('vFullName').trim().isLength({min:2}).withMessage('UserFullNameMinLengthRequired'),
  body('vFullName').trim().isLength({max:15}).withMessage('UserFullNameMaxLengthRequired'),
  body('iPhoneNo').trim().notEmpty().withMessage('UserPhoneNoRequired'),
  body('iPhoneNo').trim().isLength({min:2}).withMessage('UserPhoneNoMinLengthRequired'),
  body('iPhoneNo').trim().isLength({max:15}).withMessage('UserPhoneNoMaxLengthRequired'),
  body('vPassword').trim().notEmpty().withMessage('UserPasswordRequired'),
  body('vPassword').trim().isLength({min:2}).withMessage('UserPasswordMinLengthRequired'),
  body('vPassword').trim().isLength({max:15}).withMessage('UserPasswordMaxLengthRequired'),
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

