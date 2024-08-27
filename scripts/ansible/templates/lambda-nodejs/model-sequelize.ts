import { DataTypes, Model } from 'sequelize';

export class {{ entity.class }} extends Model {
  {% for field in entity.fields %}
  {{ field.name }}!: {{ field.type }};
  {% endfor %}
}
