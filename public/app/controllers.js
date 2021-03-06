var app = angular.module('ecommerce');


// admin and add, update and delete products
app.controller('adminCtrl', function($scope, adminService, customerService, cartService, products, photos, fileReader){
	
	$scope.createAdmin = function(){
		customerService.addCustomer('Brent Grundeland', 'b_grundeland@Yahoo.com', 'test').then(function(response){
			console.log('user created');
		});

	};

	$scope.createAccount = function(date, password){
		customerService.addCustomer('excursion', date, password).then(function(response){
			$scope.date = '';
			$scope.password = '';
			Materialize.toast('account created', 1000);
		}, function(err){
			Materialize.toast('account was not created.  Contact your administrator.', 1000);
		});
	};

	$scope.products = products;
	$scope.photos = photos;
	$scope.categoryOptions = ['Dry Pipes', 'Water Pipes', 'Oil Rigs', 'Rig Accessories', 'Dabbers', 'Pendants'];

	$scope.dryPipes = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'Dry Pipes'){
			$scope.dryPipes.push($scope.products[i]);
		}
	}
	$scope.waterPipes = []; 
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'Water Pipes'){
			$scope.waterPipes.push($scope.products[i]);
		}
	}
	$scope.oilRigs = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'Oil Rigs'){
			$scope.oilRigs.push($scope.products[i]);
		}
	}
	$scope.rigAccessories = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'Rig Accessories'){
			$scope.rigAccessories.push($scope.products[i]);
		}
	}
	$scope.dabbers = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'Dabbers'){
			$scope.dabbers.push($scope.products[i]);
		}
	}
	$scope.pendants = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'Pendants'){
			$scope.pendants.push($scope.products[i]);
		}
	}
	$scope.showImageDetails = function(image){
		image.show = !image.show;
	};
	
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          $scope.imageSrc = result;
                      });
    };
 
    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });




	$scope.getProducts = function(){
		adminService.getProducts().then(function(response){
			$scope.products = response.data;
		});
	};

	

	$scope.addProduct = function(imageSrc, file, title, price, description, category){
		$scope.file = file;
		adminService.uploadPhoto(imageSrc, $scope.file).then(function(response){
			var url = response.data.Location;
			adminService.addProduct(title, price, url, description, category).then(function(response){
				$scope.productTitle = '';
				$scope.productPrice = 20;
				$scope.productDescription = '';
				$scope.imageSrc = null;
				$scope.productCategory = '';
				$scope.getProducts();
				Materialize.toast("product added.  you may need to refresh the page", 1000);
			});
		}, function(err){
			Materialize.toast('product was not added', 1000);
		});
	};

	$scope.updateProduct = function(id, title, description, price, category){
		if(confirm("Are you sure you want to update this products info?")){
			adminService.updateProduct(id, title, description, price, category).then(function(response){
				Materialize.toast("product updated.", 1000);
				$scope.getProducts();
			});
		}
	};

	$scope.removeProduct = function(id){
		if(confirm("Are you sure you want to delete this product?")){
			adminService.removeProduct(id).then(function(response){
				$scope.getProducts();
				Materialize.toast("product deleted", 1000);
			}, function(err){
				Materialize.toast("something went wrong", 1000);
			});
		}
	};


	$scope.getPhotos = function(){
		adminService.getPhotos().then(function(response){
			$scope.photos = response.data;
		}, function(err){
			Materialize.toast("couldn't retrieve photos", 1000);
		});
	};

	

	// $scope.addPhoto = function(title, imageSrc, description, category, auth){
	$scope.addPhoto = function(imageSrc, file, title, description, category, auth){
		$scope.file = file;
		adminService.uploadPhoto(imageSrc, $scope.file).then(function(response){
			var url = response.data.Location;
			adminService.addPhoto(title, url, description, category, auth).then(function(response){
				$scope.photoTitle = '';
				$scope.photoDescription = '';
				$scope.imageSrc = null;
				$scope.photoCategory = '';
				$scope.photoAuth = 'store';
				$scope.getPhotos();
				Materialize.toast("photo added", 1000);
			}, function(err){
				Materialize.toast("photo was not added", 1000);
			});
		});
	};


				

	$scope.updatePhoto = function(id, title, description, category, auth){
		if(confirm("Are you sure you want to update this image's info?")){
			adminService.updatePhoto(id, title, description, category, auth).then(function(response){
				Materialize.toast('This image has been updated', 1000);
				$scope.getPhotos();
			}, function(err){
				Materialize.toast("photo not updated", 1000);
			});
		}
	};

	$scope.removePhoto = function(id){
		if(confirm("Are you sure you want to delete this image?")){
			adminService.removePhoto(id).then(function(response){
				$scope.getPhotos();
				Materialize.toast('photo deleted', 1000);
			}, function(err){
				Materialize.toast('photo not deleted', 1000);
			});
		}
	};

	var currentTime = new Date();
	$scope.currentTime = currentTime;
	$scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.today = 'Today';
	$scope.clear = 'Clear';
	$scope.close = 'Close';
	$scope.onStart = function () {
	    console.log('onStart');
	};
	$scope.onRender = function () {
	    console.log('onRender');
	};
	$scope.onOpen = function () {
	    console.log('onOpen');
	};
	$scope.onClose = function () {
	    console.log('onClose');
	};
	$scope.onSet = function () {
	    console.log('onSet');
	};
	$scope.onStop = function () {
	    console.log('onStop');
	};

});






