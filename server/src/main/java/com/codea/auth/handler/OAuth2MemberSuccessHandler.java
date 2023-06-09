package com.codea.auth.handler;

import com.codea.auth.jwt.JwtTokenizer;
import com.codea.auth.utils.CustomAuthorityUtils;

import com.codea.common.exception.BusinessLogicException;
import com.codea.common.exception.ExceptionCode;
import com.codea.member.Member;
import com.codea.member.MemberRepository;
import com.codea.member.MemberService;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@Slf4j
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;

    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberRepository = memberRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        String clientRegistrationId = oauthToken.getAuthorizedClientRegistrationId(); // google, naver, kakao

        var oAuth2User = (OAuth2User)authentication.getPrincipal();

        String email = "";
        String nickName = "";
        String image = "";

        if (clientRegistrationId.equals("kakao")) {
            Map<String, Object> attributes = (Map<String, Object>)oAuth2User.getAttributes().get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>)attributes.get("profile");

            email = String.valueOf(attributes.get("email"));
//            if (email == "null") {
//                https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email
//            }
            System.out.println("카카오 정보 출력");
            System.out.println(attributes);
            System.out.println("카카오 전체 출력");
            System.out.println((Map<String, Object>)oAuth2User.getAttributes());

            nickName = String.valueOf(profile.get("nickname"));
            image = String.valueOf(profile.get("profile_image_url"));
        } else {
            email = String.valueOf(oAuth2User.getAttributes().get("email")); // OAuth2User 객체로부터 Resource Owner의 이메일 주소를 얻기
            nickName = String.valueOf(oAuth2User.getAttributes().get("name")); // 이름을 얻기
            image = String.valueOf(oAuth2User.getAttributes().get("picture")); // 프로필 이미지 URL을 얻기
        }

        List<String> roles = authorityUtils.createRoles(email);           // 권한 정보 생성

        Optional<Member> findMember = memberRepository.findByEmail(email);
        Member member = saveMember(email, nickName, image, roles);
        if (findMember.isPresent()) {
            member = findMember.get();
        } else {
            member = memberRepository.save(member);
        }

        redirect(request, response, member, roles);  // Access Token과 Refresh Token을 생성해서 Frontend 애플리케이션에 전달하기 위해 Redirect
    }

    private Member saveMember(String email, String nickname, String image, List<String> roles) {
        Member member = new Member();
        member.setEmail(email);
        member.setNickName(nickname);
        member.setImage(image);
        member.setRoles(roles);

        return member;
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(member, authorities);  // JWT Access Token 생성
        String refreshToken = delegateRefreshToken(member.getEmail());  // Refresh Token 생성

        response.setHeader("Authorization", "Bearer " + accessToken);  // 클리이언트한테 Access Token 보내주기 (이후에 클라이언트 측에서 백엔드 애플리케이션 측에 요청을 보낼 때마다 request header에 추가해서 클라이언트 측의 자격을 증명하는데 사용)
        response.setHeader("Refresh", refreshToken);                   // 클리이언트한테 Refresh Token 보내주기

        String uri = createURI(accessToken, refreshToken).toString();   // Access Token과 Refresh Token을 포함한 URL을 생성
        getRedirectStrategy().sendRedirect(request, response, uri);   // Frontend 애플리케이션 쪽으로 리다이렉트

        // response 헤더 정보 로그 출력
        for (String headerName : response.getHeaderNames()) {
            log.info(headerName + ": " + response.getHeader(headerName));
        }
    }

    private String delegateAccessToken(Member member, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());
        claims.put("nickName", member.getNickName());
        claims.put("roles", authorities);

        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String email) {
        String subject = email;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
//                .host("ec2-13-125-232-30.ap-northeast-2.compute.amazonaws.com")
                .host("main22.s3-website.ap-northeast-2.amazonaws.com")
                .port(80)
//                .host("localhost")
//                .port(8080)
//                .port(3000)
                .path("oauth2")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
