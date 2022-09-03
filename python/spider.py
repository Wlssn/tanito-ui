# -*- coding: UTF-8 -*-

from urllib.request import urlopen

myURL = urlopen("https://www.runoob.com/")
print(myURL.read())