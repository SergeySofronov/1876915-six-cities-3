import { useMemo } from 'react';
import { AuthorizationStatus, MAX_SHOWN_COMMENTS } from '../../const';
import { useAuthStatusSelector } from '../../store';
import { PlaceComment } from '../../types';
import { getCommentDate } from '../../utils/comment';
import PlaceRating from '../place-card/place-rating';
import ReviewForm from './review-form';

type ReviewsProps = {
  placeId: string;
  reviews: PlaceComment[];
};

export default function Reviews({ reviews, placeId }: ReviewsProps) {

  const status = useAuthStatusSelector();
  const isAuthorized = (status === AuthorizationStatus.Auth);
  const sortedReviews = useMemo(() => reviews.toSorted((first, second) => new Date(first.date).getDate() - new Date(second.date).getDate()).slice(0, MAX_SHOWN_COMMENTS), [reviews]);

  return (
    <section className="offer__reviews reviews" data-testid="reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount" data-testid="reviews-amount">{sortedReviews.length}</span>
      </h2>
      {sortedReviews.map((review) => {
        const [date, fullDate] = getCommentDate(review.date);

        return (
          <ul className="reviews__list" key={review.id}>
            <li className="reviews__item" data-testid="review-item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={review.user.avatarUrl}
                    width={54}
                    height={54}
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{review.user.name}</span>
              </div>
              <div className="reviews__info">
                <PlaceRating placeRating={review.rating} className={{ rating: 'reviews__rating', stars: 'reviews__stars' }} />
                <p className="reviews__text">{review.comment}</p>
                <time className="reviews__time" dateTime={fullDate}>{date}</time>
              </div>
            </li>
          </ul>
        );
      })}
      {isAuthorized && <ReviewForm placeId={placeId} />}
    </section>
  );
}
