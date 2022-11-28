package BookReviewApp.repository;

import BookReviewApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Queries user by username
     * @param userName - User object's username
     * @return queried user object
     */
    User findByUserName(String userName);

    /**
     * Queries user by username and password
     * @param userName - User object's username
     * @param password - User object's password
     * @return queried user object
     */
    User findByEmailAndPassword(String userName, String password);

    /**
     * Delete a user by username
     * @param userName - User object's username
     */
    void deleteByUserName(String userName);
}
