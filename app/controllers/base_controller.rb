class BaseController < ApplicationController
    protect_from_forgery :except => :update_order
  	skip_before_filter :verify_authenticity_token
end
