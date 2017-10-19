from importlib import import_module


class Config:

    def __init__(self, settings_module: str):
        self.settings_module = import_module(settings_module)

    def from_object(self, settings_class: str) -> dict:
        """Converts a configuration class into a dictionary of the form

            settings = {
                'DEBUG': True,
                'TESTING': False
            }
        """
        settings = dict()
        settings_class = getattr(self.settings_module, settings_class)

        for key in dir(settings_class):
            if key.isupper():
                settings[key] = getattr(settings_class, key)

        return settings


config = Config('project.config.settings')
