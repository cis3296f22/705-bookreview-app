package BookReviewApp.service;

import BookReviewApp.model.User;
import BookReviewApp.repository.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import static org.mockito.ArgumentMatchers.any;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void createUserTest() {
        User userCreated = User.builder()
                .userId(5)
                .userName("tomtom")
                .password("tomtom123")
                .email("tomtom@gmail.com").build();

        when(userRepository.save(userCreated)).thenReturn(userCreated);
        Long actual = userService.createUser(userCreated);

        Assertions.assertEquals(userCreated.getUserId(), actual);
    }

    @Test
    public void containsDuplicateUserTest() {
        User userCreated = User.builder()
                .userId(5)
                .userName("tomtom")
                .password("tomtom123")
                .email("tomtom@gmail.com").build();
        List<User> users = new ArrayList<>(Arrays.asList(userCreated));

        when(userRepository.findAll()).thenReturn(users);
        when(userRepository.save(any(User.class))).thenReturn(userCreated);

        List<User> userList = userRepository.findAll();
        User actual = userRepository.save(userCreated);

//        System.out.println(actual == null);
//        System.out.println("size is "+userList.size());

        boolean isDuplicate = userService.containsDuplicateUser("tomtom","tomtom@gmail.com");
//        System.out.println("isDuplicate is" + isDuplicate);

        Assertions.assertEquals(true, isDuplicate);
    }

    @Test
    public void deleteUserTest() {
        User userCreated = User.builder()
                .userId(5)
                .userName("tomtom")
                .password("tomtom123")
                .email("tomtom@gmail.com").build();

        when(userRepository.save(userCreated)).thenReturn(userCreated);
        doNothing().when(userRepository).deleteByUserName("tomtom");

        Long actual = userService.createUser(userCreated);
        userService.deleteUser("tomtom");
        System.out.println(actual == null);

        Assertions.assertEquals(userCreated.getUserId(), actual);
    }

}