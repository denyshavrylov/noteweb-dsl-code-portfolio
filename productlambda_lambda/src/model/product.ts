import { DataTypes, Model } from 'sequelize';

export class Product extends Model {
    product_id!: number;
    name!: string;
    description!: string;
    unit_price!: number;
  }
