const router = require('express').Router();

// Import any controllers needed here
const { authUser,
    createUser,
    updateUser,
    getAllUsers,
    getOneUser,
    verifyUser,
    removeUser
 } = require('../../controllers/user-controller');

// Declare the routes that point to the controllers above
router.route('/').post(createUser).get(getAllUsers);
router.route('/auth').post(authUser);
router.route('/verify').post(verifyUser);
router.route('/:id').put(updateUser).get(getOneUser).delete(removeUser);

module.exports = router;
