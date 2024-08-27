package com.noteinweb.paas.cloud.lambda.customercrud;

import com.noteinweb.paas.cloud.lambda.customercrud.model.Customer;
import com.noteinweb.paas.cloud.lambda.customercrud.repository.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.nativex.hint.NativeHint;
import org.springframework.nativex.hint.ResourceHint;
import org.springframework.nativex.hint.TypeAccess;
import org.springframework.nativex.hint.TypeHint;

@NativeHint(
  resources = {
    @ResourceHint(patterns = {"org.joda.time.tz.*"})
  }
)
// SerializationHint is required to ensure that the ObjectMapper can convert the body of the api proxy request into a DTO.
@TypeHint(types = { Customer.class, CustomerRepository.class }, 
  access = {TypeAccess.DECLARED_CONSTRUCTORS, TypeAccess.DECLARED_METHODS})
@SpringBootApplication
@Slf4j
public class CustomerCrudAwsLambdaApplication {

  public static void main(String[] args) {
    log.info("About to start booting");
    SpringApplication.run(CustomerCrudAwsLambdaApplication.class, args);
    log.info("Done running the {}", CustomerCrudAwsLambdaApplication.class.getName());
  }
}
