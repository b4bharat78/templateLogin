package com.template.service;


import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.template.domain.UserRoles;
import com.template.domain.Users;
import com.template.persistence.UserDetailsRepository;
//import com.techm.ropro.domain.UserModules;
//import com.techm.ropro.persistence.UserModulesRepository;
//import com.techm.ropro.domain.QueueAccess;
//import com.techm.ropro.domain.QueueMaster;
//import com.techm.ropro.persistence.QueueAccessRepository;
//import com.techm.ropro.persistence.QueueMasterRepository;
import com.template.persistence.UserRolesRepository;

@Service
public class ManageUsersService {

	protected static final Logger LOGGER = Logger.getLogger(ManageUsersService.class);

	@Autowired
	private UserDetailsRepository userDetailsRepository;

	@Autowired
	private UserRolesRepository userRolesRepository;

	/*@Autowired
	private UserModulesRepository userModulesRepository;*/

	/*@Autowired
	private QueueMasterRepository queueMasterRepository;

	@Autowired
	private QueueAccessRepository queueAccessRepository;*/
	
	/*@Autowired
	private ActIdMembershipRepository actIdMembershipRepository;*/
	@Transactional
	public boolean createUser(Users users, List<UserRoles> userRolesList ){

		try{
			userDetailsRepository.save(users);
			userRolesRepository.save(userRolesList);
			//userModulesRepository.save(userModulesList);
			return true;
		}
		catch(Exception e){
			LOGGER.debug(e);
			return false;
		}			
	}

	// search method
	public Users searchUser(String userId){
		Users users=userDetailsRepository.searchUser(userId);
		LOGGER.debug("Successfully getting data from jpa   :"); 
		return users;
	} 

	public List<UserRoles> getUserRoles(String userId){
		List<UserRoles> UserRolesList= userRolesRepository.getUserRoles(userId);
		return UserRolesList;
	}
/*	public List<ActIdMembership> getUserGroups(String userId){
			List<ActIdMembership> UserGroupsList= actIdMembershipRepository.getUserGroups(userId);						
			return UserGroupsList;		
		}
*/
	public List<UserRoles> getUserByRole(String roleId){
		List<UserRoles> UserRolesList= userRolesRepository.getUserByRole(roleId);
		return UserRolesList;
	}

	/*public List<UserModules> getUserModules(String userId){
		List<UserModules> UserModulesList= userModulesRepository.getUserModules(userId);
		return UserModulesList;
	}*/

	/*public List<UserModules> getUserByModule(String moduleId){
		List<UserModules> UserModulesList= userModulesRepository.getUserByModule(moduleId);
		return UserModulesList;
	}*/

	/*public List<QueueAccess> getUserQueues(String userId){
		List<QueueAccess> userQueuesList= queueAccessRepository.getQueuesForUser(userId);
		return userQueuesList;
	}*/

// update user method
	  @Transactional
	 public boolean updateUser(Users users ){
		  LOGGER.debug("Start update user   :");
	    try{
	    	userDetailsRepository.save(users);
	    	LOGGER.debug("Successfully updated user    :");
	    	return true;
	    	}
	    	catch(Exception e){
	    	e.printStackTrace();
	    	return false;	    			}				
		}

	// update user method
	@Transactional
	public boolean updateUser(Users users, List<UserRoles> userRoleList){
		LOGGER.debug("Start update user   :");
		try{
			userDetailsRepository.save(users);
			updateUserRoles(userRoleList);
			//updateUserModules(userModuleList);
			//queueAccessRepository.save(userQueueList);

			LOGGER.debug("Successfully updated user    :");
			return true;
		}
		catch(Exception e){
			e.printStackTrace();
			return false;	    			}				
	}

	// update roles method
	@Modifying
	@Transactional
	public boolean updateUserRoles(List<UserRoles> userRolesList){
		LOGGER.debug("Start update roles   :");
		try{
			userRolesRepository.save(userRolesList);
			LOGGER.debug("Successfully updated roles     :");
			return true;
		}
		catch(Exception e){
			e.printStackTrace();
			return false;
		}				
	}

	// delete roles method
	@Transactional
	public boolean deleteUserRoles(List<UserRoles> roles){
		LOGGER.debug("Start delete roles   :");
		try{
			userRolesRepository.delete(roles);
			LOGGER.debug("Successfully delete roles     :");
			return true;
		}
		catch(Exception e){
			e.printStackTrace();
			return false;
		}				
	}

	// update modules method
	/*@Modifying
		@Transactional
		public boolean updateUserModules(List<UserModules> userModuleList){
			LOGGER.debug("Start update modules   :");
			try{
				userModulesRepository.save(userModuleList);
				LOGGER.debug("Successfully updated modules     :");
				return true;
			}
			catch(Exception e){
				e.printStackTrace();
				return false;
			}				
		}*/

	// delete modules method
	/*@Transactional
		public boolean deleteUserModules(List<UserModules> modules){
			LOGGER.debug("Start delete modules   :");
			try{
				userModulesRepository.delete(modules);
				LOGGER.debug("Successfully delete modules     :");
				return true;
			}
			catch(Exception e){
				e.printStackTrace();
				return false;
			}				
		}*/

	/*@Transactional
	public void deleteUserQueues(List<QueueAccess> queues){
		LOGGER.debug("Start delete roles   :");
		try{
			queueAccessRepository.delete(queues);
			LOGGER.debug("Successfully delete queues     :");
		}
		catch(Exception e){
			e.printStackTrace();
		}				
	}*/

	@Transactional
	public void saveUser(Users user){
		userDetailsRepository.save(user);
	}

	/*public List<QueueMaster> getGroupedQueuesWithQueueType(String qType){
		List<QueueMaster> queueList= queueMasterRepository.findAllQueuesWithEqualQueueType(qType);
		return queueList;
	}*/

}
