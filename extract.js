document.addEventListener('DOMContentLoaded', function() {
	const button = document.getElementById('extractButton');
	async function fetchData() {
		try {
			const response = await fetch(await getCurrentTabUrl());
			if(!response.ok) {
				const errorMessage = response.status === 403
	       			? `Server understood the request but refuses to authorize access [ERROR 403].`
	      			: `HTTP error! Status: ${response.status} - ${response.statusText}`;
	    		alert(errorMessage);
			}
			else {alert('content extracted successfully ❤️')}
			const htmlString = await response.text()
			const parser = new DOMParser();
			const htmlDocument = parser.parseFromString(htmlString, 'text/html')
			console.info(htmlDocument)
		} 
		catch(error) {
			console.error('error fetching data: ', error)
			alert(error)
		}
	}

	async function getCurrentTabUrl() {
		return new Promise((resolve, reject) => {
		    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		      if (chrome.runtime.lastError) {
		        reject(chrome.runtime.lastError);
		        return;
		      }

		      if (tabs && tabs.length > 0) {
		        const currentTab = tabs[0];
		        const url = currentTab.url;
		        resolve(url);
		      } else {
		        resolve(null);
		      }
		    });
	  	});
	}
	button.addEventListener('click', fetchData)
})