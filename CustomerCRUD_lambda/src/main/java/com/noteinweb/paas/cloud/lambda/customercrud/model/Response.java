package com.noteinweb.paas.cloud.lambda.customercrud.model;

import javax.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Response<T> {
  @JsonProperty
  private T payload = null;
  @JsonProperty
  private boolean saved = false;
}
