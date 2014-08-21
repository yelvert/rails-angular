class HomeController < ApplicationController
  layout false

  def index
    @client_version = SynergyEoc::CLIENT_PACKAGE['version']
    @stylesheet_url = "http://example.com/#{@client_version}/main.css"
    @javascript_url = "http://example.com/#{@client_version}/main.js"
  end
end