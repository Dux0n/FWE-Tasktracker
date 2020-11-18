import { createConnection } from "typeorm";

export const createDBcon = async () =>{

    createConnection({
        type: "mysql",
            host: "mysqldb",
            port: 3306,
            username: "test",
            password: "test",
            database: "fwemysqldb",
            entities: ["./src/entity/*.ts"],
        synchronize: false,
        logging: false
      }).then(connection => {
        // here you can start to work with your entities
        console.log("DB Connected")
      }).catch(error => console.log(error));
}
