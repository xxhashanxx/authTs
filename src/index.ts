import app from './App';
import { APP_CONFIG } from "./config/app.config";

const port = APP_CONFIG.port;
const db = require("./app/db/database/models");
/* db.sequelize.sync({ force: true ,logging: console.log}).then(() => {
  console.log("Drop and re-sync db."); 
}); 
 */
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
