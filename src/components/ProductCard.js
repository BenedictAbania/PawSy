import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty, faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import '../styles/ProductCard.css'; // We will create this new CSS file

// A helper component to render dynamic star ratings
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon icon={faStar} key={`full-${i}`} />);
  }
  if (halfStar) {
    stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key="half" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesomeIcon icon={faStarEmpty} key={`empty-${i}`} />);
  }
  return <div className="star-rating">{stars} <span className="rating-value"> {rating}</span></div>;
};

const ProductCard = ({ product, onAddToCart, isFavorite, onToggleFavorite }) => {
  // Destructure product properties for easier use
  const { id, name, category, price, rating, image } = product;

  return (
    // h-100 ensures all cards in a row are the same height
    <Card className="h-100 product-card-unified">
      <Link to={`/shop/${id}`} className="product-card-link">
        <Card.Img 
          variant="top" 
          src={image} 
          alt={name}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/f5f5f5/c4c4c4?text=Image+Not+Available'; }}
        />
      </Link>
      
      {/* d-flex and flex-column are Bootstrap classes to make the button stick to the bottom */}
      <Card.Body className="d-flex flex-column">
        {/* --- This is the new section that combines title and heart button --- */}
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <Card.Text className="text-muted small mb-1">{category}</Card.Text>
            <Card.Title className="product-card-title mb-2">
              <Link to={`/shop/${id}`} className="product-card-link">
                {name}
              </Link>
            </Card.Title>
          </div>
          <Button
            variant="link"
            className="heart-btn p-0"
            onClick={onToggleFavorite}
          >
            <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} />
          </Button>
        </div>
        {/* --- End of new section --- */}

        <StarRating rating={rating} />
        
        <Card.Text className="h5 text-primary my-2">
          ${price.toFixed(2)}
        </Card.Text>
        
        {/* mt-auto pushes this button to the bottom of the card */}
        <Button 
          variant="warning" 
          className="mt-auto add-to-cart-btn"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;