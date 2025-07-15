import {Storage} from "adnbn/storage";

import {Theme, ThemeStorageContract} from "../../types/theme";

export default class implements ThemeStorageContract {
    private readonly storage = new Storage<Record<string, Theme>>({
        area: "local",
        namespace: "adnbn-ui",
    });

    private readonly key = "theme";

    public async get(): Promise<Theme | undefined> {
        return await this.storage.get(this.key);
    }

    public async change(theme: Theme): Promise<void> {
        return this.storage.set(this.key, theme);
    }

    public async toggle(): Promise<void> {
        let theme = await this.get();

        if (!theme) {
            theme = Theme.Dark;
        }

        await this.change(theme === Theme.Dark ? Theme.Light : Theme.Dark);
    }

    public watch(callback: (theme: Theme) => void): () => void {
        return this.storage.watch({
            [this.key]: newValue => newValue && callback(newValue),
        });
    }
}
