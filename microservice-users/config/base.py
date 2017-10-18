from importlib import import_module


class BaseConfig:

    def from_object(self, obj):
        """Converts a configuration class into a dictionary of the form

            settings = {
                'DEBUG': True,
                'TESTING': False
            }
        """
        settings = dict()

        for key in dir(obj):
            if key.isupper():
                settings[key] = getattr(obj, key)

        return settings
