import { DataTypes} from 'sequelize';
import { DbConnection } from '../Db/sequelize';

const sequelize = DbConnection.getConnection();
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error: any) => {
  console.error('Unable to connect to the database: ', error);
});


//crea modello
export const gameModel = sequelize.define('games', {
    game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stato: {
        type: DataTypes.STRING,
        allowNull: false
    },
    storico: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    difficulty:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    modelName: 'gameModel',
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});


sequelize.sync().then(() => {
    console.log('Game table created successfully!');
}).catch((error: any) => {
    console.error('Unable to create table : ', error);
});
