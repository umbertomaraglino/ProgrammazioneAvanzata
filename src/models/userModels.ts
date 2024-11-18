import { DataTypes} from 'sequelize';
import { DbConnection } from '../Db/sequelize';


const sequelize = DbConnection.getConnection();
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error: any) => {
  console.error('Unable to connect to the database: ', error);
});

//crea modello
export const UserModel = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tokens: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    points: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    isadmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    modelName: 'UserModel',
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});


sequelize.sync().then(() => {
    console.log('User table created successfully!');
}).catch((error: any) => {
    console.error('Unable to create table : ', error);
});