//admin orders
app.controller('orderCtrl', function($scope, orders, adminService){
	$scope.orders = orders;
	$scope.showOrder = function(order){
		order.show = !order.show;
	};

	$scope.paymentStatusOptions = ['waiting', 'processing', 'paid'];
	$scope.orderStatusOptions = ['processing', 'shipping', 'on hold', 'delivered'];

	$scope.updateOrder = function(orderId, paymentStatus, orderStatus){

		adminService.updateOrder(orderId, paymentStatus, orderStatus).then(function(response){
			Materialize.toast('order updated', 1000);
		});
	};
});






//---------------------------------------------------//







//controls the home page of website
app.controller('homeCtrl', function($scope, instagram, photos){

	$scope.feed = instagram;
	$scope.carouselPhotos = photos;

	(function($){
		$(function(){
			$('.button-collapse').sideNav();
			$('.parallax').parallax();
			console.log('im here again');
			}); // end of document ready
	})(jQuery);
});




//---------------------------------------------------//




//about page
app.controller('aboutCtrl', function($scope, instagram, photos){

	$scope.feed = instagram;

	$scope.carouselPhotos = photos;
	
});





//---------------------------------------------------//



//contact page
app.controller('contactCtrl', function($scope, emailService){


	$scope.sendEmail = function(fromEmail, fromName, toEmail, toName, subject, message){
		emailService.sendEmail(fromEmail, fromName, toEmail, toName, subject, message).then(function(response){
			$scope.fromEmail = '';
			$scope.fromName = '';
			$scope.message = '';
			Materialize.toast('your message has been sent', 1000);
		}, function(err){
			Materialize.toast('your message could not be send', 1000);
		});
	};
});









//---------------------------------------------------//




app.controller('excursionCtrl', function($scope, $location, cart, cartService, authService, products, photos, user){
	$scope.user = user;
	$scope.photos = photos;
	$scope.products = products;
	$scope.cart = cart;
	$scope.buildProducts = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'Dry Pipes'){
			$scope.buildProducts.push($scope.products[i]);
			console.log(buildProducts);
		}
	}
	// console.log(55555, $scope.photos)
	$scope.excursionPhotos = [];

	for(var i = 0; i < $scope.photos.length; i++){
		if($scope.user && $scope.photos[i].auth === $scope.user.local.email){
			$scope.excursionPhotos.push($scope.photos[i]);
			console.log(22222,$scope.excursionPhotos);
		}
	}

	$scope.print = 'print';
	$scope.item = 'product';

	$scope.item = '';
	$scope.imageUrl = '';




	$scope.buildItem = function(item){
		$scope.product = item;
		$scope.item = item.image;
	};

	$scope.buildImage = function(image){
		$scope.photo = image;
		$scope.imageUrl = image.imageUrl;
	};


	$scope.addToCart = function(item, photo){
		if(!item){
			Materialize.toast('nothing added to cart', 1000);
		}
		if(photo){
			var product = {
				item: {
					id: item._id,
					title: item.title,
					imageUrl: item.image,
					price: item.price,
				},
				photo: {
					id: photo._id,
					imageUrl: photo.imageUrl
				}, 
				quantity: 1
			};
		} else {
			var product = {
				item: {
					id: item._id,
					title: item.title,
					imageUrl: item.image,
					price: item.price,
				}, 
				quantity: 1
			};
		}
		cartService.addToCart(product).then(function(response){
			$scope.imageUrl = '';
			$scope.item = '';
			$scope.cart = response.data;
			Materialize.toast('item added to cart', 1000);
		});
	};

	


	// console.log(111111, $scope.user)
	if(!$scope.user){
		$scope.showLogin = !$scope.showLogin;
	}

	$scope.login = function(date, password){
		authService.login(date, password).then(function(response){
			// console.log(44444,response.data)
			$scope.user = response.data;
			$scope.showLogin = !$scope.showLogin;
			// console.log(66666, $scope.user.local.email)

			for(var i = 0; i < $scope.photos.length; i++){
				if($scope.photos[i].auth === $scope.user.local.email){
					$scope.excursionPhotos.push($scope.photos[i]);
					console.log(3333,$scope.excursionPhotos);
				}
			}
			
		}, function(err){
			$scope.errorMessage = "wrong date and/or passowrd";
		});
	};

	
	
});






