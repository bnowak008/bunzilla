import Conf from 'conf';

interface Config {
  defaultType?: string;
  [key: string]: any;
}

let configInstance: Conf<Config>;

export function getConfig() {
  if (!configInstance) {
    configInstance = new Conf<Config>({
      projectName: '${projectName}',
      defaults: {
        defaultType: 'basic',
      },
    });
  }

  return configInstance;
}