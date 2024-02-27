package fms.projectII.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@Deprecated
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private CustomUsersDetailsService usersDetailsService;

    private JwtFilter jwtFilter;


    private static final String[] WHITE_LIST_URLS = {
            "/admin/**",
            "/user/**",
            "/reserve/**",
            "/auth/**",
            "/futsal/**",
            "/message/**",
            "/payment/**",
            "/auth/**",
            "/paymentDocument/**",
            "/document/**"
    };

    private static final String[] USERS_URLS = {
//            "/users/**",
            "/add-to-cart/**",
    };

    private static final String[]  ADMIN_URLS = {
//            "/users/**"
    };

    private static final String[]  NORMAL_URLS = {
//            "/user/**"
    };

    public SecurityConfig(CustomUsersDetailsService usersDetailsService, JwtFilter jwtFilter) {
        this.usersDetailsService = usersDetailsService;
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(usersDetailsService);
    }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(WHITE_LIST_URLS)
                .permitAll()
                .antMatchers(USERS_URLS)
                .hasAuthority("USER")
                .antMatchers(ADMIN_URLS)
                .hasAuthority("ADMIN")
                .antMatchers(NORMAL_URLS)
                .hasAuthority("User")
                .anyRequest()
                .authenticated()
                .and().exceptionHandling().and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }


    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider
                = new DaoAuthenticationProvider();
        provider.setUserDetailsService(usersDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return  provider;
    }

}