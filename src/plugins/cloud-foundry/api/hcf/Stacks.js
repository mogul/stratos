/* DO NOT EDIT: This code has been generated by the cf-dotnet-sdk-builder */

(function () {
  'use strict';

  angular
    .module('cloud-foundry.api')
    .run(registerApi);

  registerApi.$inject = [
    '$http',
    'app.api.apiManager'
  ];

  function registerApi($http, apiManager) {
    apiManager.register('cloud-foundry.api.Stacks', new StacksApi($http));
  }

  function StacksApi($http) {
    this.$http = $http;
  }

  /* eslint-disable camelcase */
  angular.extend(StacksApi.prototype, {

   /*
    * Create a Stack
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/195/stacks/create_a_stack.html
    */
    CreateStack: function (value, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/api/cf/v2/stacks';
      config.method = 'POST';
      config.data = value;

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Delete a Particular Stack
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/195/stacks/delete_a_particular_stack.html
    */
    DeleteStack: function (guid, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/api/cf/v2/stacks/' + guid + '';
      config.method = 'DELETE';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * List all Stacks
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/195/stacks/list_all_stacks.html
    */
    ListAllStacks: function (params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/api/cf/v2/stacks';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    },

   /*
    * Retrieve a Particular Stack
    * For detailed information, see online documentation at: http://apidocs.cloudfoundry.org/195/stacks/retrieve_a_particular_stack.html
    */
    RetrieveStack: function (guid, params, httpConfigOptions) {
      var config = {};
      config.params = params;
      config.url = '/api/cf/v2/stacks/' + guid + '';
      config.method = 'GET';

      for (var option in httpConfigOptions) {
        config[option] = httpConfigOptions[option]
      }
      return this.$http(config);
    }

  });
  /* eslint-enable camelcase */

})();
