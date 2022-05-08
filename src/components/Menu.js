import React, { useEffect, useRef } from 'react';

export default () => {
     const refButton = useRef()
     const refMenu = useRef()

     const menuMechanism = () => {
          refButton.current.style.transition = "all .35s ease-in";
          refMenu.current.style.transition = "all .35s ease-in 0.35s";
          refButton.current.style.opacity = 0;
          refMenu.current.style.left = 0;
     }

     useEffect(() => {
          const clickDetected = (element) => {
               if(refMenu.current.contains(element.target)) {
                    return;
               }

               refButton.current.style.transition = "all .35s ease-in 0.35s";
               refMenu.current.style.transition = "all .35s ease-in";
               refButton.current.style.opacity = 1;
               refMenu.current.style.left = "-30vw";
          }

          document.body.addEventListener('click', clickDetected, true)

          return () => {
               document.body.removeEventListener('click', clickDetected, true)
          }
     }, [])

	return <React.Fragment>
                <div id="menu" ref={refButton} className="navigation-element" onClick={() => menuMechanism()}>Menu</div>
                <div id="openedMenu" ref={refMenu}>
                    <div>
                         <p>Menu</p>
                    </div>
                    <hr/>
                    <div>
                         <p>About the table</p>
                    </div>
                    <div>
                         <p>Dark / Light Theme</p>
                    </div>
                    <div>
                         <p>Change background color</p>
                    </div>
                    <div>
                         <p>Labels</p>
                    </div>
                    <div>
                         <p>Add stickers</p>
                    </div>
                    <hr/>
                    <div>
                         <p>Delete table</p>
                    </div>
                    <hr/>
                    <div>
                         <p>Activity</p>
                    </div>
                </div>
           </React.Fragment>;
};