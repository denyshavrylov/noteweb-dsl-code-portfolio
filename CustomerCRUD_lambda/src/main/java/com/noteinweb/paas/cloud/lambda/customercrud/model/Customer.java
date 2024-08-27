package com.noteinweb.paas.cloud.lambda.customercrud.model;

import javax.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Customer")
public class Customer {
      @Id      @JsonProperty private Integer id;
            @JsonProperty private String firstName;
  }
