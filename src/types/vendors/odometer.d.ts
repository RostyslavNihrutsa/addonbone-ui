declare module "odometer" {
    interface OdometerOptions {
        el: Element;
        value?: number;
        format?: string;
        theme?: string;
        duration?: number;
    }

    export default class Odometer {
        constructor(options: OdometerOptions);

        value: number;

        update(newValue: number): void;
    }
}
