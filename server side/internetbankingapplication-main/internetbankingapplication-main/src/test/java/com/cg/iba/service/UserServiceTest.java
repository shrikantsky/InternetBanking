package com.cg.iba.service;



import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import com.cg.iba.entities.Admin;
import com.cg.iba.entities.Customer;
import com.cg.iba.entities.User;
import com.cg.iba.repository.IAdminRepository;
import com.cg.iba.repository.ICustomerRepository;
import com.cg.iba.repository.IUserRepository;



@SpringBootTest
 class UserServiceTest {
    
@InjectMocks
UserServiceImpl userserviceimpl = new UserServiceImpl();



@Mock
IUserRepository userepository;



@Mock
IAdminRepository adminrepository;



@Mock
ICustomerRepository customerepository;
    
@Test
 void signInAdminTest() {
    Admin admin = new Admin();
    admin.setUserId(1);
    admin.setPassword("abc");
    
    Optional<Admin> optAdmin = Optional.of(admin);
    when(adminrepository.findById((long) 1)).thenReturn(optAdmin);
    
    Admin user = userserviceimpl.signInAdmin(1, "abc");
    assertEquals(1,user.getUserId());
}



@Test
 void signInTest() {
    Customer user = new Customer();
    user.setUserId(1);
    user.setPassword("abc");
    
    Optional<Customer> optAdmin = Optional.of(user);
    when(customerepository.findById((long) 1)).thenReturn(optAdmin);
    
    User user1  = userserviceimpl.signIn(1, "abc");
    assertEquals(1,user1.getUserId());
}



@Test
 void DeleteUserTest() {
    Customer user = new Customer();
    user.setUserId(1);
    user.setPassword("abc");
    
    Optional<Customer> optAdmin = Optional.of(user);
    when(customerepository.findById((long) 1)).thenReturn(optAdmin);
    
    doNothing().when(customerepository).deleteById((long) 1);
      
    userserviceimpl.deleteUserInfo(1);
 
    verify(customerepository,times(1)).findById((long) 1);
    verify(customerepository,times(1)).deleteById((long) 1);
    



}
}