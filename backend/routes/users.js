const usersRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getMyUser,
} = require('../controllers/users');
const { getUserByIdValidation, updateUserInfoValidation, updateUserAvatarValidation } = require('../middlewares/validation');

usersRoutes.get('/', getUsers);
usersRoutes.get('/me', getMyUser);

usersRoutes.get('/:_id', getUserByIdValidation, getUserById);
usersRoutes.patch('/me', updateUserInfoValidation, updateUserInfo);
usersRoutes.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = usersRoutes;
