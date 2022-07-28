import { useNavigate } from 'react-router-dom';
import './categoryItem.scss';

function CategoryItem({ category }) {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(category.route);
  };
  return (
    <div className="directory-item-container" onClick={navigateHandler}>
      {/* img */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      ></div>
      <div className="body">
        <h2>{category.title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
}
export default CategoryItem;
