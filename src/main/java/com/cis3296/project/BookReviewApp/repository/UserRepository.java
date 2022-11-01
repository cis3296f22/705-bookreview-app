package com.cis3296.project.BookReviewApp.repository;

import com.cis3296.project.BookReviewApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // this repo is where the query are conducted
    // There is a list of default methods. below are custom query methods
    User findByUserName(String userName);

    void deleteByUserName(String userName);
}
