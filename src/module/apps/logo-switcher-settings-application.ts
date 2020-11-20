export default class LogoSwitcherSettingsApplication extends FormApplication {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "logo-switcher-settings",
            classes: ["logo-switcher"],
            template: "modules/logo-switcher/templates/logo-switcher-settings.html",
            width: 500,
            closeOnSubmit: true,
            title: "LOGO_SWITCHER.Menu.Title"
        });
    }

    /** @override */
    activateListeners(html: JQuery<HTMLElement>) {
        super.activateListeners(html);
        html.find('button[name="reset"]').on('click', this._onResetDefaults.bind(this));
    }

    getData() {
        const logoImage: string = game.settings.get('logo-switcher', 'logo-image');

        return {
            logoImage: logoImage
        }
    }

    /**
     * Handle button click to reset the default image path.
     * 
     * @param {Event} event The button click event
     */
    async _onResetDefaults(event: Event): Promise<void> {
        event.preventDefault();
        await game.settings.set('logo-switcher', 'logo-image', '');
        await game.settings.set('logo-switcher', 'navigation-position', {left: 120, width: 'calc(100% - 440px)'});
        window.location.reload();
    }

    /** @override */
    async _updateObject(event: Event, formData: any): Promise<void> {
        await game.settings.set('logo-switcher', 'logo-image', formData['logoImage']);
        window.location.reload();
    }
}