export interface {{ entity.class }} {
  {% for field in entity.fields %}
  {{ field.name }}: {{ field.type }};
  {% endfor %}
}
