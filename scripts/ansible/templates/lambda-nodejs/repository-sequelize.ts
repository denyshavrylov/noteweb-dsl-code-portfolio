import sequelize from '../config/sequelize-config';
import { DataTypes, Model } from 'sequelize';
import { {{ entity.class }} } from '../model/{{ entity.class | lower }}'


export const initialize{{ entity.class }}Model = () => {
  {{ entity.class }}.init({
    {% for field in entity.fields %}
    {{ field.name }}: {
      type: DataTypes.{{ field.type | upper }},
      allowNull: true{% if field.id is defined %},
      primaryKey: true,
      autoIncrement: true{% endif %}
    },
    {% endfor %}
    }, {
      sequelize,
      modelName: '{{ entity.class }}',
      tableName: '{{ entity.class | lower }}',
      timestamps: false
  });
};
initialize{{ entity.class }}Model();
export const {{ entity.class }}Repository = {{ entity.class }};

