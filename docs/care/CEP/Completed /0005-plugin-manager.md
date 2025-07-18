
# CEP-5: Care Apps

## Requirements/Motive 

Since Care is being used in different environments for different use-cases, there must exist some method to efficiently create modifications which does not
impact unrelated deployments.

Some type of plugin system is required to achieve this.

Plugins can be abstracted standalone features, they should be capable of being maintained as separate packages, this allows easy 3rd party integrations as well.

Care must be modified to allow plugins to be easily created and configured.

## Implementation

To solve the problem in an abstracted way, a new package manager would be added onto care's core system. The core system
will be responsible for maintaining the bare necessary components to operate a facility ( or a hospital ). Everything other
than that can be made into apps that can be composed together to form deployments as required. 

A plugin will be called as a `plug` or an `app` ( `app` is already defined by django, so `plug` is used in those cases to avoid confusion ) 

Plugs will be managed in care through a plug manager and configured via a plug config, the plug config would take care of composing and defining plugs.  

Plugs will be added at build time rather than runtime, this allows care to be deployed in areas with no internet connectivity. At build time
the plug manager would iterate through each plug and install it along with its requirements. plugs will also have hooks to be executed at this point.

Plugs should not directly edit database structures maintained by the core system, plugs can have their own models and maintain relations if needed. 

Django signals can be used to listen for changes in the core system and react to them as needed. Custom signals can be created in the core system as needed 
to cater to the needs of the plugs.

## Plug Config

The plug config is located at the root of the project in the `plug_config.py` file.  

```python

from plugs.manager import PlugManager
from plugs.plug import Plug

my_plugin = Plug(
    name="my_plugin",
    package_name="git+https://github.com/octo/my_plugin.git",
    version="@v1.0.0",
    configs={
        "SERVICE_API_KEY": "my_api_key",
        "SERVICE_SECRET_KEY": "my_secret_key",
        "VALUE_1_MAX": 10,
    },
)

plugs = [my_plugin]

manager = PlugManager(plugs)
```

The plugs variable is defined as a list of plugs, the developer can add plugins as needed here to compose a deployment. The configs dict 
can be used to override variables that the plug uses, this can also hold functions if needed to get fine grain control over the deployment.


References: 
- https://github.com/openedx/edx-django-utils/tree/master/edx_django_utils/plugins
- https://github.com/useblocks/groundwork
