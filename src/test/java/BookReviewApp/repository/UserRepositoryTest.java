package BookReviewApp.repository;

import BookReviewApp.model.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    public void saveUser() {
        User user = User.builder()
                .userName("manny123")
                .email("manny123@gmail.com")
                .password("123 ").build();

        User savedUser = userRepository.save(user);

        Assertions.assertNotNull(savedUser.getUserId());
    }

    @Test
    @Transactional
    public void deleteUser() {
        User user = User.builder()
                .userName("manny123")
                .email("manny123@gmail.com")
                .password("123 ").build();

        User foundUser = userRepository.save(user);
        userRepository.deleteByUserName(foundUser.getUserName());

        Assertions.assertEquals(null, userRepository.findByUserName("manny123"));
    }
}