package learn.recipemanager.security;

import learn.recipemanager.data.AppUserRepo;
import learn.recipemanager.models.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    AppUserRepo repo;
    //UserRepo repo;
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        //utilizing repo method setup with Mongo here
        AppUser user = repo.findByUsername( username ).get(0);
        if( user == null ){
            throw new UsernameNotFoundException("Could not find user " + username);
        }
        return user;
    }
}
