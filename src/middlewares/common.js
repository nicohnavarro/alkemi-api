import { checkSchema } from "express-validator";

const imageRequired = checkSchema({
  image: {
    custom: {
      options: (value, { req }) => !!req.file,
      errorMessage: "You should upload a file",
    },
  },
});

export { imageRequired };
