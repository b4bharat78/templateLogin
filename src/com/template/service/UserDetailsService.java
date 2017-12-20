package com.template.service;

//import javax.transaction.Transactional;

import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.template.domain.Roles;
import com.template.domain.Users;
import com.template.persistence.UserDetailsRepository;
//import com.techm.ropro.domain.Modules;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

	protected static final Logger LOGGER = Logger.getLogger(UserDetailsService.class);
	
	@Autowired
	private UserDetailsRepository userDetailsRepository;
	
	@Value("${max.failed.login.attempts}")
	private String maxFailedLoginAttepmtsStr;

	@Autowired
	private ManageUsersService manageUserService;
	
	public UserDetailsRepository getUserDetailsRepository() {
		return userDetailsRepository;
	}


	public void setUserDetailsRepository(UserDetailsRepository userDetailsRepository) {
		this.userDetailsRepository = userDetailsRepository;
	}


	public void getUserDetails() {
		   UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().
		   getAuthentication().getPrincipal();
		   LOGGER.debug(" getUserDetails- " +userDetails.getPassword());
		   LOGGER.debug(" getUserDetails- " +userDetails.getUsername());
		   LOGGER.debug(" getUserDetails- " +userDetails.isEnabled());
		}
	
	
	public boolean hasRole(String role) {
		  Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>)
		  SecurityContextHolder.getContext().getAuthentication().getAuthorities();
		  boolean hasRole = false;
		  for (GrantedAuthority authority : authorities) {
		     hasRole = authority.getAuthority().equals(role);
		     if (hasRole) {
			  break;
		     }
		  }
		  return hasRole;
		}
	
	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		
		
		LOGGER.debug(" ==========================      Got user id: "+userId);
		Users userDetails = userDetailsRepository.findOne(userId);
		
		
		LOGGER.debug("==========================     status of user "+userDetails.getMarked_for_delete());
		for(Roles role : userDetails.getRoles()){
			LOGGER.debug("==========================     status of user Role : "+role.getRoleId()+" "+role.getRoleName());
		}
		/*for(Modules module : userDetails.getModules()){
			LOGGER.debug("==========================     status of  user Module : "+module.getModuleId()+" "+module.getModuleName());
		}	*/
		
		int maxFailedLoginAttempts = 5;
		if(maxFailedLoginAttepmtsStr!=null && maxFailedLoginAttepmtsStr.trim()!=""){
			maxFailedLoginAttempts = Integer.parseInt(maxFailedLoginAttepmtsStr);
		}
		
		if(userDetails == null){
			LOGGER.error("User "+userId+" not found");
			throw new UsernameNotFoundException("User "+userId+" is not registered. Please contact support."); 
		}else{
			
			if(userDetails.getFailedLoginAttempts()>=maxFailedLoginAttempts){
				LOGGER.error("User "+userId+" is locked");
				throw new UsernameNotFoundException("User "+userId+" is reached maximum login attempts and account is locked. Please contact support."); 
			}else if(userDetails.getMarked_for_delete().equals("Y") || isUserExpired(userDetails) ){
				LOGGER.error("User "+userId+" is inactive");
				throw new UsernameNotFoundException("User "+userId+" is marked inactive. Please contact support."); 
			}			
		}
		
		return userDetails;		
	}
	
    private boolean isUserExpired(final Users user){
        if(user.getActiveTime() != null ){
        	Date currentDate = Calendar.getInstance().getTime();        	
        	Calendar expCalendar =  Calendar.getInstance();
        	expCalendar.setTime(user.getUserExpiredOn());
        	expCalendar.add(Calendar.HOUR, user.getActiveTime());
        	Date expirayDate = expCalendar.getTime();
        	if( user.getMarked_for_delete().equals("N") && currentDate.after(expirayDate)){
                user.setMarked_for_delete("Y");
                manageUserService.saveUser(user);
                LOGGER.debug("User expired : "+user.getUsername());
                return true;       		
        	}
        }else{
        	 LOGGER.debug("User not expired : "+user.getUsername());
        }
        return false;
    }
    
	public List<Users> getAllUserWithType(String userType){
		
		
		return userDetailsRepository.findAllUsersWithUserType(userType);
	
	}
	
	public List<Users> getAllUsers( ){
		
		List<Users> users =userDetailsRepository.findAll();
		return users;
		
	}
	
	public Users findUser(String userName)
	{
		return userDetailsRepository.findOne(userName);
	}
	
/*public String getAltPhoneNum(String userName){
		
		return userDetailsRepository.getAltPhoneNum(userName);
	
	}

public String getEmgPhoneNum(String userName){
	
	return userDetailsRepository.getEmgPhoneNum(userName);

}

public String getPhoneNum(String userName){
	
	return userDetailsRepository.getPhoneNum(userName);

}*/

/*@Transactional
	public void updateUsers(Users user){		
		LOGGER.debug("Got new password = "+user.getPassword());
		userDetailsRepository.save(user);
	}*/

}
