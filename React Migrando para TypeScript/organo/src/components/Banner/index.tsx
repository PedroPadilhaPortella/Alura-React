import './style.css';

interface BannerProps {
  image: string;
  alt?: string;
}

function Banner(props: BannerProps) {
  return (
    <div className="banner">
      <img src={props.image} alt={props.alt} />
    </div>
  );
}

export default Banner;
