import { LOADING_SERVICE } from '../providers/loading-service/loading-service.constant';

export const Loading: MethodDecorator = (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const originalFunc: Function = target[propertyKey];

    descriptor.value = async function (...args: Array<any>) {
        const returnValue: Promise<unknown> = originalFunc.apply(this, args);

        LOADING_SERVICE.addPromise(returnValue);

        return returnValue;
    };
};
