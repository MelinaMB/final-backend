import EErros from "../errors/enums.js";

export default (error, req, res, next) => {
  console.log(error.cause);

  switch (error.code) {
    case EErros.REGISTER_ERROR:
      res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;

      case EErros.PRODUCT_ERROR:
      res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;

      case EErros.PRODUCT_IN_CART_ERROR: 
      res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;

    default:
      res.send({ status: "error", error: "Unhandled error" });
      break;
  }
};