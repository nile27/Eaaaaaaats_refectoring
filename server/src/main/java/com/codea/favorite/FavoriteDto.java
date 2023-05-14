package com.codea.favorite;


import lombok.AllArgsConstructor;
import lombok.Getter;

public class FavoriteDto {
    @Getter
    @AllArgsConstructor
    public static class AddFavoriteRequest {
        private Long restaurantId;
        private Long memberId;
    }


    @Getter
    @AllArgsConstructor
    public static class RemoveFavoriteRequest {
        private Long restaurantId;
        private Long memberId;
    }

    @Getter
    public static class FavoriteResponse {
        private Long favoriteId;
        private String restaurantName;
        private Long memberId;
        private int favoriteCount;

        public FavoriteResponse(Favorite favorite, int favoriteCount) {
            this.favoriteId = favorite.getFavoriteId();
            this.restaurantName = favorite.getRestaurant().getName();
            this.memberId = favorite.getMember().getMemberId();
            this.favoriteCount = favoriteCount;
        }
//
//        public int getFavoriteCount() {
//            return favoriteCount;
//        }
    }
}