let map;
let infoWindow; // Declare an info window variable

async function initMap() {
	const positions = [];

	positions.push({
		title: "Ovocný Světozor Vodičkova",
		lat: parseFloat("50.08222517710601"),
		lng: parseFloat("14.425742101853354"),
		branchImage: "images/Vodickova3.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/vodickova/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/vodickova"),
	});

	positions.push({
		title: "Spektrum Průhonice",
		lat: parseFloat("50.00375471535402"),
		lng: parseFloat("14.57385139665628"),
		branchImage: "images/pruhonice.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/spektrum-pruhonice/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/spektrum-pruhonice"),
	});

	positions.push({
		title: "V Olšinách",
		lat: parseFloat("50.07112929320325"),
		lng: parseFloat("14.48433032594106"),
		branchImage: "images/Strasnice1.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/v-olsinach/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/v-olsinach"),
	});

	positions.push({
		title: "Centrum Černý Most",
		lat: parseFloat("50.10841561925909"),
		lng: parseFloat("14.585168804295124"),
		branchImage: "images/CCM1.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/centrum-cerny-most/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/centrum-cerny-most"),
	});

	positions.push({
		title: "Sokolovská",
		lat: parseFloat("50.09155245960569"),
		lng: parseFloat("14.440839755968598"),
		branchImage: "images/Sokolovska1.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/sokolovska/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/sokolovska"),
	});

	positions.push({
		title: "Dejvická",
		lat: parseFloat("50.098204369418006"),
		lng: parseFloat("14.399956818314529"),
		branchImage: "images/Dejvicka1.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/dejvicka/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/dejvicka"),
	});

	positions.push({
		title: "Plzeňská",
		lat: parseFloat("50.06280467399626"),
		lng: parseFloat("14.314314816478362"),
		branchImage: "images/Plzenska.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/plzenska/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/plzenska"),
	});

	positions.push({
		title: "OC Nový Smíchov",
		lat: parseFloat("50.07320231896954"),
		lng: parseFloat("14.40225876429178"),
		branchImage: "images/Smichov3.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/oc-novy-smichov/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/oc-novy-smichov"),
	});

	positions.push({
		title: "Nuselská",
		lat: parseFloat("50.05477835158816"),
		lng: parseFloat("14.452391910597248"),
		branchImage: "images/Nusle1.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/nuselska/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/nuselska"),
	});

	positions.push({
		title: "Počátecká",
		lat: parseFloat("50.04416645231261"),
		lng: parseFloat("14.4559397106444"),
		branchImage: "images/Pocatecka.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/pocatecka/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/pocatecka"),
	});

	positions.push({
		title: "OC Westfield Chodov",
		lat: parseFloat("50.0321759937001"),
		lng: parseFloat("14.490985468267382"),
		branchImage: "images/Chodov3.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/centrum-chodov/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/centrum-chodov"),
	});

	positions.push({
		title: "Atrium Flora",
		lat: parseFloat("50.07837487603674"),
		lng: parseFloat("14.461323754777155"),
		branchImage: "images/Flora3.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/atrium-flora/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/atrium-flora"),
	});

	positions.push({
		title: "Havlíčkova",
		lat: parseFloat("50.08949807497971"),
		lng: parseFloat("14.432247397154761"),
		branchImage: "images/Havlickova3.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/havlickova/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/havlickova"),
	});

	positions.push({
		title: "OC Quadrio",
		lat: parseFloat("50.08115852707601"),
		lng: parseFloat("14.419521539482478"),
		branchImage: "images/Quadrio3.jpg",
		link: String("https://www.ovocnysvetozor.cz/objednejte-si/oc-quadrio/by,product_price/dirDesc"),
		link2: String("https://www.ovocnysvetozor.cz/pobocky/oc-quadrio"),
	});

	const { Map } = await google.maps.importLibrary("maps");
	const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

	let mapZoom = 11;
	if (window.innerWidth < 768) mapZoom = 10;

	const mapElement = document.querySelector("#branches-mapa");
	map = new Map(mapElement, {
		zoom: mapZoom,
		center: positions[0], // Set the first position as the default center of the map
		mapId: "BRANCH_MAP_ID",
	});

	// Create an info window
	infoWindow = new google.maps.InfoWindow({
		content: getInfoWindowContent(positions[0].branchImage, positions[0].title, positions[0].link, positions[0].link2),
	});

	// Function to dynamically generate info window content
	function getInfoWindowContent(branchImage, title, link, link2) {
		console.log(link);
		console.log(link2);

		return `
      <div class="branch-maps-popup">
        <img class="branch-maps-logo" src="https://www.ovocnysvetozor.cz/logo.png" alt="Logo">
        <div class="branch-image-container">
          <img class="branch-image" src="https://www.ovocnysvetozor.cz/${branchImage} " alt="Logo">
        </div>
        <p class="branch-map-branch-title">${title}</p>
        <div class="branch-map-info-window-buttons-div">
          <button class="button" onclick='window.location = "${link}"'>Přejít do e-shopu</button>
          <button class="black-btn branch-map-info-window-button" onclick='window.location = "${link2}"'>Více</button>
        </div>
      </div>
    `;
	}

	let markers = [];
	// Create a marker for each position in the list
	positions.forEach((position) => {
		console.log(position);

		const newMarkerImg = document.createElement("img");
		newMarkerImg.src = "https://www.ovocnysvetozor.cz/maps-and-flags.png";
		newMarkerImg.style.width = "48px";
		newMarkerImg.style.height = "48px";

		const marker = new AdvancedMarkerElement({
			map: map,
			position: position,
			content: newMarkerImg,
		});

		markers.push(marker);

		marker.addListener("click", () => {
			infoWindow.setContent(getInfoWindowContent(position.branchImage, position.title, position.link, position.link2));
			infoWindow.open(map, marker); // Open info window upon marker click
		});
	});

	const clusterIcon = {
		className: "cluster-icon",
	};

	const renderer = {
		render: ({ count, position }) =>
			new google.maps.Marker({
				icon: {
					path: google.maps.SymbolPath.CIRCLE,
					fillColor: "#e30613",
					fillOpacity: 1,
					strokeWeight: 0,
					scale: 18,
				},
				label: {
					text: String(count),
					color: "white",
					fontSize: "16px",
					fontWeight: "bold",
				},
				position,
				zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
			}),
	};

	new markerClusterer.MarkerClusterer({ markers, map, renderer });
}

initMap();
