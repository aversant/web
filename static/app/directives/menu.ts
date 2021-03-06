import {Api} from '../services/api';

declare function require(string): any;

export interface IMenuScope extends ng.IScope{
	go(path:string);
	login:string;
	trigger_active: boolean;
	settings_active: boolean;
}

export function Menu($location:ng.ILocationService, api:Api): ng.IDirective {

	return {
		restrict: 'E',
		transclude: true,
		template: require("./templates/menu.html"),
		replace: true,
		link: function (scope:IMenuScope) {
			scope.go = function(path){
				$location.path(path);
			};
			api.user.get().then((data) => {
				scope.login = data.login || "anonymous";
			});
			scope.$root.$on('$locationChangeSuccess', () => {
				scope.trigger_active = $location.path() == '/trigger/';
				scope.settings_active = $location.path() == '/settings/';
			});
		}
	};
}

Menu.$inject = ['$location', 'api'];