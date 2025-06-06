import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const LicencesController = () => import('#controllers/licences_controller')
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.post('/auth/signup', [UsersController, 'signup'])
    router.post('/auth/login', [UsersController, 'login'])
    router.post('/auth/logout', [UsersController, 'logout']).use(middleware.auth())
    router.get('/auth/me', [UsersController, 'me']).use(middleware.auth())
    router.get('/auth/check', [UsersController, 'check']).use(middleware.auth())

    router.post('/licences/payment', [LicencesController, 'createPayment'])
  })
  .prefix('api')
