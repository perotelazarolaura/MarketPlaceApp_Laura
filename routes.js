
const express = require("express")
const Addvert = require("./models/item.js")
const router = express.Router()

// Gets all advertisements
router.get("/addvertisements", async (req, res) => {
	const query = req.query;
	const db_filters={
		price: {$gte:0, $lt:Infinity},
	};

	// Creating query parameters for the Tags
	if(query.tag != undefined)
		db_filters.tags={$in:query.tag}
	// This is for a parameter for the price and seting undefined as default
	if(query.min_price != undefined)
		db_filters.price.$gte=query.min_price;
	if(query.max_price != undefined)
		db_filters.price.$lt=query.max_price;
	
	// Query to find add by name and set default as undefined and also made it non case sensitive
	if(query.name != undefined)
		db_filters.name=new RegExp('.*' + query.name + '.*', "i")
	// Query to find if the add is to sell or not
	if(query.sale != undefined)
		db_filters.sale = query.sale

	// Setting the query pagination to 1 as default 
	pagination={
		totalPages: 1,
		currentPage: 1
	};
	// I initialized the adds to 0 and then create the query pagination taking into consideration that there are 2 adds per page
	let adverts={}
	if(query.page_size && query.page){
		adverts = await Addvert.find(db_filters)
			.limit(query.page_size)
			.skip((query.page - 1) * query.page_size)
		const count = await Addvert.countDocuments(db_filters);
		pagination.totalPages = Math.ceil(count / query.page_size),
		pagination.currentPage = query.page
	} else{
		adverts = await Addvert.find(db_filters)
	}

	res.send({
		adverts:adverts,
		pagination
	})
});

// Posts (create) a new advertisement
router.post('/addvertisements', async (req, res) => {
	const advert = new Addvert({
		name: req.body.name,
    	sale: req.body.sale,
    	description: req.body.description,
		picture: req.body.picture,
    	tags: req.body.tags,
    	price: req.body.price,
	});

	await advert.save()
	res.send(advert)

});

// Obtain the tags
router.get('/tags', async (req, res, next) => {
	const tags = await Addvert.distinct("tags")
    res.send(tags);
});

module.exports = router
