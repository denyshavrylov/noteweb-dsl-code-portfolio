"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = exports.initializeProductModel = void 0;
const sequelize_config_1 = __importDefault(require("../config/sequelize-config"));
const sequelize_1 = require("sequelize");
const product_1 = require("../model/product");
const initializeProductModel = () => {
    product_1.Product.init({
        product_id: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        unit_price: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: true
        },
    }, {
        sequelize: sequelize_config_1.default,
        modelName: 'Product',
        tableName: 'product',
        timestamps: false
    });
};
exports.initializeProductModel = initializeProductModel;
(0, exports.initializeProductModel)();
exports.ProductRepository = product_1.Product;
