import { DecoratorKeys } from './internal/constants';
import { getName } from './internal/utils';
import { logger } from './logSettings';
import type { Func, IPluginsArray } from './types';

/**
 * Add a Middleware-Plugin
 * @param mongoosePlugin The Plugin to plug-in
 * @param options Options for the Plugin, if any
 */
export function plugin<T = any>(mongoosePlugin: Func, options?: T) {
  // don't check if options is an object, because any plugin could make it anything
  return (target: any) => {
    logger.info('Adding plugin "%s" to "%s" with options: "%o"', mongoosePlugin.name, getName(target), options);
    const plugins: IPluginsArray<any>[] = Array.from(Reflect.getMetadata(DecoratorKeys.Plugins, target) ?? []);
    plugins.push({ mongoosePlugin, options });
    Reflect.defineMetadata(DecoratorKeys.Plugins, plugins, target);
  };
}
