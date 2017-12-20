package com.template.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.apache.log4j.Logger;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Entity

@NamedQueries({
@NamedQuery(
		name="Users.findAllUsersWithUserType",
		query="SELECT u FROM Users u WHERE u.user_type =?1"
		),
@NamedQuery(
		name="Users.searchUser",
		query="SELECT u FROM Users u WHERE u.username =?1"
		),
@NamedQuery(
		name="Users.deletUser",
		query = "UPDATE Users u SET u.marked_for_delete = :Y WHERE u.username =?1"
		),
@NamedQuery(
		name="Users.getUserType",
		query = "SELECT u.user_type FROM Users u WHERE u.username =?1"
		),
/*@NamedQuery(
		name="Users.getAltPhoneNum",
		query = "SELECT u.alternateSiteWorkPhone FROM Users u WHERE u.username =?1"
		),
@NamedQuery(
		name="Users.getEmgPhoneNum",
		query = "SELECT u.emergencySiteWorkPhone FROM Users u WHERE u.username =?1"
		),
@NamedQuery(
		name="Users.getPhoneNum",
		query = "SELECT u.siteWorkPhone FROM Users u WHERE u.username =?1"
		)*/
})

@Table(name = "USERS", schema="template")
public class Users implements UserDetails{
	
	protected static final Logger LOGGER = Logger.getLogger(Users.class);

	private static final long serialVersionUID = 299817514520320650L;
	
	@Id
	@Column(name="USER_ID")
	private String username;
	
	@Column(name="USER_PASSWORD")
	private String password;
	
	@Column(name="USER_EMAIL")
	private String user_email;
	
	@Column(name="FIRST_NAME")
	private String first_name;
	
	@Column(name="LAST_NAME")
	private String last_name;
	
	 @Column(name="USER_TYPE")
	private String user_type;
	 
	@Column(name="SITE_WORK_PHONE")
	private String siteWorkPhone;
	
	 @Column(name="SITE_WORK_PHONE_ALT")
	private String alternateSiteWorkPhone;	 
	 
	 @Column(name="SITE_WORK_PHONE_EMG")
	private String emergencySiteWorkPhone;	
	
	//uni-directional many-to-one association to UserType 
	/*@ManyToOne
	@JoinColumn(name="USER_TYPE")
	private UserTypes userTypes;*/
	
	@Column(name="MARKED_FOR_DELETE")
	private String marked_for_delete;
	
	@Column(name="VENDOR_ID")
	private String vendor_id;

	@Column(name="FAILED_LOGIN_ATTEMPTS")
	private int failedLoginAttempts;
	
	@Column(name="IS_ACCOUNT_LOCKED")
	private String isAccountLocked;
	
	@Column(name="ACTIVE_TIME")
	private Integer activeTime;
	
	@Column(name="DEPARTMENT")
	private String department;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="EXPIRED_ON")
	private Date userExpiredOn;
	
	@Column(name="IS_TEMP_USER")
	private String isTempUser;
	
	@ManyToMany(fetch=FetchType.EAGER)
	@JoinTable(name = "template.USER_ROLES", joinColumns = { @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID", referencedColumnName = "ROLE_ID") })
	private Set<Roles> roles;
	
	
	/*@ManyToMany(fetch=FetchType.EAGER)
	@JoinTable(name = "orchstn.USER_MODULES", joinColumns = { @JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "MODULE_ID", referencedColumnName = "MODULE_ID") })
	private Set<Modules> modules;*/	
	/*public UserTypes getUserTypeBean() {
		return userTypes;
	}

	public void setUserTypeBean(UserTypes userTypeBean) {
		this.userTypes = userTypeBean;
	}*/
	

	public Set<Roles> getRoles() {
		return roles;
	}

	/*public Set<Modules> getModules() {
		return modules;
	}*/
	
	/*public void setModules(Set<Modules> modules) {
		this.modules = modules;
	}*/
	
	public String getUser_type() {
		return user_type;
	}

	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}

	public void setRoles(Set<Roles> roles) {
		this.roles = roles;
	}

	public void printAuthorization(){
		for(Roles role : getRoles()){
			LOGGER.debug("Role : "+role);
		}
		
		/*for(Modules module : getModules()){
			LOGGER.debug("Role : "+module);
		}*/
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<SimpleGrantedAuthority>();
		
		for(Roles role : roles){
			grantedAuthorities.add(new SimpleGrantedAuthority(role.getRoleId()));	
		}
		
		return grantedAuthorities;
	}

/*	private boolean hasRole(String role) {
		Collection<GrantedAuthority> authorities = (Collection<GrantedAuthority>) SecurityContextHolder
				.getContext().getAuthentication().getAuthorities();
		boolean hasRole = false;
		for (GrantedAuthority authority : authorities) {
			hasRole = authority.getAuthority().equals(role);
			if (hasRole) {
				break;
			}
		}
		return hasRole;
	}
*/
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getUser_email() {
		return user_email;
	}

	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}
	
	public String getFirst_name() {
		return first_name;
	}
	
	public String getIsAccountLocked() {
		return isAccountLocked;
	}

	public void setIsAccountLocked(String isAccountLocked) {
		this.isAccountLocked = isAccountLocked;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	
	 
	public String getSiteWorkPhone() {
		return siteWorkPhone;
	}

	public void setSiteWorkPhone(String siteWorkPhone) {
		this.siteWorkPhone = siteWorkPhone;
	}

	public String getAlternateSiteWorkPhone() {
		return alternateSiteWorkPhone;
	}

	public void setAlternateSiteWorkPhone(String alternateSiteWorkPhone) {
		this.alternateSiteWorkPhone = alternateSiteWorkPhone;
	}
	
	public String getEmergencySiteWorkPhone() {
		return emergencySiteWorkPhone;
	}

	public String getVendor_id() {
		return vendor_id;
	}

	public void setVendor_id(String vendor_id) {
		this.vendor_id = vendor_id;
	}

	public void setEmergencySiteWorkPhone(String emergencySiteWorkPhone) {
		this.emergencySiteWorkPhone = emergencySiteWorkPhone;
	}

	public String getMarked_for_delete() {
		return marked_for_delete;
	}

	public void setMarked_for_delete(String marked_for_delete) {
		this.marked_for_delete = marked_for_delete;
	}
	
	public String getDepartment() {
		return this.department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}
	
	public int getFailedLoginAttempts() {
		return failedLoginAttempts;
	}

	public void setFailedLoginAttempts(int failedLoginAttempts) {
		this.failedLoginAttempts = failedLoginAttempts;
	}

	public Integer getActiveTime() {
		return activeTime;
	}
	public void setActiveTime(Integer activeTime) {
		this.activeTime = activeTime;
	}
	
	public String getIsTempUser() {
		return isTempUser;
	}

	public void setIsTempUser(String isTempUser) {
		this.isTempUser = isTempUser;
	}
	
	public Date getUserExpiredOn() {
		return userExpiredOn;
	}
	
	public void setUserExpiredOn(Date userExpiredOn) {
		this.userExpiredOn = userExpiredOn;
	}
	
	public String getDisplayName(){
		return getFirst_name()+" "+getLast_name();
	}
	@Override
	public boolean isAccountNonExpired() {
		
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	
}
