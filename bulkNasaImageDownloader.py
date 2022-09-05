## Importing Necessary Modules
import urllib.request

baseUrl = 'https://climate.nasa.gov/system/time_series_images/'
counter = 0

def downloadImage(image_url):
	# Adding information about user agent
	opener=urllib.request.build_opener()
	opener.addheaders=[('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
	urllib.request.install_opener(opener)

	# setting filename and image URL
	filename = "images/" + image_url.split("/")[-1]

	# calling urlretrieve function to get resource
	urllib.request.urlretrieve(image_url, filename)


for year in range(2002, 2017):
	for month in range (1, 13):
		if (year == 2002 and month < 9):
			continue

		url = "{baseUrl}{counter_1}_co2_{year}_{month}_{counter_2:04d}_720x360.jpg".format(
			baseUrl = baseUrl,
			counter_1 = (counter + 944),
			year = year,
			month = month,
			counter_2 = counter
			)
		print("downloading " + url + "...")
		downloadImage(url)
		# print('"' + url + '",', end=" ")
		counter += 1