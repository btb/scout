'''
This library is not supported by Sauce Labs. It merely servers as an
example on send data to the Sauce Labs API.
'''

# from selenium.webdriver.firefox.webdriver import WebDriver
# from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium import webdriver
import time, unittest, sys, copy
import wd.parallel

from django.conf import settings

USERNAME = getattr(settings, 'SAUCE_USERNAME', False)
ACCESS_KEY = getattr(settings, 'SAUCE_ACCESS_KEY', False)

from sauceclient import SauceClient
sauce_client = SauceClient(USERNAME, ACCESS_KEY)

class SauceParallel(unittest.TestCase):

    def setUp(self):
        # self.wd = WebDriver()
        # self.wd.implicitly_wait(60)

        desired_capabilities = []
            
        browser = copy.copy(webdriver.DesiredCapabilities.CHROME)
        browser['platform'] = 'Mac OS X 10.9'
        browser['name'] = 'Chrome'
        browser['tags'] = "Parallel"
        browser['build'] = "story/food"
        desired_capabilities += [browser]

        browser = copy.copy(webdriver.DesiredCapabilities.CHROME)
        browser['platform'] = 'Windows 10'
        browser['name'] = 'Chrome'
        browser['tags'] = "Parallel"
        browser['build'] = "story/food"
        desired_capabilities += [browser]

        self.drivers = wd.parallel.Remote(
            desired_capabilities=desired_capabilities,
            command_executor="http://" + USERNAME + ":" + ACCESS_KEY + "@ondemand.saucelabs.com:80/wd/hub")

    @wd.parallel.multiply
    def test_URL(self):

        self.baseurl = 'http://curry.aca.uw.edu:8001/'

        sauce_client.jobs.update_job(self.driver.session_id, name="Test URL navigation")
        #HomePage
        self.driver.get(self.baseurl)
        #FoodPage
        self.driver.get(self.baseurl + 'food/')
        #Discover Page
        self.driver.get(self.baseurl + 'discover/')
        #Filter Page
        self.driver.get(self.baseurl + 'filter/')

    @wd.parallel.multiply
    def tearDown(self):
        print("https://saucelabs.com/jobs/%s \n" % self.driver.session_id)
        try:
            if sys.exc_info() == (None, None, None):
                sauce_client.jobs.update_job(self.driver.session_id, passed=True)
            else:
                sauce_client.jobs.update_job(self.driver.session_id, passed=False)
        finally:
            self.driver.quit()

if __name__ == '__main__':
    unittest.main()
