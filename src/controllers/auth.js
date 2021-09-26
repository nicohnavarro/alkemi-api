import {
  login as _login,
  register as _register,
} from "../services/authService.js";
import Success from "../handlers/successHandler.js";

const login = async (req = request, res = response, next) => {
  const { email, password } = req.body;
  try {
    res.json(new Success(await _login(email, password)));
  } catch (error) {
    next(error);
  }
};

const register = async (req = request, res = response, next) => {
  const { name, username, email, password } = req.body;
  try {
    res.json(new Success(await _register(name, username, email, password)));
  } catch (error) {
    next(error);
  }
};

export {
  login,
  register,
};
