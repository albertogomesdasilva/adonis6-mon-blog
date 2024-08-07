import User from "#models/user"
import { registerUserValidator } from '#validators/auth'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { writeFile } from "fs"
import { toPng } from 'jdenticon'

export default class AuthController {
  register({view} : HttpContext) {
    return view.render('pages/auth/register')
  }

  async handleregister ( {request, session, response} : HttpContext) {
     const {email, password, thumbnail, username} = await request.validateUsing(registerUserValidator)

     if(!thumbnail) {
        const png = toPng(username, 100)
         writeFile(app.makePath("public/users"), png, (err) => {
          if(err) {  console.log(err)
          }
        })

     }else{
      await thumbnail.move(app.makePath("public/users"), {name : `${cuid()}.${thumbnail.extname}`})
     }

     const filePath = `users/${thumbnail?.fileName || username + ".png"}`
      await User.create({email, username, thumbnail: filePath, password})
      session.flash("success", "Registro realizado com Sucesso.")
      return response.redirect().toRoute("auth.login")
    }


  login({view} : HttpContext) {

    return view.render('pages/auth/login')
  }
}
