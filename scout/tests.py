from django.conf import settings
from django.utils import unittest
from scout.test.space_dao import SpaceDAOTest

USERNAME = getattr(settings, 'SAUCE_USERNAME', False)
ACCESS_KEY = getattr(settings, 'SAUCE_ACCESS_KEY', False)

if USERNAME and ACCESS_KEY:
    from scout.test.sauce_parallel import SauceParallel
    # from scout.test.pageflow_navigation import PageFlowNavigationTest
    # from scout.test.fidelity_ui import UITest
