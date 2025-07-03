declare module "odometer" {
    class Odometer {
        constructor(options: {el: HTMLElement; auto?: boolean; value?: number; format?: string; duration?: number});

        update(value: number): void;
    }

    export default Odometer;
}
