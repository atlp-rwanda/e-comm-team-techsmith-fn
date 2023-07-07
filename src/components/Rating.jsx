import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { primaryColor } from '../constants';

/**
 *
 * @param {performrating} Specifies whether you want to perform rating or simply render the rating
 * @param {count} The number of stars to render
 * @param {rating} The rating value
 * @param {color} The color of the stars, an object with two keys: filled and unfilled
 * @param {onRating} The callback function to be called when a star is clicked
 * @param {className} The class name to be applied for styling the component
 *
 * @returns a rating component
 */

const Rating = ({
  count,
  rating,
  color,
  onRating,
  className,
  performrating
}) => {
  // INITIALIZE RATING
  const [hoverRating, setHoverRating] = useState(0);

  // GET COLOR DYNAMICALLY
  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    }
    if (!hoverRating && rating >= index) {
      return color.filled;
    }
    return color.unfilled;
  };

  // STAR RATING FUNCTION
  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => {
        return i + 1;
      })
      .map((index) => {
        return (
          <FontAwesomeIcon
            key={index}
            style={{ color: getColor(index), cursor: 'pointer' }}
            icon={faStar}
            onClick={() => {
              onRating(index);
            }}
            onMouseEnter={() => {
              return performrating && setHoverRating(index);
            }}
            onMouseLeave={() => {
              return performrating && setHoverRating(0);
            }}
          />
        );
      });
  }, [count, rating, hoverRating]);

  return <div className={`star_rating ${className}`}>{starRating}</div>;
};

Rating.propTypes = {
  count: PropTypes.number,
  rating: PropTypes.number,
  onRating: PropTypes.func,
  color: PropTypes.shape({
    filled: PropTypes.string,
    unfilled: PropTypes.string
  }),
  className: PropTypes.string,
  performrating: PropTypes.bool
};

Rating.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: primaryColor,
    unfilled: '#8A8484'
  },
  onRating: () => {
    return null;
  },
  performrating: false
};

export default Rating;