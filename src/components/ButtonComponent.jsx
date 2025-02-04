import { Button } from "react-bootstrap";

const ButtonComponent = ({ icon: Icon, label, className, onClick }) => {
  return (
    <Button className={`d-flex align-items-center gap-2 border-0 hover-effect ${className}`} onClick={onClick}>
      {Icon && <Icon />}
      <span>{label}</span>
    </Button>
  );
};

export default ButtonComponent;
