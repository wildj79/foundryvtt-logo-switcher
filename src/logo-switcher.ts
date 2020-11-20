/**
 * This module simply allows a GM to set the logo in the top left corner
 * to something custom.
 * 
 * Author: James Allred
 * Software License: MIT
 */
import registerSettings from './module/register-settings.js';

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once('init', async function() {
	console.log('logo-switcher | Initializing Foundry Logo Switcher');
	
	// Register custom module settings
	registerSettings();
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', function(): void {
	const logoImage: string = game.settings.get('logo-switcher', 'logo-image');
	if (logoImage?.trim() !== "") {
		const img = new Image();
		img.addEventListener('load', (event) => {
			const width = img.width;
			const left = width + 20;
            const calc = `calc(100% - ${((left - 120) + 440)}px`;

			if (left > 120) {                
                game.settings.set('logo-switcher', 'navigation-position', {
                    left: left,
                    width: calc
                }).then(() => console.log('logo-switcher | Saved new scene navigation position'));

                $('#navigation')
                    .animate({ left: left }, 'fast')
                    .css({ 'width': calc });
            }
		});

		img.id = "logo";
		img.height = 50;
        img.src = logoImage;
        
        $('#logo').replaceWith(img);
	}
});

Hooks.on('renderSceneNavigation', (app: SceneNavigation, html: JQuery<HTMLElement>, data: any): void => {
    const position = game.settings.get('logo-switcher', 'navigation-position');
    html.css({'left': position.left, 'width': position.width});
});
