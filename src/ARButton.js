/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 */

 import { GameStateSystem } from "./Systems/systems.mjs";

 var ARButton = {

	createButton: function ( renderer ) {

		function showStartAR( /*device*/ ) {

			var currentSession = null;

			function onSessionStarted( session ) {

				session.addEventListener( 'end', onSessionEnded );

				/*
				session.updateWorldTrackingState( {
					'planeDetectionState': { 'enabled': true }
				} );
				*/

				// renderer.xr.setReferenceSpaceType( 'local' );
				renderer.xr.setSession( session );
				button.textContent = 'EXIT AR';

				currentSession = session;

			}

			function onSessionEnded( /*event*/ ) {

                world.getSystem(GameStateSystem).exitARSession();

				currentSession.removeEventListener( 'end', onSessionEnded );

				button.textContent = 'ENTER AR';

				currentSession = null;

			}

			//

			button.style.display = '';

			button.style.cursor = 'pointer';
			button.style.left = 'calc(50% - 50px)';
			button.style.width = '100px';

			button.textContent = 'ENTER AR';

			button.onmouseenter = function () {

				button.style.opacity = '1.0';

			};

			button.onmouseleave = function () {

				button.style.opacity = '0.5';

			};

            const sessionInit = {
                optionalFeatures: [
                  "local-floor",
                  "bounded-floor",
                  "hand-tracking"
                ]
            };

			button.onclick = function () {

				if ( currentSession === null ) {

                    world.getSystem(GameStateSystem).enterARSession();
					navigator.xr.requestSession( 'immersive-ar', sessionInit ).then( onSessionStarted );

				} else {

                    world.getSystem(GameStateSystem).exitARSession();
					currentSession.end();

				}

			};

		}

		function disableButton() {

			button.style.display = '';

			button.style.cursor = 'auto';
			button.style.left = 'calc(50% - 75px)';
			button.style.width = '150px';

			button.onmouseenter = null;
			button.onmouseleave = null;

			button.onclick = null;

		}

		function showARNotSupported() {

			disableButton();

			button.textContent = 'AR NOT SUPPORTED';

		}

		function stylizeElement( element ) {

			element.style.position = 'absolute';
			element.style.top = '20px';
			element.style.padding = '12px 6px';
			element.style.border = '1px solid #fff';
			element.style.borderRadius = '4px';
			element.style.background = 'rgba(0,0,0,0.1)';
			element.style.color = '#fff';
			element.style.font = 'normal 13px sans-serif';
			element.style.textAlign = 'center';
			element.style.opacity = '0.5';
			element.style.outline = 'none';
			element.style.zIndex = '999';

		}

		if ( 'xr' in navigator ) {

			var button = document.createElement( 'button' );
			button.style.display = 'none';

			stylizeElement( button );

			navigator.xr.isSessionSupported( 'immersive-ar' ).then( function ( supported ) {

				supported ? showStartAR() : showARNotSupported();

			} ).catch( showARNotSupported );

			return button;

		} else {

			var message = document.createElement( 'a' );
			message.href = 'https://immersiveweb.dev/';

			if ( window.isSecureContext === false ) {

				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message

			} else {

				message.innerHTML = 'WEBXR NOT AVAILABLE';

			}

			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';

			stylizeElement( message );

			return message;

		}

	}

};

export { ARButton };
