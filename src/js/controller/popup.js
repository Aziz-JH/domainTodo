ng.a.controller('domainList', function($scope, $rootScope) {
	$scope.strDomain = '';
	$scope.domainList = {};
	$scope.currentTab = {};
	$scope.currentImage = '';

	chrome.tabs.getSelected(function(Tab) {
		$scope.strDomain = extractDomain(Tab.url);
		$scope.$apply();
	});

	$scope.newObj = {
		text: '',
		add: function() {
			var domain = angular.copy($scope.strDomain);
			var domainList = ls.get('domainList');
			if(angular.isUndefined(domainList)) {
				domainList = {};
			}
			if(angular.isUndefined(domainList[domain])) {
				domainList[domain] = [];
			}
			domainList[domain].push({
				cDate: new Date().getTime(),
				text: $scope.newObj.text,
				eDate: new Date().getTime()
			});
			ls.set('domainList', domainList);

			$scope.newObj.text = '';
		}
	};
	$scope.domainListReload = function(domainList) {
		if(angular.isUndefined(domainList)) {
			domainList = ls.get('domainList');
		}
		$scope.domainList = domainList;
	};
	ls.callback('domainList', function(domainList) {
		$scope.domainListReload(domainList);
	});
	$scope.domainListReload();



	$scope.removeDomainListItem = function(listItem) {
		var domainList = $scope.domainList[$scope.strDomain];
		var i = domainList.indexOf(listItem);
		domainList.splice(i, 1);
		console.warn(domainList);
		ls.set('domainList', $scope.domainList);
	};

	$scope.sort = function() {
		ls.set('domainList', $scope.domainList);
	}
});



