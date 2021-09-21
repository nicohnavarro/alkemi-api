const {Router} = require('express');

const { getAllUsers,
        getUsersWithPagination,
        getUserById,
        createUser, 
        updateUser, 
        deleteUser 
} = require('../controllers/users')

const { postRequestValidations,
        putRequestValidations,
        deleteRequestValidations,
        getRequestValidations
} = require('../middlewares/users');

const routes = Router();

routes.get('/',getAllUsers);
routes.get('/pag',getRequestValidations,getUsersWithPagination);
routes.get('/:id',getRequestValidations,getUserById);
routes.post('/',postRequestValidations,createUser);
routes.put('/:id',putRequestValidations,updateUser);
routes.delete('/:id',deleteRequestValidations,deleteUser);

module.exports = routes;
