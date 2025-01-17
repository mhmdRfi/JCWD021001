import {
  registerService,
  emailVerificationService,
  loginService,
  keepLoginService,
  forgotPasswordService,
  resetPasswordService,
  googleLoginService,
  newUnverifiedEmailService,
  verifyNewEmailService,
} from '../services/auth.services'

//POST USER REGISTRATION
export const registerController = async (req, res) => {
  try {
    const { email, username } = req.body

    const result = await registerService(email, username)

    return res.status(200).json({
      message: 'Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const emailVerificationController = async (req, res) => {
  try {
    const token = req.query.token
    if (typeof token !== 'string') {
      return res.status(400).json({
        message: 'Invalid token format',
      })
    }
    const { password } = req.body
    const result = await emailVerificationService(token, password)
    return res.status(200).json({
      message: 'Success',
      data: result,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await loginService(email, password)

    return res.status(200).json({
      message: 'Success',
      data: result,
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).send(err.message)
  }
}

export const keepLoginController = async (req, res) => {
  try {
    const { id } = req.user

    const result = await keepLoginService(id)

    return res.status(200).json({
      message: 'Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body
    const result = await forgotPasswordService(String(email))
    return res.status(200).json({
      message: 'Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.query
    const { password } = req.body
    console.log("ini token", token, "ini password", password);
    const result = await resetPasswordService(token, password)
    return res.status(200).json({
      message: 'Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export const googleLoginController = async (req, res) => {
  try {
    const {email, username} = req.body
    const response = await googleLoginService(email, username)
    return res.status(200).json({
      message: 'Success',
      data: response,
    })
  } catch (err){
    return res.status(500).send(err.message)
  }
}

export const newUnverifiedEmailController = async (req, res) => {
  try {
    const { email } = req.body
    const result = await newUnverifiedEmailService(String(email))
    return res.status(200).json({
      message: 'Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export const verifyNewEmailController = async (req, res) => {
  try {
    const token = req.query.token
    if (typeof token !== 'string') {
      return res.status(400).json({
        message: 'Invalid token format',
      })
    }
    const { password } = req.body
    const result = await verifyNewEmailService(token, password)
    return res.status(200).json({
      message: 'Success',
      data: result,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: err.message,
    })
  }
}