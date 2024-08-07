/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as("home")

router.get('/register', [AuthController, 'register']).as("auth.register")
router.post('/register', [AuthController, 'handleregister'])
router.get('/login', [AuthController, 'login']).as("auth.login")
