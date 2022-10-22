import morgan, { StreamOptions } from "morgan";
import config from "config";

const stream: StreamOptions = {
  write: (message) => console.log(message),
};

const skip = () => {
  const env = config.get<string>("env") || "devolpment";
  return env !== "development";
};

const morganMiddleware = morgan(
  ":method:url :status : res[content-length] - response-time ms",
  { stream, skip }
);

export default morganMiddleware;
