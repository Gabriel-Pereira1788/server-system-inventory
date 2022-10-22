import mongoose from "mongoose";
import config from "config";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    console.log("Conectou ao banco de dados");
  } catch (err) {
    console.log("Não foi possivel concectar");
    console.log(`Error:${err}`);
    process.exit(1);
  }
}

export default connect;
