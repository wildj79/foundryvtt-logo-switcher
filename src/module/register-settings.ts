import LogoSwitcherSettingsApplication from "./apps/logo-switcher-settings-application.js";

export default function() {
	// Register any custom module settings here
	game.settings.registerMenu('logo-switcher', 'logo-switcher-menu', {
		name: "LOGO_SWITCHER.Menu.Settings.Title",
		label: "LOGO_SWITCHER.Menu.Settings.Label",
		hint: "LOGO_SWITCHER.Menu.Settings.Hint",
		icon: "far fa-file-image",
		type: LogoSwitcherSettingsApplication,
		restricted: true
	});

	game.settings.register('logo-switcher', 'logo-image', {
		scope: 'world',
		config: false,
		type: String,
		default: ''
    });
    
    game.settings.register('logo-switcher', 'navigation-position', {
		scope: 'client',
		config: false,
		type: Object,
		default: {
            left: 120,
            width: 'calc(100% - 440px)'
        }
    });
}
