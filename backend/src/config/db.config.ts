export const config = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "P@ssw0rd",
    DB: "ecommerce_db",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  export const dialect = "mysql";