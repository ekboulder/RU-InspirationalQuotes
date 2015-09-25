//Setting an Angular module: myApp
angular.module ('myApp',['ngRoute'])   //add ng-route as a dependency

angular.module('myApp').config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller 	: 'mainController',
			templateUrl : 'landing.html', 
		})
		.when('/author/:id', {
			controller 	: 'mainController',
			templateUrl	: 'author.html',
		})
		.otherwise({
			redirectTo: '/'
		})
})

angular.module('myApp').factory('quoteFactory', function(){

	var quoteList = []
	//@param quote String
	//@param author String
	//@param rating Number
	var Quote = function(quote, author, rating) {
		this.quote = quote
		this.author = author
		this.rating = rating
	
		quoteList.push(this)
	}

	new Quote('Hansel rocks', 'ek', 10)
	new Quote('Ed\'s ok', 'hansel', 8)

	return {
		Quote 		: Quote,
		quoteList 	: quoteList,
	}

})

//Defining the Controller function: mainControllerFunc
var mainControllerFunc = function ($scope, quoteFactory,$routeParams) {
	$scope.quotes = quoteFactory.quoteList

	$scope.authorIndex = $routeParams.id



}


//Registering the controller: mainController
angular.module('myApp').controller('mainController',['$scope','quoteFactory','$routeParams', mainControllerFunc])