//---------------------------------------------------//






//controls the shopping area and views products
app.controller('shopCtrl', function($scope, $location, productService, cartService, cart, customerService, products, photos){

	$scope.createAdmin = function(){
		customerService.addCustomer('Brent Grundeland', 'b_grundeland@Yahoo.com', 'test').then(function(response){
			Materialize.toast('user created', 1000);
		});

	};

	$scope.cart = cart;


	$scope.products = products;
	$scope.photos = photos;
	

	$scope.favorites = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'favorite'){
			$scope.favorites.push($scope.products[i]);
		}
	}

	$scope.buildProducts = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].category === 'Dry Pipes'){
			$scope.buildProducts.push($scope.products[i]);
		}
	}


	$scope.print = 'print';
	$scope.item = 'product';

	$scope.item = '';
	$scope.imageUrl = '';




	$scope.buildItem = function(item){
		$scope.product = item;
		$scope.item = item.image;
	};

	$scope.buildImage = function(image){
		$scope.photo = image;
		$scope.imageUrl = image.imageUrl;
	};


	$scope.addToCart = function(item, photo){
		if(!item){
			Materialize.toast('nothing added to cart', 1000);
		}
		if(photo){
			var product = {
				item: {
					id: item._id,
					title: item.title,
					imageUrl: item.image,
					price: item.price,
				},
				photo: {
					id: photo._id,
					imageUrl: photo.imageUrl
				}, 
				quantity: 1
			};
		} else {
			var product = {
				item: {
					id: item._id,
					title: item.title,
					imageUrl: item.image,
					price: item.price,
				}, 
				quantity: 1
			};
		}
		cartService.addToCart(product).then(function(response){
			$scope.imageUrl = '';
			$scope.item = '';
			$scope.cart = response.data;
			Materialize.toast('item added to cart', 1000);
		});
	};
});






//---------------------------------------------------//



// controls the ordering process
app.controller('checkoutCtrl', function($scope, $location, customerService, cartService, orderService, cart){

	// $scope.customer = customer;
	$scope.cart = cart;
	console.log(cart);

	var total = 0;
	for(var i = 0; i < $scope.cart.length; i++){
		$scope.cart[i].total = $scope.cart[i].quantity * $scope.cart[i].price;
		total += $scope.cart[i].total;
		$scope.total = total.toFixed(2);
	}

	$scope.backToShop = function(){
		$location.path('/store/');
	};

	$scope.placeOrder = function(customer, address, products){
		var order = {
			customer: customer,
			products: products,
			total: $scope.total,
			address: address
		};
		orderService.placeOrder(order).then(function(response){
			$location.path('/payment/' + response.data._id);
		}, function(err){
			Materialize.toast('something went wrong', 1000);
			console.log(err);
		});
	};

	$scope.submitShippingInfo = function(name, email, shipTo, address, address2, city, state, zip){
		var customer = {
			name: name,
			email: email
		};

		var address = {
			name: shipTo,
			address: address,
			address2: address2, 
			city: city,
			state: state,
			zip: zip
		};

		var products = [];
		for(var i = 0; i < $scope.cart.length; i++){
			if($scope.cart[i].photo){
				var product = {
					product: $scope.cart[i].item.id,
					photo: $scope.cart[i].photo.id,
					price: $scope.cart[i].item.price,
					quantity: $scope.cart[i].quantity
				};
			} else {
				product = {
					product: $scope.cart[i].item.id,
					price: $scope.cart[i].item.price,
					quantity: $scope.cart[i].quantity
				};
			}
			products.push(product);
		}


		$scope.placeOrder(customer, address, products);
	};
});






//---------------------------------------------------//






app.controller('paymentCtrl', function($scope, order){
	console.log(order);
	$scope.order = order;
	if(!$scope.order.address.name){
		$scope.order.address.name = $scope.order.customer.name;
	}

	$scope.chargeLocation = '/charge/' + $scope.order._id;
});

app.controller('confirmationCtrl', function($scope, order){
	$scope.order = order;
});
