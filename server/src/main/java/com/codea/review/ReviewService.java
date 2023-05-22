package com.codea.review;

import com.codea.Image.ImageService;
import com.codea.Image.Image;
import com.codea.Image.ImageDto;
import com.codea.Image.ImageRepository;
import com.codea.common.exception.ExceptionCode;
import com.codea.common.exception.BusinessLogicException;
import com.codea.member.Member;
import com.codea.member.MemberRepository;
import com.codea.restaurant.Restaurant;
import com.codea.restaurant.RestaurantRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.codea.review.Review.ReviewStatus.REVIEW_VALID;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final RestaurantRepository restaurantRepository;
    private final MemberRepository memberRepository;
    private final ImageRepository imageRepository;
    private final ImageService imageService;

    public ReviewService(ReviewRepository reviewRepository, RestaurantRepository restaurantRepository, MemberRepository memberRepository, ImageRepository imageRepository, ImageService imageService) {
        this.reviewRepository = reviewRepository;
        this.restaurantRepository = restaurantRepository;
        this.memberRepository = memberRepository;
        this.imageRepository = imageRepository;
        this.imageService = imageService;
    }

    @Transactional
    public Review createReview(long restaurantId, String email, ReviewDto.Post post) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.RESTAURANT_NOT_FOUND));
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Review review = new Review(post.getTitle(), post.getContent(), post.getRating());
        review.setRestaurant(restaurant);
        review.setMember(member);

        for (ImageDto.Post reviewImageTemp : post.getImage()) {
            String imageUrl = imageService.uploadImage(reviewImageTemp.getImageName(), reviewImageTemp.getBase64Image(), email);

            Image image = new Image(reviewImageTemp.getImageName(), imageUrl, review);
            imageRepository.save(image);
        }

        //평점 구하기
        int totalScore = 0;
        int reviewCount = reviewRepository.countByRestaurant_RestaurantId(restaurantId) + 1;

        List<Review> reviewList = restaurant.getReviews();
        for (Review reviewTemp : reviewList) {
            int score = reviewTemp.getRating().getScore();
            totalScore += score;
        }

        double rating = Math.round((double) (totalScore + (review.getRating().getScore())) / (double) (reviewCount) * 10) / 10.0;
        restaurant.setRating(rating);
        restaurant.setTotal_reviews(reviewCount);

        return reviewRepository.save(review);
    }

    @Transactional
    public Review updateReview(long reviewId, String email, ReviewDto.Patch patch) {
        Review findReview = findReview(reviewId);

        if (!findReview.getMember().getEmail().equals(email)) throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_EDIT);

        Review review = new Review(patch.getTitle(), patch.getContent(), patch.getRating());

        Optional.ofNullable(patch.getTitle()).ifPresent(title -> findReview.setTitle(title));
        Optional.ofNullable(patch.getContent()).ifPresent(content -> findReview.setContent(content));
        Optional.ofNullable(patch.getRating()).ifPresent(rating -> findReview.setRating(rating));
        findReview.setModifiedAt(LocalDateTime.now());

        for (ImageDto.Post reviewImageTemp : patch.getImage()) {
            String imageUrl = imageService.uploadImage(reviewImageTemp.getImageName(), reviewImageTemp.getBase64Image(), email);

            Image image = new Image(reviewImageTemp.getImageName(), imageUrl, review);
            imageRepository.save(image);
        }

        Optional.ofNullable(patch.getImage()).ifPresent((imageList) -> {
            imageRepository.deleteAllByReview_ReviewId(reviewId);
            for (ImageDto.Post reviewImageTemp : patch.getImage()) {
                String imageUrl = imageService.uploadImage(reviewImageTemp.getImageName(), reviewImageTemp.getBase64Image(), email);

                Image image = new Image(reviewImageTemp.getImageName(), imageUrl, review);
                imageRepository.save(image);
            }

        });

        return reviewRepository.save(findReview);
    }

    public Review findReview(long reviewId) {
        return reviewRepository.findById(reviewId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
    }

    public Page<Review> findReviews(long restaurantId, int page, int size) {
        return reviewRepository.findByRestaurant_RestaurantIdAndStatus(restaurantId, REVIEW_VALID, PageRequest.of(page, size, Sort.by("reviewId").descending()));
    }

    public void deleteReview(long reviewId) {
        Review findReview = findReview(reviewId);

        Restaurant restaurant = findReview.getRestaurant();
        long restaurantId = restaurant.getRestaurantId();

        int reviewCount = reviewRepository.countByRestaurant_RestaurantId(restaurantId);

        restaurant.setTotal_reviews(reviewCount - 1);

        reviewRepository.delete(findReview);
        restaurantRepository.save(restaurant);
    }

}
