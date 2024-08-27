import sequelize from '../config/sequelize-config';
import { DataTypes, Model } from 'sequelize';
import { Product } from '../model/product'


export const initializeProductModel = () => {
  Product.init({
        product_id: {
      type: DataTypes.NUMBER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true    },
        name: {
      type: DataTypes.STRING,
      allowNull: true    },
        description: {
      type: DataTypes.STRING,
      allowNull: true    },
        unit_price: {
      type: DataTypes.NUMBER,
      allowNull: true    },
        }, {
      sequelize,
      modelName: 'Product',
      tableName: 'product',
      timestamps: false
  });
};
initializeProductModel();
export const ProductRepository = Product;

