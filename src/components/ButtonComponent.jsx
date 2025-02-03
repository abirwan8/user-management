import { Button } from "react-bootstrap";

const ButtonComponent = ({ icon: Icon, label, backgroundColor, onClick }) => {
  return (
    <Button className={`d-flex align-items-center gap-2 border-0 ${backgroundColor}`} onClick={onClick}>
      {Icon && <Icon />}
      <span>{label}</span>
    </Button>
  );
};

export default ButtonComponent;
