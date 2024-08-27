package com.noteinweb.paas.cloud.lambda.customercrud.function;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.noteinweb.paas.cloud.lambda.customercrud.model.Customer;
import com.noteinweb.paas.cloud.lambda.customercrud.repository.CustomerRepository;
import com.noteinweb.paas.cloud.lambda.customercrud.model.Response;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.function.Function;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import javax.validation.constraints.NotNull;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import com.fasterxml.jackson.databind.SerializationFeature;

@Component
@Slf4j
@Validated
public class CustomerCrudFunctions implements Function<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

  private final ObjectMapper objectMapper;
  private final CustomerRepository repository;
  
  public CustomerCrudFunctions(@NotNull final ObjectMapper objectMapper, CustomerRepository repository) {
    this.objectMapper = objectMapper;
    this.objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);

    this.repository = repository;
  }
  
  /**
  * Lambda function handler that takes a request and returns a response.
  *
  * @param proxyRequestEvent the function argument
  * @return {@link APIGatewayProxyResponseEvent}
  * @throws JsonProcessingException
  */
  @Override
  @SneakyThrows(value = JsonProcessingException.class)
  public APIGatewayProxyResponseEvent apply(final APIGatewayProxyRequestEvent proxyRequestEvent) {
    APIGatewayProxyResponseEvent proxyResponseEvent = null;
    log.info("Converting {} request '{}' into a response...", proxyRequestEvent.getHttpMethod(), proxyRequestEvent.getBody());
    
    switch (proxyRequestEvent.getHttpMethod()) {
      case "POST":     proxyResponseEvent = createEntity(proxyRequestEvent);
                       break;
      case "PUT":      proxyResponseEvent = updateEntity(proxyRequestEvent);
                       break;
      case "GET":      proxyResponseEvent = getAllEntities(proxyRequestEvent);
                       break;
      default:   proxyResponseEvent = deleteEntity(proxyRequestEvent);
                       break;
    }

    log.info("Converted {} request '{}' - response: {}", proxyRequestEvent.getHttpMethod(), proxyRequestEvent.getBody(), proxyResponseEvent);
    return proxyResponseEvent;
  }

  private APIGatewayProxyResponseEvent createEntity(APIGatewayProxyRequestEvent proxyRequestEvent) throws JsonProcessingException {
    Customer[] request = objectMapper.readValue(proxyRequestEvent.getBody(), Customer[].class);
    List<Customer> responseContent = new ArrayList<Customer>();
    for (Customer entry : request) {
      Customer savedCustomer = repository.save(entry);
      responseContent.add(savedCustomer);
    }
    String responseBody = objectMapper.writeValueAsString(responseContent);
    return createSuccessResponse(responseBody);
  }
    
  private APIGatewayProxyResponseEvent updateEntity(APIGatewayProxyRequestEvent proxyRequestEvent) throws JsonProcessingException {
    return createEntity(proxyRequestEvent);
  }
    
  private APIGatewayProxyResponseEvent getAllEntities(APIGatewayProxyRequestEvent proxyRequestEvent) throws JsonProcessingException {
    List<Customer> Customers = repository.findAll();
    String responseBody = objectMapper.writeValueAsString(Customers);
    return createSuccessResponse(responseBody);
  }
    
  private APIGatewayProxyResponseEvent deleteEntity(APIGatewayProxyRequestEvent proxyRequestEvent) throws JsonProcessingException {
    List<Integer> deletedIds = extractIdFromRequest(proxyRequestEvent);
    deletedIds.forEach(id -> repository.deleteById( id ));
    return createSuccessResponse();
  }
    
    // Helper methods
    
  private List<Integer> extractIdFromRequest(APIGatewayProxyRequestEvent proxyRequestEvent) throws JsonProcessingException {
    // Extract the ID from the request and return it
    String[] idStr = objectMapper.readValue(proxyRequestEvent.getBody(), String[].class);
    return       Arrays.asList(idStr).stream().map(id -> Integer.getInteger(id)).toList() ;
  }
    
  private APIGatewayProxyResponseEvent createSuccessResponse(String body) {
    APIGatewayProxyResponseEvent responseEvent = new APIGatewayProxyResponseEvent();
    responseEvent.setStatusCode(200);
    responseEvent.setBody(body);
    return responseEvent;
  }

  private APIGatewayProxyResponseEvent createSuccessResponse() {
    APIGatewayProxyResponseEvent responseEvent = new APIGatewayProxyResponseEvent();
    responseEvent.setStatusCode(200);
    return responseEvent;
  }
}
