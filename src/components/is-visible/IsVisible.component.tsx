type VisibleProps = {
  isVisible: boolean;
  children: any;
};

const IsVisible = ({ children, isVisible }: VisibleProps) => {
  return isVisible ? children : null;
};

export default IsVisible;
