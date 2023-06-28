package com.codea.tag;

import com.codea.restaurant.Restaurant;
import com.codea.restaurant.RestaurantDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface TagMapper {
    List<TagDto.TagResponse> tagToTagResponseDtos(List<Tag> tag);
}
