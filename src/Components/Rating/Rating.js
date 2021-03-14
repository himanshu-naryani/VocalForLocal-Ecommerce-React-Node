import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';


const StyledRating = withStyles({
  iconFilled: {
    color: 'red',
  },
})(Rating);

export default function CustomizedRatings({rating}) {
  console.log(rating)
  return (
        <div>
  
        <StyledRating

          defaultValue={rating}
          precision={0.5}
          icon={<FavoriteIcon fontSize="inherit" />}
          readOnly
        />
        </div>
  );
}
