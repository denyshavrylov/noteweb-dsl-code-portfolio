package com.noteinweb.paas.cloud.lambda.drivercrud.model;

import javax.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "Driver")
public class Driver {
      @Id      @JsonProperty private String name;
            @JsonProperty private String executorMemory;
            @JsonProperty private String proxyUser;
            @JsonProperty private Integer driverCores;
            @JsonProperty private String className;
            @JsonProperty private String driverMemory;
            @JsonProperty private String file;
            @JsonProperty private String type;
            @JsonProperty private Integer numberofExecutors;
            @JsonProperty private Integer executorCores;
  }
