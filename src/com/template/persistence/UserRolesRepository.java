package com.template.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.template.domain.UserRoles;

@Repository
public interface UserRolesRepository extends JpaRepository<UserRoles, String>{
	public List<UserRoles> getUserRoles(String userid);
	public List<UserRoles> getUserByRole(String roleId);
 
}
