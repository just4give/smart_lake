import { IonButton, IonMenuButton } from '@ionic/react';
import { menuController } from "@ionic/core";
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      
      <IonButton onClick={async () => await menuController.toggle()}>
        Toggle Menu
      </IonButton>
      
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
