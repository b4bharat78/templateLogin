package com.template.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.template.domain.Users;

public interface UserDetailsRepository extends JpaRepository<Users, String>{
	public List<Users> findAllUsersWithUserType(String userType);
	public Users searchUser(String userId);
	public boolean deletUser(String userName);
	public String getUserType(String userName);

}
