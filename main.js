//Setting an Angular module: myApp
angular.module ('myApp',['ngRoute','ngRating','ngStorage'])   //add ng-route as a dependency

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

	new Quote('Hansel rocks', 'ek', 0)
	new Quote('life is good','ek', 0)
	new Quote('Ed\'s ok', 'hansel', 0)
	new Quote('Maria can Fly', 'hansel', 0)

	return {
		Quote 		: Quote,
		quoteList 	: quoteList,
	}

})


//Defining the Controller function: mainControllerFunc
var mainControllerFunc = function ($scope, quoteFactory , $routeParams, $localStorage,$sessionStorage) {
	


	
	$scope.authorIndex = $routeParams.id

	// $scope.quotes = quoteFactory.quoteList

	var quoteSort = function (quoteA, quoteB) {
		if (quoteA.rating > quoteB.rating) {
			return -1
		} else if (quoteA.rating < quoteB.rating) {
			return 1
		} else if (quoteA.rating === quoteB.rating) {
			return 0
		}
	}


	$scope.$storage = $localStorage.$default({
    	counter: 0,
    	quotes : quoteFactory.quoteList
	});

	$scope.sortQuotes = function () {
		$scope.$storage.quotes.sort(quoteSort)
	}
	$scope.sortQuotes()

	$scope.newQuote = ''
	$scope.newAuthor = ''

	$scope.addQuote = function(){
		new quoteFactory.Quote($scope.newQuote, $scope.newAuthor, 0)
		$scope.$storage.quotes.push(quoteFactory.quoteList[quoteFactory.quoteList.length-1])
		$scope.sortQuotes()
		$scope.newQuote = ''
		$scope.newAuthor = ''

	}

	$scope.removeQuote = function (index) {
		$scope.$storage.quotes.splice(index,1)
	}

	$scope.currentAuthor = function(currentAuthor) {
		return currentAuthor.author === $scope.$storage.quotes[$scope.authorIndex].author
	}
	// $localStorage.$reset()
	// location.reload()

}


//Registering the controller: mainController
angular.module('myApp').controller('mainController',['$scope','quoteFactory','$routeParams', '$localStorage', '$sessionStorage', mainControllerFunc])


