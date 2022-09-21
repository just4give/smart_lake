import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { apps, appsOutline, appsSharp, archiveOutline, archiveSharp, bookmarkOutline, cogOutline, cogSharp, heartOutline, heartSharp, mailOutline, mailSharp, megaphoneOutline, megaphoneSharp, moon, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import React, { useState } from 'react';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    iosIcon: appsOutline,
    mdIcon: appsSharp
  },
  {
    title: 'Devices',
    url: '/devices',
    iosIcon: cogOutline,
    mdIcon: cogSharp
  },
  {
    title: 'Subscriptions',
    url: '/subscriptions',
    iosIcon: megaphoneOutline,
    mdIcon: megaphoneSharp
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState<any>(false);

  React.useEffect(() => {
    const theme = localStorage.getItem("theme");
    //console.log(theme);

    if (!theme || theme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }

  }, []);

  const toggleDarkModeHandler = (e:any) => {
    e.preventDefault();
    //console.log("called toggle",e.detail.checked,darkMode);

    //document.body.classList.toggle("dark");
    const theme = localStorage.getItem("theme");

    if(e.detail.checked){
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    }else{
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }

    


  };

  return (
    <IonMenu contentId="main" side='start' className='menu'>
      

      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>East Lyme</IonListHeader>
          <IonNote>108 Pennsylvania Ave</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false} >
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

          <div className='version'>
            <IonItem lines="none" >
              <IonIcon slot="start" icon={moon} />
              <IonLabel>Dark Mode</IonLabel>
              <IonToggle
                checked={darkMode}
                slot="end"
                name="darkMode"
                onIonChange={e=>{
                  
                  toggleDarkModeHandler(e);
                }}
              />
            </IonItem>

            <IonItem lines="none" >
              <IonLabel>V1.0.0</IonLabel>
            </IonItem>
          </div>

        </IonList>


      </IonContent>
    </IonMenu>
  );
};

export default Menu;
